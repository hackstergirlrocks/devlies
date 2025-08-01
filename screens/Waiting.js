import { StyleSheet, Text, View, Image, TouchableOpacity, ImageBackground, Button } from 'react-native';
import { useEffect, useState } from 'react';

import { useAudioPlayer } from 'expo-audio';



export default function App({ navigation }) {

    const audioSource = require('../assets/Song/lonelytree.mp3');
    const player = useAudioPlayer(audioSource);

    const [press, setPress] = useState(false)
    const [pressSound, setPressSound] = useState(false)
    const [isPressed, setPressed] = useState(false)

    // Function qui lance la musique 
    const SongStart = () => {
        player.seekTo(0);
        player.play();
    }
    useEffect(() => {
        SongStart()
    }, [])


    const NavigateToLogin = () => {
        navigation.navigate('Home')
        setPress(!press)
    }

    // Function stop ou pas la musique via le button
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

    return (
        <ImageBackground style={styles.container} source={require('../assets/WaitingPage/animation-desk-bigger.gif')}>
            <View style={styles.sound}>
                <TouchableOpacity
                    activeOpacity={1}
                    onPressIn={() => setPressSound(!pressSound)}
                    onPressOut={() => ChangeSound()}
                >
                    {
                        isPressed ? (
                            pressSound ? (
                                <Image source={require('../assets/btn/sound-off-down.png')} />
                            ) : (
                                <Image source={require('../assets/btn/sound-off.png')} />
                            )
                        ) : (
                            pressSound ? (
                                <Image source={require('../assets/btn/sound-on-red-down.png')} />
                            ) : (
                                <Image source={require('../assets/btn/sound-on-red.png')} />
                            )
                        )
                    }
                </TouchableOpacity>
            </View>

            <View style={styles.logo}>
                <Image source={require('../assets/WaitingPage/logo-animation-bigger.gif')} />
            </View>

            <TouchableOpacity
                style={styles.switchPage}
                activeOpacity={1}
                onPressIn={() => setPress(!press)}
                onPressOut={() => NavigateToLogin()}
            >
                {press
                    ? <Image style={styles.btn} source={require('../assets/btn/start-btn1.png')} />
                    : <Image style={styles.btn} source={require('../assets/btn/start-btn2.png')} />
                }
            </TouchableOpacity>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
    },

    switchPage: {
        justifyContent: 'flex-end',
        marginBottom: 50,
        marginLeft: 90,
        marginRight: 90,
        alignItems: 'center',
        // backgroundColor: 'red'
    },

    logo: {
        padding: 150,
        justifyContent: 'flex-end',
        alignItems: 'center'
    },

    sound: {
        alignItems: 'flex-end',
        top: 50,
    },

});