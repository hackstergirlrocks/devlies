import React, { useEffect, useState } from "react";
import { View, Text, TextInput, Button, FlatList, StyleSheet, Image } from "react-native";
import io from "socket.io-client";
import { useSelector } from 'react-redux';
import skins from "../../constants/skins";

const socket = io("http://192.168.100.206:3001"); // ⚠️ mettre l’IP du PC si sur mobile

export default function App() {
    const user = useSelector((state) => state.user.value);

    const [connected, setConnected] = useState(false);
    const [users, setUsers] = useState([]);

    useEffect(() => {
        socket.on("updateUsers", (usersList) => {
            setUsers(usersList);
        });

        return () => {
            socket.off("updateUsers");
        };
    }, []);

    const joinLobby = () => {
        console.log(user.username)

        socket.emit("joinLobby", { username: user.username, skin: user.skin });
        setConnected(true);
    };

    return (
        <View style={styles.container}>
            {!connected ? (
                <>
                    <Button title="Rejoindre le lobby" onPress={joinLobby} />
                </>
            ) : (
                <>
                    <Text style={styles.title}>👥 Lobby</Text>
                    <FlatList
                        data={users}
                        keyExtractor={(item) => item.id}
                        renderItem={({ item }) => (
                            <View>
                               <Image style={styles.skin} source={skins[item.skin]} />
                                <Text style={styles.user}>{item.username}</Text>
                            </View>
                        )}
                    />
                </>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: "center", alignItems: "center", padding: 20 },
    title: { fontSize: 22, fontWeight: "bold", marginBottom: 20 },
    input: { borderWidth: 1, padding: 10, width: "80%", marginBottom: 10 },
    user: { fontSize: 18, padding: 5 }, 
    skin: {
        width: 150,
        height: 150
    }
});
