import { StyleSheet, Text, View, Image, TouchableOpacity, ImageBackground, TextInput, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { useEffect, useState } from 'react';
import { useFonts } from 'expo-font'
import { useDispatch } from 'react-redux';
import { login, logout, setSkin } from '../../reducers/user';
import { useAudioPlayer } from 'expo-audio';

export default function Parametres({ navigation }) {

    const audioSource = require('../../assets/Song/lonelytree.mp3');
    const player = useAudioPlayer(audioSource);

    const dispatch = useDispatch();
    const [pressNext, setPressNext] = useState(false);
    const [pressLogout, setPressLogout] = useState(false)
    const [signInUsername, setSignInUsername] = useState('');
    const [signInPassword, setSignInPassword] = useState('');
    const [error, setError] = useState('');

    const [pressSound, setPressSound] = useState(false)
    const [isPressed, setPressed] = useState(false)


    const [fontsLoaded] = useFonts({
        'Minecraft': require('../../assets/fonts/Minecraft.ttf'),
    });

    if (!fontsLoaded) {
        return null;
    }

    const ChangeSound = () => {
        setPressSound(!pressSound)
        setPressed(!isPressed)
        if (isPressed) {
            // player.seekTo(0);
            player.play();
        } else {
            // player.seekTo(0);
            player.pause();
        }
    }

    const Next = () => {
        // fetch('http://192.168.100.206:3000/users/signin', {
        //     method: 'POST',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify({ username: signInUsername, password: signInPassword }),
        // }).then(response => response.json())
        //     .then(data => {
        //         if (data.result) {
        //             dispatch(login({ token: data.token }));
        //             dispatch(setSkin({ skin: data.skin }));
        //             // setSignInUsername('');
        //             // setSignInPassword('');
        //             navigation.navigate('Home')
        //         } else {
        //             console.log(data.error)
        //             setError(data.error)
        //         }
        //     });
        setPressNext(false)
        console.log('next pressed');
    }

    const Logout = () => {
        dispatch(logout({ token: null }));
        navigation.navigate('Waiting')
    }

    return (
        <ImageBackground style={styles.container} source={require('../../assets/WaitingPage/animation-desk-bigger.gif')}>

            <View style={[styles.topPart, {flexDirection: 'row'}]}>
                <TouchableOpacity
                    style={styles.topMain}
                    onPress={() => navigation.navigate('PageSign')}
                    activeOpacity={1}
                >
                    <Image source={require('../../assets/btn/icone-fleche-retour.png')} />
                </TouchableOpacity>
                <TouchableOpacity
                    activeOpacity={1}
                    onPressIn={() => setPressLogout(true)}
                    onPressOut={() => Logout()}
                >
                    {pressLogout
                        ? <Image style={styles.btnlogout} source={require('../../assets/btn/icone-logout-down.png')} />
                        : <Image style={styles.btnlogout} source={require('../../assets/btn/icone-logout.png')} />
                    }
                </TouchableOpacity>
            </View>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>

                <View style={styles.inputs}>
                    <Text style={styles.error}>{error}</Text>
                    <ImageBackground style={styles.inputImage} source={require('../../assets/input.png')}>
                        <TextInput style={[styles.username, { textAlign: 'center' }]} onChangeText={(value) => setSignInUsername(value)} value={signInUsername} placeholderTextColor="black" placeholder='change username'></TextInput>
                    </ImageBackground>

                    <ImageBackground style={styles.inputImage} source={require('../../assets/input.png')}>
                        <TextInput style={[styles.email, { textAlign: 'center' }]} placeholderTextColor="black" onChangeText={(value) => setSignInPassword(value)} value={signInPassword} placeholder='change email'></TextInput>
                    </ImageBackground>

                    <ImageBackground style={styles.inputImage} source={require('../../assets/input.png')}>
                        <TextInput style={[styles.password, { textAlign: 'center' }]} onChangeText={(value) => setSignInUsername(value)} value={signInUsername} placeholderTextColor="black" placeholder='original password'></TextInput>
                    </ImageBackground>
                    <ImageBackground style={styles.inputImage} source={require('../../assets/input.png')}>
                        <TextInput style={[styles.password, { textAlign: 'center' }]} onChangeText={(value) => setSignInUsername(value)} value={signInUsername} placeholderTextColor="black" placeholder='new password'></TextInput>
                    </ImageBackground>
                    <View style={styles.sound}>
                        <TouchableOpacity
                            activeOpacity={1}
                            onPressIn={() => setPressSound(!pressSound)}
                            onPressOut={() => ChangeSound()}
                        >
                            {
                                isPressed ? (
                                    pressSound ? (
                                        <Image style={styles.imagesound} source={require('../../assets/btn/sound-off-down.png')} />
                                    ) : (
                                        <Image style={styles.imagesound} source={require('../../assets/btn/sound-off.png')} />
                                    )
                                ) : (
                                    pressSound ? (
                                        <Image style={styles.imagesound} source={require('../../assets/btn/sound-on-red-down.png')} />
                                    ) : (
                                        <Image style={styles.imagesound} source={require('../../assets/btn/sound-on-red.png')} />
                                    )
                                )
                            }
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity
                        activeOpacity={1}
                        onPressIn={() => setPressNext(true)}
                        onPressOut={() => Next()}
                    >
                        {pressNext
                            ? <Image style={styles.btn} source={require('../../assets/btn/btn-save-down.png')} />
                            : <Image style={styles.btn} source={require('../../assets/btn/btn-save.png')} />
                        }
                    </TouchableOpacity>
                </View>
            </TouchableWithoutFeedback>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,

    },
    topMain: {
        paddingTop: 50
    },
    inputs: {
        //backgroundColor: 'rgba(145, 71, 255, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
        top: '133',
        gap: 10,
    },
    username: {
        //backgroundColor: 'rgba(138, 71, 255, 0.5)',
        fontFamily: 'Minecraft',
        fontSize: '20',
        paddingTop: 25,
        marginLeft: 20,
        width: 280,
    },
    password: {
        //backgroundColor: 'rgba(138, 71, 255, 0.5)',
        fontFamily: 'Minecraft',
        fontSize: '20',
        paddingTop: 25,
        marginLeft: 20,
        width: 280,
    },
    email: {
        //backgroundColor: 'rgba(138, 71, 255, 0.5)',
        fontFamily: 'Minecraft',
        fontSize: '20',
        paddingTop: 25,
        marginLeft: 20,
        width: 280,
    },
    inputImage: {
        // backgroundColor: 'rgba(255, 99, 71, 0.5)',
        width: 320,
        height: 70,
    },
    error: {
        color: 'red',
        fontFamily: 'Minecraft',
    },
    btnlogout: {
        //backgroundColor: 'rgba(255, 99, 71, 0.5)',

        // width: 155,
        // height: 55,
        // top: 30,
        // marginRight: 10,
        top: 30,
        width: 70,
        height: 70,
    },
    topPart: {
        //backgroundColor: 'rgba(255, 99, 71, 0.5)',
        justifyContent: 'space-between',
        alignItems: 'center',
    }
});
