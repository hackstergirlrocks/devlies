import { StyleSheet, Text, View, Image, TouchableOpacity, ImageBackground, TextInput, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { useState } from 'react';
import { useFonts } from 'expo-font'
import { useDispatch } from 'react-redux';
import { login, setSkin, setUsername } from '../../reducers/user';


export default function App({ navigation }) {
    const dispatch = useDispatch();

    // bouton next si appuyé ou non
    const [pressNext, setPressNext] = useState(false);

    // infos user au moment de la connexion
    const [signInUsername, setSignInUsername] = useState('');
    const [signInPassword, setSignInPassword] = useState('');

    // affiche erreur
    const [error, setError] = useState('');

    // écriture Minecraft
    const [fontsLoaded] = useFonts({
        'Minecraft': require('../../assets/fonts/Minecraft.ttf'),
    });

    if (!fontsLoaded) {
        return null;
    }

    // quand appuie sur next
    const Next = () => {
        fetch(`http://${process.env.EXPO_PUBLIC_API_URL}/users/signin`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username: signInUsername, password: signInPassword }),
        }).then(response => response.json())
            .then(data => {
                if (data.result) {
                    dispatch(login({ token: data.token }));
                    dispatch(setSkin({ skin: data.skin }));
                    dispatch(setUsername(data.username));

                    // setSignInUsername('');
                    // setSignInPassword('');
                    navigation.navigate('Home')
                } else {
                    console.log(data.error)
                    setError(data.error)
                }
            });
        setPressNext(false)
        console.log('next pressed');
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

                <View style={styles.inputs}>
                    <Text style={styles.error}>{error}</Text>
                    <ImageBackground style={styles.inputImage} source={require('../../assets/input.png')}>
                        <TextInput  keyboardType="email-address" style={[styles.username, { textAlign: 'center' }]} onChangeText={(value) => setSignInUsername(value)} value={signInUsername} placeholderTextColor="black" placeholder='email/username'></TextInput>
                    </ImageBackground>

                    <ImageBackground style={styles.inputImage} source={require('../../assets/input.png')}>
                        <TextInput style={[styles.password, { textAlign: 'center' }]} secureTextEntry={true} placeholderTextColor="black" onChangeText={(value) => setSignInPassword(value)} value={signInPassword} placeholder='password'></TextInput>
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
    inputImage: {
        // backgroundColor: 'rgba(255, 99, 71, 0.5)',
        width: 320,
        height: 70,
    },
    error: {
        color: 'red',
        fontFamily: 'Minecraft',
    },
});
