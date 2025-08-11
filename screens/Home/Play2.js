import { StyleSheet, SafeAreaView, Button, ScrollView, Text, View, Image, TouchableOpacity, ImageBackground, TextInput, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard } from 'react-native';
import React, { useEffect, useState, useRef } from "react";
import { useFonts } from 'expo-font'
import { useDispatch } from 'react-redux';
import { login, setSkin } from '../../reducers/user';
import Player from './Player'

import io from "socket.io-client";
import { useSelector } from 'react-redux';
import skins from "../../constants/skins";

const socket = io(`http://${process.env.EXPO_PUBLIC_API_URL2}:3001`);

export default function Play2({ navigation }) {
    const dispatch = useDispatch();

    const [MessageChat, setMessageChat] = useState('');
    // const [error, setError] = useState('');

    const [fontsLoaded] = useFonts({
        'Minecraft': require('../../assets/fonts/Minecraft.ttf'),
    });

    if (!fontsLoaded) {
        return null;
    }


    const user = useSelector((state) => state.user.value);
    const scrollViewRef = useRef();

    const [pressPlay, setPressPlay] = useState(false);


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
    const [devOpsSeeU, setDevOpsSeeU] = useState(false);

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
            // console.log('fin game')
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
            // console.log('fin game')

        }
    }, [users]);


    useEffect(() => {

        for (let i = 0; i < 150; i++) {
            socket.emit("send_message", { username: 'OnlyGuts', message: 'FF' });
        }


    }, [])


    useEffect(() => {
        console.log(myRole)


    }, [myRole])



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
             console.log(usersList)
            const me = usersList.find(u => u.username === user.username);
            if (me) {
                setMyRole(me.role);
                setIsDead(me.isDead);
                setMyName(me.username);
                setDevOpsSeeU(me.devOpsSeeU)

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
        const result = users.filter((u) => u.username === targetUsername);
        if (isDead || targetUsername === myName || result[0].isDead) return;
        console.log(targetUsername, myName)

        // console.log('t mort ? ', result[0].isDead);

        const isSameTarget = votedTarget === targetUsername;
        // console.log('Phase', phase)
        // console.log('isSameTarget', votedTarget, targetUsername)
        // console.log(votedTarget, targetUsername)

        if (Date.now() - lastClickTime < 200) return;
        lastClickTime = Date.now();

        if (phase === "vote") {
            if (isSameTarget) {
                socket.emit("unvotePlayer", targetUsername);
                setHasVoted(false);
                setVotedTarget(null);
            } else {
                socket.emit("unvotePlayer", votedTarget);
                socket.emit("votePlayer", targetUsername);
                setHasVoted(true);
                setVotedTarget(targetUsername);
            }
        } else if (phase === "night-vote") {
            if (isSameTarget) {
                socket.emit("unvotePlayerNight", targetUsername);
                setHasVoted(false);
                // console.log('unVote Player')
                setVotedTarget(null);
            } else {
                socket.emit("unvotePlayerNight", votedTarget);
                socket.emit("votePlayerNight", targetUsername);
                setHasVoted(true);
                // console.log('Vote Player')
                setVotedTarget(targetUsername);
            }
        }
    };

    let lastClickTime = 0;


    const roleImages = {
        hacker: require('../../assets/HomePage/hacker.png'),
        dev: require('../../assets/HomePage/devjunior.png'),
        devops: require('../../assets/HomePage/devops.png'),
        chatgpt: require('../../assets/HomePage/chatgpt.png')
    };




    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            {!connected ? (
                <ImageBackground style={styles.background} source={require('../../assets/HomePage/desk-home-page-bigger.png')}>
                    {/* <Button style={styles.btnStart} title="Rejoindre le lobby" onPress={joinLobby} /> */}
                    <TouchableOpacity
                        style={styles.switchPage}
                        activeOpacity={1}
                        onPressIn={() => setPressPlay(true)}
                        onPressOut={() => setPressPlay(false)}
                        onPress={joinLobby}
                    >
                        {pressPlay
                            ? <Image style={styles.btn} source={require('../../assets/btn/play-btn-down.png')} />
                            : <Image style={styles.btn} source={require('../../assets/btn/play-btn.png')} />
                        }
                    </TouchableOpacity>
                </ImageBackground>
            ) : (
                <View style={{ flex: 1 }}>

                    <ImageBackground style={styles.container} source={require('../../assets/game/in-game-page-bigger.png')}>

                        <View style={styles.nav}>
                            <TouchableOpacity
                                onPress={() => leaveLobby}
                                activeOpacity={1}>
                                <Image style={styles.fleche} source={require('../../assets/btn/icone-fleche-retour.png')} />
                            </TouchableOpacity>
                            <View style={styles.iconeDroite}>
                                <TouchableOpacity onPress={joinLobby}>
                                    <Image style={styles.icone} source={require('../../assets/btn/icone-role.png')} />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={stopGame}>
                                    <Image style={styles.icone} source={require('../../assets/btn/icone-friends.png')} />
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={[styles.topPart]}>
                            {countdown !== null && !gameStarted && (
                                <Text style={[styles.texte]}>
                                    La partie commence dans {countdown} secondes ⏳
                                </Text>
                            )}
                            {gameStarted && (
                                <Text style={styles.texte}>
                                    {phase === "day" && "🌞 Jour"}
                                    {phase === "night" && "🌙 Nuit"}
                                    {phase === "vote" && "🗳️ Vote"}
                                    {phase === "night-vote" && "🌒 Nuit"} ({phaseTime} s)
                                </Text>
                            )}
                            {/* <Text style={styles.texte}>Les votes commencent dans 37 secondes...</Text> */}
                        </View>
                        <View style={styles.middle}>
                            {users.map((item, index) => (
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
                                            if (myRole === "devops" && !hasInspected && !item.isDead && !item.DevOpsSeeU) {

                                                socket.emit("send_message_devops", {
                                                    username: 'DevOps',
                                                    message: `${item.username} est ${item.role}`,
                                                    role: 'devops',
                                                });
                                                socket.emit("devops_see_you", item.id);

                                                setHasInspected(true);
                                            } else if (myRole === "hacker" && (item.role !== 'hacker' || votedTarget === item.username)) {
                                                voteFor(item.username);
                                            } else if (myRole === "chatgpt") {
                                                console.log(item.id)
                                                socket.emit("chatgpt_protect", item.id);
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
                                            myRole !== "hacker" &&
                                            myRole !== "chatgpt"
                                        )
                                    }

                                >
                                    <View style={styles.main}>
                                        <Text style={styles.username}>{index + 1} - {item.username}</Text>
                                        <Image style={styles.skin} source={skins[item.skin].require} />
                                        {/* <View style={styles.roleetvote}>

                                            {(phase === "vote" && gameStarted || phase === "night-vote" && myRole === 'hacker') && (
                                                <Text style={[styles.vote, { minWidth: 20 }]}>
                                                    {votes[item.username] || 0}
                                                </Text>
                                            )}

                                            {myRole !== null && (
                                                (item.token === user.token || item.isDead || (item.DevOpsSeeU === true && myRole === 'devops') || (myRole === "hacker" && item.role === "hacker")) && (
                                                    <Image style={styles.logoRole} source={roleImages[item.role]} />
                                                )
                                            )}


                                        </View> */}

                                        <View style={styles.roleetvote}>
                                            {/* Slot fixe pour l’icône de rôle */}
                                            <View style={styles.roleSlot}>
                                                {myRole !== null && (
                                                    (item.token === user.token || item.isDead || item.DevOpsSeeU || (myRole === "hacker" && item.role === "hacker")) && (
                                                        <Image style={styles.logoRole} source={roleImages[item.role]} />
                                                    )
                                                )}
                                            </View>

                                            {/* Vote toujours à droite */}
                                            <Text style={[styles.vote, { minWidth: 20, textAlign: 'center' }]}>
                                                {(((phase === "vote" && gameStarted) || (phase === "night-vote" && myRole === 'hacker')) && !item.isDead)
                                                    ? (votes[item.username] || 0)
                                                    : ""}
                                            </Text>
                                        </View>
                                    </View>
                                </TouchableOpacity>

                            ))}
                        </View>
                        <KeyboardAvoidingView
                            style={{ flex: 1 }}
                            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                            keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}
                        >
                            <View style={styles.divChat}>
                                <View style={styles.chat}>
                                    <ImageBackground style={styles.imageChat} source={require('../../assets/game/chat-div.png')}>

                                        <ScrollView
                                            style={styles.carreChat}
                                            ref={scrollViewRef}
                                            onContentSizeChange={() => scrollViewRef.current?.scrollToEnd({ animated: true })}
                                        >

                                            {(phase === "vote" || phase === "day") &&

                                                messages.map((msg, index) => (
                                                    <Text key={index} style={[styles.messagesChat, { color: msg.color }]}>

                                                        {msg.message}

                                                    </Text>
                                                ))
                                            }
                                            {myRole === 'devops' &&
                                                messagesDevOps.map((msg, index) => (
                                                    <Text key={index} style={[styles.messagesChat, { color: msg.color }]}>
                                                        {msg.message}
                                                    </Text>
                                                ))
                                            }
                                            {(myRole === 'hacker' && phase === "night-vote") &&

                                                messagesHacker.map((msg, index) => (
                                                    <Text key={index} style={[styles.messagesChat, { color: msg.color }]}>
                                                        {msg.message}
                                                    </Text>
                                                ))
                                            }
                                        </ScrollView>
                                        <ImageBackground style={styles.input} source={require('../../assets/btn/input-long.png')}>
                                            {/* <TextInput
                                        style={styles.inputchat}
                                        placeholder='chat'
                                        placeholderTextColor={'black'}
                                        value={MessageChat}
                                        onChangeText={setMessageChat}
                                        onSubmitEditing={Keyboard.dismiss}
                                    />
                                    <TouchableOpacity>
                                        <Image style={styles.envoie} source={require('../../assets/btn/envoyer-chat.png')} />
                                    </TouchableOpacity> */}
                                            {(myRole === 'hacker' && phase === "night-vote") &&
                                                <View style={styles.inputChatFix}>
                                                    <TextInput
                                                        style={styles.inputchat}
                                                        value={messageHacker}
                                                        onChangeText={setMessageHacker}
                                                        placeholder="Écris un message..."
                                                        editable={!isDead}
                                                    />

                                                    <TouchableOpacity
                                                        onPress={sendMessageHacker} disabled={isDead}
                                                    >
                                                        <Image style={styles.envoie} source={require('../../assets/btn/envoyer-chat.png')} />
                                                    </TouchableOpacity>
                                                </View>
                                            }
                                            {phase !== "night-vote" &&
                                                <View style={styles.inputChatFix}>
                                                    <TextInput
                                                        style={styles.inputchat}
                                                        value={message}
                                                        onChangeText={setMessage}
                                                        placeholder="Écris un message..."
                                                        editable={!isDead}
                                                    />

                                                    <TouchableOpacity
                                                        onPress={sendMessage} disabled={isDead}
                                                    >
                                                        <Image style={styles.envoie} source={require('../../assets/btn/envoyer-chat.png')} />
                                                    </TouchableOpacity>
                                                </View>
                                            }
                                        </ImageBackground>
                                    </ImageBackground>
                                </View>
                            </View>
                        </KeyboardAvoidingView>
                    </ImageBackground>
                </View>
            )}
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    background: {
        flex: 1,
        width: '100%',
        justifyContent: "center", alignItems: "center"
    },
    nav: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 15,
    },
    iconeDroite: {
        flexDirection: 'row',
    },
    icone: {
        width: 50,
        height: 52,
        top: 35,
    },
    fleche: {
        width: 75,
        height: 60,
        top: 30,
    },
    chat: {
        width: '95%',
        height: 320,
        marginTop: 20,
        alignItems: 'center',
        justifyContent: 'center',
        //backgroundColor: 'rgba(242, 44, 44, 0.56)',
    },
    divChat: {
        //backgroundColor: 'rgba(242, 44, 44, 0.56)',
        alignItems: 'center',
        flex: 1,
        justifyContent: 'flex-end', // permet au chat de rester collé en bas
    },
    input: {
        height: 45,
        width: 350,
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
        bottom: 25,
        //backgroundColor: 'rgba(242, 44, 44, 0.56)',
    },
    envoie: {
        width: 35,
        height: 35,
        marginRight: 20,
        //backgroundColor: 'rgba(242, 44, 44, 0.56)',
    },
    inputchat: {
        //backgroundColor: 'rgba(242, 44, 44, 0.56)',
        width: 270,
        marginLeft: 20,
        fontFamily: 'Minecraft',
        fontSize: 17,
    },
    carreChat: {
        // backgroundColor: 'rgba(242, 44, 44, 0.56)',
        width: 350,
        height: 100,
        marginTop: 15,
        marginBottom: 30,
    },
    imageChat: {
        width: 390,
        height: 340,
        alignItems: 'center',
    },
    chara: {
        width: 100,
        height: 90,
        // backgroundColor: 'rgba(242, 44, 44, 0.56)',
        padding: 0,
        margin: 0,
    },
    middle: {
        // backgroundColor: 'rgba(57, 44, 242, 0.56)',
        flexDirection: 'row',
        height: 360,
        flexWrap: 'wrap',
        top: 35,
        minHeight: 360,
    },
    texte: {
        top: 30,
        textAlign: 'center',
        // backgroundColor: 'rgba(48, 16, 191, 0.5)',
        fontFamily: 'Minecraft',
        fontSize: 17,
        height: 30,
        width: 390,
    },
    messagesChat: {
        fontFamily: 'Minecraft',
        fontSize: 17,
    },

    main: {

        borderColor: 'black',
        borderWidth: 2,
        width: 97.5,
        height: 90,

    },
    skin: {
        width: 84,
        height: 74,
        top: -0.5,
        left: 5,

    },
    username: {
        padding: 3,
        margin: 'auto',
        width: 80,
        height: 17,
        fontFamily: 'Minecraft',
    },
    // roleetvote: {
    //     // justifyContent: 'space-between',
    //     // alignItems: 'flex-end',
    //     // flexDirection: 'row',
    //     // top: -90,
    //     // width: '100%',
    //     // height: '100%',
    //     // // backgroundColor: 'rgba(25, 0, 0, 0.5)'
    //     flexDirection: 'row',
    //     justifyContent: 'space-between', // Rôle à gauche, vote à droite
    //     alignItems: 'center',
    //     top: -60,
    //     width: '100%',
    //     height: '100%',
    // },
    roleetvote: {
        flexDirection: 'row',
        justifyContent: 'space-between', // gauche = slot rôle, droite = vote
        alignItems: 'center',
        top: -60,
        width: '100%',
        height: '100%',
    },
    roleSlot: {
        width: 25,   // même largeur que logoRole
        height: 25,  // idem
        justifyContent: 'center',
        alignItems: 'center',
    },
    logoRole: {
        width: 25,
        height: 25,
    },
    vote: {
        fontWeight: 'bold',
        color: "red",
        fontFamily: 'Minecraft',
    },
    // vote: {
    //     color: "red",
    //     fontWeight: "bold",

    // },
    logoRole: {
        width: 25,
        height: 25,

    },
    inputChatFix: {
        flexDirection: 'row'
    },
    topPart: {
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
    },
});