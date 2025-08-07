// Play.js (version modifiée)

import React, { useEffect, useState, useRef } from "react";
import { View, Text, Button, StyleSheet, Image, ScrollView, TextInput, Alert, TouchableOpacity } from "react-native";
import io from "socket.io-client";
import { useSelector } from 'react-redux';
import skins from "../../constants/skins";

const socket = io("http://192.168.100.206:3001");

export default function App() {
    const user = useSelector((state) => state.user.value);
    const scrollViewRef = useRef();

    const [connected, setConnected] = useState(false);
    const [users, setUsers] = useState([]);
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState("");
    const [countdown, setCountdown] = useState(null);
    const [gameStarted, setGameStarted] = useState(false);
    const [error, setError] = useState("");

    const [phase, setPhase] = useState("day");
    const [phaseTime, setPhaseTime] = useState(30);

    const [votes, setVotes] = useState({});
    const [hasVoted, setHasVoted] = useState(false);

    useEffect(() => {
        socket.on("phaseChange", ({ phase, timeLeft }) => {
            setPhase(phase);
            setPhaseTime(timeLeft);
            setHasVoted(false);
            // console.log(phase);

            // if (phase === 'night') {
            //     socket.emit("send_message", { username: 'Système', message: `La nuit commence`, color: 'blue' });
            // } else if (phase === 'day') {
            //     socket.emit("send_message", { username: 'Système', message: `Le jour commence`, color: 'orange' });
            // } else if (phase === 'night-vote') {
            //     socket.emit("send_message", { username: 'Système', message: `Vote nocturne en cours...`, color: 'purple' });
            // }
        });

        socket.on("phaseUpdate", ({ phase, timeLeft }) => {
            setPhase(phase);
            setPhaseTime(timeLeft);
        });

        socket.on("votingStart", ({ time }) => {
            // socket.emit("send_message", { username: 'Système', message: `Les votes commencent`, color: 'grey' });
            setPhase("vote");
            setPhaseTime(time);
            setHasVoted(false);
            setVotes({});
        });

        socket.on("voteUpdate", (newVotes) => setVotes(newVotes));
        socket.on("nightVoteUpdate", (newVotes) => setVotes(newVotes));

        socket.on("playerEliminated", (username) => {
            // socket.emit("send_message", { username: 'Système', message: `${username} a été éliminé !`, color: 'red' });
            setVotes({});
        });

        socket.on("playerEliminatedNight", (username) => {
            // socket.emit("send_message", { username: 'Système', message: `${username} a été éliminé cette nuit !`, color: 'red' });
            setVotes({});
        });

        socket.on("noElimination", () => {
            // socket.emit("send_message", { username: 'Système', message: `Égalité, personne n'est éliminé.`, color: 'red' });
            setVotes({});
        });

        socket.on("noEliminationNight", () => {
            // socket.emit("send_message", { username: 'Système', message: `Égalité nocturne, aucun joueur éliminé.`, color: 'red' });
            setVotes({});
        });

        socket.on("updateUsers", (usersList) => setUsers(usersList));

        socket.on("chat_history", (history) => {
            setMessages(history.map(msg => ({
                message: `${msg.username}: ${msg.message}`,
                color: msg.color || "#000"
            })));
        });

        socket.on("receive_message", (msg) => {
            setMessages((prev) => [...prev, {
                message: `${msg.username}: ${msg.message}`,
                color: msg.color || "#000"
            }]);
        });

        socket.on("countdown", (timeLeft) => setCountdown(timeLeft));
        socket.on("gameStarted", () => {
            setGameStarted(true);
            setCountdown(null);
        });

        socket.on("gameReset", ({ users }) => {
            setConnected(false);
            setUsers(users);
            setMessages([]);
            setGameStarted(false);
            setCountdown(null);
            setError("");
            setVotes({});
            setHasVoted(false);
            Alert.alert("🔄 La partie a été réinitialisée !");
        });

        socket.on("gameError", ({ message }) => setError(message));

        return () => socket.off();
    }, []);

    const sendMessage = () => {
        if (message.trim() !== "") {
            socket.emit("send_message", { username: user.username, message: message.trim() });
            setMessage("");
        }
    };

    const joinLobby = () => {
        socket.emit("joinLobby", { token: user.token, username: user.username, skin: user.skin, role: 'hacker' });
        setConnected(true);
    };

    const leaveLobby = () => {
        socket.emit("leaveLobby");
        setConnected(false);
    };

    const stopGame = () => {
        socket.emit("stopGame");
    };

    const voteFor = (targetUsername) => {
        if (hasVoted) return;
        if (phase === "vote") {
            socket.emit("votePlayer", targetUsername);
        } else if (phase === "night-vote") {
            socket.emit("votePlayerNight", targetUsername);
        }
        setHasVoted(true);
    };

    return (
        <View style={styles.container}>
            {!connected ? (
                <Button title="Rejoindre le lobby" onPress={joinLobby} />
            ) : (
                <>
                    <Text style={styles.title}>👥 Lobby</Text>
                    {error ? <Text style={{ color: "red" }}>{error}</Text> : null}

                    {countdown !== null && !gameStarted && (
                        <Text style={{ fontSize: 18, color: "red" }}>
                            La partie commence dans {countdown} secondes ⏳
                        </Text>
                    )}

                    {gameStarted && (
                        <Text style={{ fontSize: 20, marginVertical: 10 }}>
                            {phase === "day" && "🌞 Jour"}
                            {phase === "night" && "🌙 Nuit"}
                            {phase === "vote" && "🗳️ Vote"}
                            {phase === "night-vote" && "🌒 Nuit"} ({phaseTime} s)
                        </Text>
                    )}

                    {(phase === "vote" || phase === "night-vote") && (
                        <View style={{ marginVertical: 20 }}>
                            <Text style={{ marginTop: 10 }}>
                                Votes en cours : {JSON.stringify(votes)}
                            </Text>
                        </View>
                    )}

                    <Button title="Quitter le lobby" onPress={leaveLobby} />
                    <Button title="Stop la partie" onPress={stopGame} />

                    <ScrollView contentContainerStyle={styles.usersContainer}>
                        {users.map((item) => (
                            <TouchableOpacity
                                key={item.id}
                                onPress={() => voteFor(item.username)}
                                disabled={
                                    hasVoted ||
                                    (
                                        phase === "vote" && false
                                    ) ||
                                    (
                                        phase === "night-vote" &&
                                        item.role === "hacker"
                                    )
                                }
                            >
                                <View style={styles.userBox}>
                                    <Image style={styles.skin} source={skins[item.skin].require} />
                                    <Text style={styles.user}>{item.username}</Text>
                                    {item.token === user.token && <Text style={styles.user}>{item.role}</Text>}
                                </View>
                            </TouchableOpacity>
                        ))}

                    </ScrollView>

                    <ScrollView
                        style={styles.chatBox}
                        ref={scrollViewRef}
                        onContentSizeChange={() => scrollViewRef.current?.scrollToEnd({ animated: true })}
                    >
                        {messages.map((msg, index) => (
                            <Text key={index} style={[styles.message, { color: msg.color }]}>
                                {msg.message}
                            </Text>
                        ))}
                    </ScrollView>

                    <TextInput
                        style={styles.input}
                        value={message}
                        onChangeText={setMessage}
                        placeholder="Écris un message..."
                    />
                    <Button title="Envoyer" onPress={sendMessage} />
                </>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: "center", alignItems: "center", padding: 20 },
    title: { fontSize: 22, fontWeight: "bold", marginBottom: 20 },
    usersContainer: { alignItems: "center", flexWrap: 'wrap', flexDirection: 'row' },
    userBox: { alignItems: "center", marginBottom: 10, marginHorizontal: 5 },
    user: { fontSize: 18, paddingTop: 5 },
    skin: { width: 50, height: 50, resizeMode: "contain" },
    chatBox: {
        height: 100,
        width: "100%",
        borderWidth: 1,
        borderColor: "#ccc",
        marginVertical: 10,
        padding: 10,
        backgroundColor: "#f9f9f9",
    },
    message: { fontSize: 14, marginBottom: 4 },
    input: { borderWidth: 1, width: "100%", padding: 10, marginBottom: 10 },
});
