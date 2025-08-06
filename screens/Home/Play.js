import React, { useEffect, useState } from "react";
import { View, Text, Button, StyleSheet, Image, ScrollView, TextInput } from "react-native";
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


    useEffect(() => {
        socket.on("updateUsers", (usersList) => {
            setUsers(usersList);
        });

        return () => {
            socket.off("updateUsers");
        };
    }, []);

    useEffect(() => {

        // Recevoir l’historique au moment de la connexion
        socket.on("chat_history", (history) => {
            setMessages(history.map(msg => msg.username + ": " + msg.message));
        });

        // Écouter les nouveaux messages
        socket.on("receive_message", (msg) => {
            setMessages((prevMessages) => [...prevMessages, msg.username + ": " + msg.message]);
        });

        return () => {
            socket.off("receive_message"); // Nettoyage
        };

    }, []);

    const sendMessage = () => {  
        const username = user.username
        if (message.trim() !== "") {
            const user = {
                username: username,
                message: message
            }
            socket.emit("send_message", user);
            setMessage("");
        }
    };

    const joinLobby = () => {
        socket.emit("joinLobby", { username: user.username, skin: user.skin });
        setConnected(true);
    };

    return (
        <View style={styles.container}>
            {!connected ? (
                <Button title="Rejoindre le lobby" onPress={joinLobby} />
            ) : (
                <>
                    <Text style={styles.title}>👥 Lobby</Text>
                    <Button
                        title="Quitter le lobby"
                        onPress={() => {
                            socket.emit("leaveLobby");
                            setConnected(false);
                        }}
                    />

                    {users.map((item) => (
                        <View key={item.id} style={styles.userBox}>
                            <Image style={styles.skin} source={skins[item.skin]} />
                            <Text style={styles.user}>{item.username}</Text>
                        </View>
                    ))}
                    <Text style={styles.user}>{messages}</Text> 
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
    usersContainer: { alignItems: "center", paddingVertical: 20 },
    userBox: { alignItems: "center", marginBottom: 20 },
    user: { fontSize: 18, paddingTop: 5 },
    skin: { width: 50, height: 50, resizeMode: "contain" },
});



