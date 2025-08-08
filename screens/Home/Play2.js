import { StyleSheet, SafeAreaView, ScrollView, Text, View, Image, TouchableOpacity, ImageBackground, TextInput, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { useState } from 'react';
import { useFonts } from 'expo-font'
import { useDispatch } from 'react-redux';
import { login, setSkin } from '../../reducers/user';
import Player from './Player'

export default function Play2({ navigation }) {
    const dispatch = useDispatch();

    const [MessageChat, setMessageChat] = useState('');
    const [error, setError] = useState('');

    const [fontsLoaded] = useFonts({
        'Minecraft': require('../../assets/fonts/Minecraft.ttf'),
    });

    if (!fontsLoaded) {
        return null;
    }


    const users = [
        {
            username: 'alpha',
            skin: require('../../assets/Skin/basic-big.png'),
        },
        {
            username: 'bravo',
            skin: require('../../assets/Skin/astro-big.png'),
        },
        {
            username: 'charlie',
            skin: require('../../assets/Skin/flower-girl-big.png'),
        },
        {
            username: 'delta',
            skin: require('../../assets/Skin/stitch-big.png'),
        },
        {
            username: 'echo',
            skin: require('../../assets/Skin/clown-big.png'),
        },
        {
            username: 'foxtrot',
            skin: require('../../assets/Skin/steve-retarded-big.png'),
        },
        {
            username: 'golf',
            skin: require('../../assets/Skin/haaaan-big.png'),
        },
        {
            username: 'hotel',
            skin: require('../../assets/Skin/wolf-big.png'),
        },
        {
            username: 'india',
            skin: require('../../assets/Skin/plant-big.png'),
        },
        {
            username: 'juliet',
            skin: require('../../assets/Skin/cat-big.png'),
        },
        {
            username: 'kilo',
            skin: require('../../assets/Skin/guts-big.png'),
        },
        {
            username: 'lima',
            skin: require('../../assets/Skin/duck-big.png'),
        },
        {
            username: 'mike',
            skin: require('../../assets/Skin/requin-big.png'),
        },
        {
            username: 'november',
            skin: require('../../assets/Skin/toto-en-fumence-big.png'),
        },
        {
            username: 'oscar',
            skin: require('../../assets/Skin/toto-dead-big.png'),
        },
        {
            username: 'suka',
            skin: require('../../assets/Skin/pichu-big.png'),
        },
    ];

    const listUser = users.map((user, i) =>
        <Player key={i} username={user.username} skin={user.skin} />
    );

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <ImageBackground style={styles.container} source={require('../../assets/game/in-game-page-bigger.png')}>
                <View style={styles.nav}>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('Home')}
                        activeOpacity={1}>
                        <Image style={styles.fleche} source={require('../../assets/btn/icone-fleche-retour.png')} />
                    </TouchableOpacity>
                    <View style={styles.iconeDroite}>
                        <TouchableOpacity>
                            <Image style={styles.icone} source={require('../../assets/btn/icone-role.png')} />
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Image style={styles.icone} source={require('../../assets/btn/icone-friends.png')} />
                        </TouchableOpacity>
                    </View>
                </View>
                <View>
                    <Text style={styles.texte}>Les votes commencent dans 37 secondes...</Text>
                </View>
                <View style={styles.middle}>
                    {listUser}
                </View>
                <KeyboardAvoidingView
                    style={{ flex: 1 }}
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                    keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}
                >
                    <View style={styles.divChat}>
                        <View style={styles.chat}>
                            <ImageBackground style={styles.imageChat} source={require('../../assets/game/chat-div.png')}>
                                <ScrollView style={styles.carreChat}>
                                    <Text style={styles.messagesChat}>Onlyguts: FF</Text>
                                    <Text style={styles.messagesChat}>Popo: I love Proust & Shner</Text>
                                    <Text style={styles.messagesChat}>Etiolate: I want to die</Text>
                                    <Text style={styles.messagesChat}>Onlyguts: ejbfzkejbfzjefbzjekfkzjefgjzkfgjehjhgfjkgezfgz</Text>
                                    <Text style={styles.messagesChat}>Onlyguts: FF</Text>
                                    <Text style={styles.messagesChat}>Onlyguts: FF</Text>
                                    <Text style={styles.messagesChat}>Onlyguts: FF</Text>
                                    <Text style={styles.messagesChat}>Onlyguts: FF</Text>
                                    <Text style={styles.messagesChat}>Onlyguts: FF</Text>
                                    <Text style={styles.messagesChat}>Onlyguts: FF</Text>
                                    <Text style={styles.messagesChat}>Onlyguts: FF</Text>
                                    <Text style={styles.messagesChat}>Onlyguts: FF</Text>
                                    <Text style={styles.messagesChat}>Onlyguts: FF</Text>
                                    <Text style={styles.messagesChat}>Onlyguts: FF</Text>
                                    <Text style={styles.messagesChat}>Onlyguts: FF</Text>
                                    <Text style={styles.messagesChat}>Onlyguts: FF</Text>
                                    <Text style={styles.messagesChat}>Onlyguts: FF</Text>
                                    <Text style={styles.messagesChat}>Onlyguts: FF</Text>
                                    <Text style={styles.messagesChat}>Onlyguts: FF</Text>
                                    <Text style={styles.messagesChat}>Onlyguts: FF</Text>
                                    <Text style={styles.messagesChat}>Onlyguts: FF</Text>
                                    <Text style={styles.messagesChat}>Onlyguts: FF</Text>
                                    <Text style={styles.messagesChat}>Onlyguts: FF</Text>
                                    <Text style={styles.messagesChat}>Onlyguts: FF</Text>
                                    <Text style={styles.messagesChat}>Onlyguts: FF</Text>
                                    <Text style={styles.messagesChat}>Onlyguts: FF</Text>
                                    <Text style={styles.messagesChat}>Onlyguts: FF</Text>
                                    <Text style={styles.messagesChat}>Onlyguts: FF</Text>
                                    <Text style={styles.messagesChat}>Onlyguts: FF</Text>
                                    <Text style={styles.messagesChat}>Onlyguts: FF</Text>
                                    <Text style={styles.messagesChat}>Onlyguts: FF</Text>
                                    <Text style={styles.messagesChat}>Onlyguts: FF</Text>
                                    <Text style={styles.messagesChat}>Onlyguts: FF</Text>
                                    <Text style={styles.messagesChat}>Onlyguts: FF</Text>
                                </ScrollView>
                                <ImageBackground style={styles.input} source={require('../../assets/btn/input-long.png')}>
                                    <TextInput
                                        style={styles.inputchat}
                                        placeholder='chat'
                                        placeholderTextColor={'black'}
                                        value={MessageChat}
                                        onChangeText={setMessageChat}
                                        onSubmitEditing={Keyboard.dismiss}
                                    />
                                    <TouchableOpacity>
                                        <Image style={styles.envoie} source={require('../../assets/btn/envoyer-chat.png')} />
                                    </TouchableOpacity>
                                </ImageBackground>
                            </ImageBackground>
                        </View>
                    </View>
                </KeyboardAvoidingView>
            </ImageBackground>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
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
        //backgroundColor: 'rgba(242, 44, 44, 0.56)',
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
        backgroundColor: 'rgba(242, 44, 44, 0.56)',
        padding: 0,
        margin: 0,
    },
    middle: {
        //backgroundColor: 'rgba(57, 44, 242, 0.56)',
        flexDirection: 'row',
        height: 360,
        flexWrap: 'wrap',
        top: 50,
    },
    texte: {
        top: 35,
        textAlign: 'center',
        // backgroundColor: 'rgba(191, 16, 16, 0.5)',
        fontFamily: 'Minecraft',
        fontSize: 17,
        height: 15,
        width: 390,
    },
    messagesChat: {
        fontFamily: 'Minecraft',
        fontSize: 17,
    }
});