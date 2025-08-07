import React, { useEffect, useState } from "react";
import { View, Text, Button, StyleSheet, Image, ScrollView, TextInput, Alert } from "react-native";
import io from "socket.io-client";
import { useSelector } from 'react-redux';
import skins from "../../constants/skins";

const socket = io("http://192.168.100.206:3001");

export default function App() {
    const user = useSelector((state) => state.user.value);

    const [connected, setConnected] = useState(false);
    const [users, setUsers] = useState([]);
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState("");
    const [countdown, setCountdown] = useState(null);
    const [gameStarted, setGameStarted] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        // 🔌 Initialisation des listeners
        socket.on("updateUsers", (usersList) => setUsers(usersList));

        socket.on("chat_history", (history) => {
            setMessages(history.map(msg => `${msg.username}: ${msg.message}`));
        });
        socket.on("receive_message", (msg) => {
            setMessages((prev) => [...prev, `${msg.username}: ${msg.message}`]);
        });
        socket.on("countdown", (timeLeft) => {
            setCountdown(timeLeft);
        });
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
            Alert.alert("🔄 La partie a été réinitialisée !");
        });
        socket.on("gameError", ({ message }) => {
            setError(message);
        });

        // 🧹 Nettoyage des listeners à la déconnexion
        return () => {
            socket.off("updateUsers");
            socket.off("chat_history");
            socket.off("receive_message");
            socket.off("countdown");
            socket.off("gameStarted");
            socket.off("gameReset");
            socket.off("gameError");
        };
    }, []);

    // Envoie un message
    const sendMessage = () => {
        if (message.trim() !== "") {
            socket.emit("send_message", { username: user.username, message: message.trim() });
            setMessage("");
        }
    };

    // Rejoindre le lobby
    const joinLobby = () => {
        socket.emit("joinLobby", { username: user.username, skin: user.skin });
        setConnected(true);
    };

    // Quitter le lobby
    const leaveLobby = () => {
        socket.emit("leaveLobby");
        setConnected(false);
    };

    // Stopper la partie (admin ou test)
    const stopGame = () => {
        socket.emit("stopGame");
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


                    <Button title="Quitter le lobby" onPress={leaveLobby} />
                    <Button title="Stop la partie" onPress={stopGame} />

                    {/* Liste des joueurs */}
                    <ScrollView contentContainerStyle={styles.usersContainer}>
                        {users.map((item) => (
                            <View key={item.id} style={styles.userBox}>
                                <Image style={styles.skin} source={skins[item.skin]} />
                                <Text style={styles.user}>{item.username}</Text>
                            </View>
                        ))}
                    </ScrollView>

                    {/* Chat */}
                    <ScrollView style={styles.chatBox}>
                        {messages.map((msg, index) => (
                            <Text key={index} style={styles.message}>{msg}</Text>
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
    userBox: { alignItems: "center", marginBottom: 10 },
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
