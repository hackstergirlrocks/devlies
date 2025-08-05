import { StyleSheet, Text, View, Image, TouchableOpacity, ImageBackground, TextInput, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { useEffect, useState } from 'react';
import { useFonts } from 'expo-font'
import { useDispatch } from 'react-redux';
import { login, logout, setSkin } from '../../reducers/user';
import { useAudioPlayer } from 'expo-audio';
import { playMusic, pauseMusic, toggleMusic } from "../../constants/music";
import { useSelector } from 'react-redux';
import { setMusic } from '../../reducers/user';


export default function Parametres({ navigation }) {

    const audioSource = require('../../assets/Song/lonelytree.mp3');
    const player = useAudioPlayer(audioSource);

    const user = useSelector((state) => state.user.value);


    const dispatch = useDispatch();

    const [pressPassword, setPressPassword] = useState('');
    const [pressUsername, setPressUsername] = useState('');
    const [pressEmail, setPressEmail] = useState('');
    const [pressLogout, setPressLogout] = useState(false)

    const [changeUsername, setChangeUsername] = useState('');
    const [changePassword, setChangePassword] = useState('');
    const [changeNewPassword, setChangeNewPassword] = useState('');
    const [changeEmail, setChangeEmail] = useState('');

    const [errorUsername, setErrorUsername] = useState('');
    const [errorEmail, setErrorEmail] = useState('');
    const [errorPassword, setErrorPassword] = useState('');

    const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;


    const [valid, setValid] = useState('');

    const [pressSound, setPressSound] = useState(false)
    const [isPressed, setPressed] = useState(true)


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
            playMusic()
            dispatch(setMusic(true));

        } else {
            // player.seekTo(0);
            pauseMusic()
            dispatch(setMusic(false));

        }
    }

    const functionUsername = () => {
        fetch(`http://${process.env.EXPO_PUBLIC_API_URL}/users/changeusername/${user.token}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username: changeUsername }),
        }).then(response => response.json())
            .then(data => {
                if (data.result) {
                    setChangeUsername('')
                    setErrorUsername('')
                    setValid('Username changed successfully !')
                } else {
                    console.log(data.error)
                    setErrorUsername(data.error)
                }
            });
    }


    const functionEmail = () => {
        if (EMAIL_REGEX.test(changeEmail)) {
            fetch(`http://${process.env.EXPO_PUBLIC_API_URL}/users/changeemail/${user.token}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: changeEmail }),
            }).then(response => response.json())
                .then(data => {
                    if (data.result) {
                        setChangeEmail('')
                        setValid('Email changed successfully !')
                        setErrorEmail('')
                    } else {
                        console.log(data.error)
                        setErrorEmail(data.error)
                    }
                });
        } else {
            setErrorEmail('Email not valid !')
        }
    }


    const functionPassword = () => {
        fetch(`http://${process.env.EXPO_PUBLIC_API_URL}/users/changepassword/${user.token}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ password: changePassword, newpassword: changeNewPassword }),
        }).then(response => response.json())
            .then(data => {
                if (data.result) {
                    setChangeNewPassword('')
                    setChangePassword('')
                    setValid('Password changed successfully !')
                    setErrorPassword('')
                } else {
                    console.log(data.error)
                    setErrorPassword(data.error)
                }
            });
    }


    const Logout = () => {
        dispatch(logout({ token: null }));
        navigation.navigate('Waiting')
    }




    return (

        <ImageBackground style={styles.container} source={require('../../assets/WaitingPage/animation-desk-bigger.gif')}>

            <View style={[styles.topPart, { flexDirection: 'row' }]}>
                <TouchableOpacity
                    style={styles.topMain}
                    onPress={() => navigation.navigate('Home')}
                    activeOpacity={1}
                >
                    <Image source={require('../../assets/btn/icone-fleche-retour.png')} />
                </TouchableOpacity>
                <View style={[styles.soundlogout, { flexDirection: 'row' }]}>
                    <TouchableOpacity
                        activeOpacity={1}
                        onPressIn={() => setPressSound(!pressSound)}
                        onPressOut={() => ChangeSound()}
                    >
                        {
                            !user.music ? (
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
            </View>
            {/* <TouchableWithoutFeedback onPress={Keyboard.dismiss}> */}
            <View style={styles.content}>
                <View style={styles.inputs}>

                    {/* USERNAME */}
                    <Text style={styles.error}>{errorUsername}</Text>
                    <Text style={styles.valid}>{valid}</Text>

                    <ImageBackground style={styles.inputImage} source={require('../../assets/input.png')}>
                        <TextInput style={[styles.username, { textAlign: 'center' }]} onChangeText={(value) => setChangeUsername(value)} value={changeUsername} placeholderTextColor="black" placeholder='change username'></TextInput>
                    </ImageBackground>
                    <TouchableOpacity
                        activeOpacity={1}
                        onPressIn={() => setPressUsername(true)}
                        onPressOut={() => functionUsername()}
                    >
                        {pressUsername
                            ? <Image style={styles.btn} source={require('../../assets/btn/btn-save-down.png')} />
                            : <Image style={styles.btn} source={require('../../assets/btn/btn-save.png')} />
                        }
                    </TouchableOpacity>

                    {/* EMAIL */}
                    <Text style={styles.error}>{errorEmail}</Text>
                    <ImageBackground style={styles.inputImage} source={require('../../assets/input.png')}>
                        <TextInput style={[styles.email, { textAlign: 'center' }]} placeholderTextColor="black" onChangeText={(value) => setChangeEmail(value)} value={changeEmail} placeholder='change email'></TextInput>
                    </ImageBackground>
                    <TouchableOpacity
                        activeOpacity={1}
                        onPressIn={() => setPressEmail(true)}
                        onPressOut={() => functionEmail()}
                    >
                        {pressEmail
                            ? <Image style={styles.btn} source={require('../../assets/btn/btn-save-down.png')} />
                            : <Image style={styles.btn} source={require('../../assets/btn/btn-save.png')} />
                        }
                    </TouchableOpacity>

                    {/* PASSWORD CONFIRM ET NEW */}
                    <Text style={styles.error}>{errorPassword}</Text>
                    <ImageBackground style={styles.inputImage} source={require('../../assets/input.png')}>
                        <TextInput style={[styles.password, { textAlign: 'center' }]} onChangeText={(value) => setChangePassword(value)} value={changePassword} placeholderTextColor="black" placeholder='original password'></TextInput>
                    </ImageBackground>

                    <ImageBackground style={styles.inputImage} source={require('../../assets/input.png')}>
                        <TextInput style={[styles.password, { textAlign: 'center' }]} onChangeText={(value) => setChangeNewPassword(value)} value={changeNewPassword} placeholderTextColor="black" placeholder='new password'></TextInput>
                    </ImageBackground>
                    <TouchableOpacity
                        activeOpacity={1}
                        onPressIn={() => setPressPassword(true)}
                        onPressOut={() => functionPassword()}
                    >
                        {pressPassword
                            ? <Image style={styles.btn} source={require('../../assets/btn/btn-save-down.png')} />
                            : <Image style={styles.btn} source={require('../../assets/btn/btn-save.png')} />
                        }
                    </TouchableOpacity>
                </View>
            </View>
            {/* </TouchableWithoutFeedback> */}
        </ImageBackground >
    );
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    topMain: {
        // backgroundColor: 'red',
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
    valid: {
        color: 'rgb(29, 255, 104)',
        fontFamily: 'Minecraft',
    },
    btnlogout: {
        top: 30,
        width: 70,
        height: 70,
        //backgroundColor: 'rgba(255, 99, 71, 0.5)',
        right: 10,
    },
    imagesound: {
        top: 30,
        width: 70,
        height: 70,
        //backgroundColor: 'rgba(255, 99, 71, 0.5)',
        right: 10,
    },
    topPart: {
        //backgroundColor: 'rgba(255, 99, 71, 0.5)',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    btn: {
        //backgroundColor: 'rgba(255, 99, 71, 0.5)',
        width: 140,
        height: 60,
    },
    content: {
        //backgroundColor: 'rgba(135, 71, 255, 0.5)',
        bottom: 110,
    },
});
