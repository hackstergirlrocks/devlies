// Play.js (version modifiée)

import React, { useEffect, useState, useRef } from "react";
import { View, Text, Button, StyleSheet, Image, ScrollView, TextInput, Alert, TouchableOpacity, ImageBackground } from "react-native";
import io from "socket.io-client";
import { useSelector } from 'react-redux';
import skins from "../../constants/skins";

const socket = io("http://192.168.1.2:3001");

export default function App({ navigation }) {
    const user = useSelector((state) => state.user.value);
    const scrollViewRef = useRef();

    const [connected, setConnected] = useState(false);
    const [users, setUsers] = useState([]);

    const [messages, setMessages] = useState([]);


    const [messagesDevOps, setMessagesDevOps] = useState([]);
    const [messagesHacker, setMessagesHacker] = useState([]);


    const [message, setMessage] = useState("");
    const [messageHacker, setMessageHacker] = useState("");


    const [countdown, setCountdown] = useState(null);
    const [gameStarted, setGameStarted] = useState(false);
    const [error, setError] = useState("");

    const [phase, setPhase] = useState("day");
    const [phaseTime, setPhaseTime] = useState(30);

    const [votes, setVotes] = useState({});
    const [hasVoted, setHasVoted] = useState(false);

    const [myRole, setMyRole] = useState(null);
    const [isDead, setIsDead] = useState(false);
    const [myName, setMyName] = useState(null);

    const [hasInspected, setHasInspected] = useState(false);

    const [votedTarget, setVotedTarget] = useState(null);



    useEffect(() => {
        if (!gameStarted) return;

        const aliveUsers = users.filter(user => !user.isDead);
        const hackers = aliveUsers.filter(user => user.role === "hacker");
        const others = aliveUsers.filter(user => user.role !== "hacker");

        if (aliveUsers.length === 1) {
            socket.emit("stopGame");
            return;
        }

        if (hackers.length === 0) {
            // socket.emit("send_message", {
            //     username: "Système",
            //     message: "Les développeurs ont gagné !",
            //     color: "green",
            //     role: myRole
            // });

            navigation.navigate("GameOver", {
                result: "victory",
                rolewin: "dev",
                xpEarned: 100,
                role: myRole
                // image: require("../../assets/victory.png")
            });
            socket.emit("stopGame");
        } else if (hackers.length >= others.length) {
            // socket.emit("send_message", {
            //     username: "Système",
            //     message: "Les hacker ont gagné !",
            //     color: "green",
            //     role: myRole
            // });

            navigation.navigate("GameOver", {
                result: "victory",
                rolewin: "hacker",
                xpEarned: 100,
                role: myRole
                // image: require("../../assets/victory.png")
            });
            socket.emit("stopGame");
        }
    }, [users]);






    useEffect(() => {
        socket.on("phaseChange", ({ phase, timeLeft }) => {
            setPhase(phase);
            setPhaseTime(timeLeft);
            setHasVoted(false);
            setVotedTarget(null);

            if (phase === 'night-vote') {
                setHasInspected(false);
            }

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
            setPhase("vote");
            setPhaseTime(time);
            setHasVoted(false);
            setVotedTarget(null);

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

        // socket.on("updateUsers", (usersList) => setUsers(usersList));

        socket.on("updateUsers", (usersList) => {
            setUsers(usersList);

            const me = usersList.find(u => u.username === user.username);
            if (me) {
                setMyRole(me.role);
                setIsDead(me.isDead);
                setMyName(me.username);

            }
        });

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


        socket.on("chat_history_devops", (history) => {
            setMessagesDevOps(history.map(msg => ({
                message: `${msg.username}: ${msg.message}`,
                color: msg.color || "#000"
            })));
        });

        socket.on("receive_message_devops", (msg) => {
            setMessagesDevOps((prev) => [...prev, {
                message: `${msg.username}: ${msg.message}`,
                color: msg.color || "#000"
            }]);
        });


        socket.on("chat_history_hacker", (history) => {
            setMessagesHacker(history.map(msg => ({
                message: `${msg.username}: ${msg.message}`,
                color: msg.color || "#000"
            })));
        });

        socket.on("receive_message_hacker", (msg) => {
            setMessagesHacker((prev) => [...prev, {
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
            setVotedTarget(null);
            setUsers(users);
            setMessages([]);
            setMessagesDevOps([]);
            setMessagesHacker([]);
            setGameStarted(false);
            setCountdown(null);
            setError("");
            setVotes({});
            setHasVoted(false);
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

    const sendMessageHacker = () => {
        if (messageHacker.trim() !== "") {
            socket.emit("send_message_hacker", { username: user.username, message: '🐺 ' + messageHacker.trim() });
            setMessageHacker("");
        }
    };



    const joinLobby = () => {
        const roles = ['hacker', 'devops'];
        const randomRole = roles[Math.floor(Math.random() * roles.length)];

        socket.emit("joinLobby", {
            token: user.token,
            username: user.username,
            skin: user.skin,
            role: null,
        });

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
        if (isDead || targetUsername === myName) return;

        const isSameTarget = votedTarget === targetUsername;
        console.log('Phase', phase)
        console.log('isSameTarget', votedTarget, targetUsername)
        // console.log(votedTarget, targetUsername)

        if (phase === "vote") {
            if (isSameTarget) {
                socket.emit("unvotePlayer", targetUsername);
                setHasVoted(false);
                setVotedTarget(null);
            } else {
                socket.emit("votePlayer", targetUsername);
                setHasVoted(true);
                setVotedTarget(targetUsername);
            }
        } else if (phase === "night-vote") {
            if (isSameTarget) {
                socket.emit("unvotePlayerNight", targetUsername);
                setHasVoted(false);
                console.log('unVote Player')

                setVotedTarget(null);
            } else {
                socket.emit("votePlayerNight", targetUsername);
                setHasVoted(true);
                console.log('Vote Player')
                setVotedTarget(targetUsername);
            }
        }
    };



    return (
        <View style={styles.container}>
            {!connected ? (
                <ImageBackground style={styles.background} source={require('../../assets/HomePage/desk-home-page-bigger.png')}>
                    <Button style={styles.btnStart} title="Rejoindre le lobby" onPress={joinLobby} />
                </ImageBackground>
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
                                // onPress={() => voteFor(item.username)}

                                // onPress={() => {
                                //     if (isDead) return;
                                //     console.log(phase)
                                //     if (phase === "night-vote" && myRole === "devops") {
                                //         socket.emit("send_message_devops", { username: 'Système', message: item.username + ' est ' + item.role, role: 'devops' });
                                //         console.log('user', item.username, item.role)
                                //     } else {
                                //         voteFor(item.username)

                                //     }
                                // }}
                                onPress={() => {
                                    if (isDead) return;

                                    if (phase === "night-vote") {
                                        if (myRole === "devops" && !hasInspected) {
                                            socket.emit("send_message_devops", {
                                                username: 'Système',
                                                message: `${item.username} est ${item.role}`,
                                                role: 'devops',
                                            });
                                            setHasInspected(true);
                                        } else if (myRole === "hacker" && (item.role !== 'hacker' || votedTarget === item.username)) {
                                            voteFor(item.username);
                                        }

                                    } else if (phase === "vote") {
                                        voteFor(item.username);
                                    }
                                }}

                                disabled={
                                    isDead ||

                                    (
                                        phase === "night-vote" &&
                                        myRole !== "devops" &&
                                        myRole !== "hacker"
                                    )
                                }

                            >
                                <View style={styles.userBox}>
                                    <Image style={styles.skin} source={skins[item.skin].require} />
                                    <Text style={styles.user}>{item.username}</Text>

                                    {myRole !== null && (
                                        (item.token === user.token || item.isDead || (myRole === "hacker" && item.role === "hacker")) && (
                                            <Text style={styles.user}>{item.role}</Text>
                                        )
                                    )}

                                    {(phase === "vote" && gameStarted || phase === "night-vote" && myRole === 'hacker') && (
                                        <Text style={{ color: "red", fontWeight: "bold" }}>
                                            Votes : {votes[item.username] || 0}
                                        </Text>
                                    )}
                                </View>

                            </TouchableOpacity>

                        ))}

                    </ScrollView>

                    <ScrollView
                        style={styles.chatBox}
                        ref={scrollViewRef}
                        onContentSizeChange={() => scrollViewRef.current?.scrollToEnd({ animated: true })}
                    >

                        {(phase === "vote" || phase === "day") &&

                            messages.map((msg, index) => (
                                <Text key={index} style={[styles.message, { color: msg.color }]}>

                                    {msg.message}

                                </Text>
                            ))
                        }
                        {myRole === 'devops' &&
                            messagesDevOps.map((msg, index) => (
                                <Text key={index} style={[styles.message, { color: msg.color }]}>
                                    {msg.message}
                                </Text>
                            ))
                        }
                        {(myRole === 'hacker' && phase === "night-vote") &&

                            messagesHacker.map((msg, index) => (
                                <Text key={index} style={[styles.message, { color: msg.color }]}>
                                    {msg.message}
                                </Text>
                            ))
                        }
                    </ScrollView>
                    {(myRole === 'hacker' && phase === "night-vote") &&
                        <View>
                            <TextInput
                                style={styles.input}
                                value={messageHacker}
                                onChangeText={setMessageHacker}
                                placeholder="Écris un message..."
                                editable={!isDead}
                            />
                            <Button title="Envoyer" onPress={sendMessageHacker} disabled={isDead} />
                        </View>
                    }
                    {phase !== "night-vote" &&
                        <View>
                            <TextInput
                                style={styles.input}
                                value={message}
                                onChangeText={setMessage}
                                placeholder="Écris un message..."
                                editable={!isDead}
                            />
                            <Button title="Envoyer" onPress={sendMessage} disabled={isDead} />
                        </View>
                    }

                </>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        width: '100%',
        justifyContent: "center", alignItems: "center"
    },

    container: { flex: 1, justifyContent: "center", alignItems: "center" },
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
