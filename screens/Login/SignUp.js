import { StyleSheet, Text, View, Image, TouchableOpacity, ImageBackground, TextInput, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { useState } from 'react';
import { useFonts } from 'expo-font'
import { useDispatch } from 'react-redux';
import { login, setSkin } from '../../reducers/user';


export default function App({ navigation }) {
    const dispatch = useDispatch();

    // bouton next si appuyé ou non
    const [pressNext, setPressNext] = useState(false);

    // information user au moment de l'inscription
    const [signUpUsername, setSignUpUsername] = useState('');
    const [signUpPassword, setSignUpPassword] = useState('');
    const [signUpPasswordVerif, setSignUpPasswordVerif] = useState('');
    const [signUpEmail, setSignUpEmail] = useState('');

    // affiche erreur
    const [error, setError] = useState('');

    // regex pour email + username (pas de caractère spéciaux)
    const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const PSEUDO_REGEX = /^[A-Za-z0-9]+$/;

    // écriture Minecraft
    const [fontsLoaded] = useFonts({
        'Minecraft': require('../../assets/fonts/Minecraft.ttf'),
    });

    if (!fontsLoaded) {
        return null;
    }

    // quand appuie sur next
    const Next = () => {
        // si email et username sont corrects d'après le regex
        if (EMAIL_REGEX.test(signUpEmail) || (PSEUDO_REGEX.test(signUpUsername))) {
            // si mdp1 et mdp2 sont égaux
            if (signUpPassword === signUpPasswordVerif) {
                console.log(true)
                fetch(`http://${process.env.EXPO_PUBLIC_API_URL}/users/signup`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ username: signUpUsername, email: signUpEmail, password: signUpPassword }),
                }).then(response => response.json())
                    .then(data => {
                        if (data.result) {
                            dispatch(login({ token: data.token }));
                            dispatch(setSkin({ skin: data.skin }));

                            setError('')
                            console.log(data.token)
                            navigation.navigate('Home')
                        } else {
                            console.log(data.error)
                            setError(data.error)
                        }

                    });
            } else {
                setError("Wrong password")
            }
        } else {
            setError("Email or username not valid")
        }
        setPressNext(false)
        console.log('next pressed');
        console.log(signUpEmail, signUpPasswordVerif, signUpPassword, signUpUsername)
    }


    return (

        <ImageBackground style={styles.container} source={require('../../assets/WaitingPage/animation-desk-bigger2.gif')}>

            <TouchableOpacity
                style={styles.topMain}
                onPress={() => navigation.navigate('PageSign')}
                activeOpacity={1}
            >
                <Image source={require('../../assets/btn/icone-fleche-retour.png')} />
            </TouchableOpacity>

            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <KeyboardAvoidingView
                    style={styles.container}
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                    keyboardVerticalOffset={Platform.OS === 'ios' ? 280 : 0}
                >
                    <View style={styles.inputs}>
                        <Text style={styles.error}>{error}</Text>
                        <ImageBackground style={styles.inputImage} source={require('../../assets/input.png')}>
                            <TextInput style={[styles.username, { textAlign: 'center' }]} onChangeText={(value) => setSignUpUsername(value)} value={signUpUsername} placeholderTextColor="black" placeholder='username'

                            ></TextInput>
                        </ImageBackground>

                        <ImageBackground style={styles.inputImage} source={require('../../assets/input.png')}>
                            <TextInput style={[styles.email, { textAlign: 'center' }]} onChangeText={(value) => setSignUpEmail(value)} value={signUpEmail} placeholderTextColor="black" placeholder='email'

                            ></TextInput>
                        </ImageBackground>

                        <ImageBackground style={styles.inputImage} source={require('../../assets/input.png')}>
                            <TextInput style={[styles.password, { textAlign: 'center' }]} secureTextEntry={true} onChangeText={(value) => setSignUpPassword(value)} value={signUpPassword} placeholderTextColor="black" placeholder='password'

                            ></TextInput>
                        </ImageBackground>

                        <ImageBackground style={styles.inputImage} source={require('../../assets/input.png')}>
                            <TextInput style={[styles.passwordConfirm, { textAlign: 'center' }]} secureTextEntry={true} textContentType="oneTimeCode" autoComplete="off" autoCorrect={false} spellCheck={false} onChangeText={(value) => setSignUpPasswordVerif(value)} value={signUpPasswordVerif} placeholderTextColor="black" placeholder='confirm password'
                            ></TextInput>
                        </ImageBackground>
                        <TouchableOpacity
                            activeOpacity={1}
                            onPressIn={() => setPressNext(true)}
                            onPressOut={() => Next()}
                        >
                            {pressNext
                                ? <Image style={styles.btn} source={require('../../assets/btn/btn-next-down.png')} />
                                : <Image style={styles.btn} source={require('../../assets/btn/btn-next.png')} />
                            }
                        </TouchableOpacity>
                    </View>
                </KeyboardAvoidingView>
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
        // backgroundColor: 'rgba(138, 71, 255, 0.5)',
        fontFamily: 'Minecraft',
        fontSize: '20',
        paddingTop: 25,
        marginLeft: 20,
        width: 280,
    },
    passwordConfirm: {
        // backgroundColor: 'rgba(138, 71, 255, 0.5)',
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

    }
});
