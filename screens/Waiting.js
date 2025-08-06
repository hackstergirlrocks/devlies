import { StyleSheet, View, Image, TouchableOpacity, ImageBackground } from 'react-native';
import { useEffect, useState } from 'react';

import { useSelector, useDispatch } from 'react-redux';

import { initMusic } from "../constants/music";
import { playMusic, pauseMusic } from "../constants/music";

import { setMusic } from '../reducers/user';

export default function App({ navigation }) {
    const dispatch = useDispatch();

    // Redux 
    const user = useSelector((state) => state.user.value);
    const token = user.token

    // State pour les boutons
    const [press, setPress] = useState(false)
    const [pressSound, setPressSound] = useState(false)
    const [isPressed, setPressed] = useState(true)

    // Function qui lance la musique 
    useEffect(() => {
        if (user.music) {
            initMusic(require("../assets/Song/lonelytree.mp3"));
        }
    }, [user.music])

    // Function stop ou pas la musique via le button
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

    // Function pour changer de page
    // Si token existe, on va sur la page Home, sinon on va sur la page de connexion 
    const NavigateToLogin = () => {
        console.log('token', token)
        
        
        if (token) {
            navigation.navigate('Home')
        } else {
            // navigation.navigate('Parametres')
            // navigation.navigate('PageSign')
            navigation.navigate('PageSign')
        }
        setPress(!press)
    }

    return (
        <ImageBackground style={styles.container} source={require('../assets/WaitingPage/animation-desk-bigger2.gif')}>
            <View style={styles.sound}>
                <TouchableOpacity
                    activeOpacity={1}
                    onPressIn={() => setPressSound(!pressSound)}
                    onPressOut={() => ChangeSound()}
                >
                    {
                        !user.music ? (
                            pressSound ? (
                                <Image style={styles.imagesound} source={require('../assets/btn/sound-off-down.png')} />
                            ) : (
                                <Image style={styles.imagesound} source={require('../assets/btn/sound-off.png')} />
                            )
                        ) : (
                            pressSound ? (
                                <Image style={styles.imagesound} source={require('../assets/btn/sound-on-red-down.png')} />
                            ) : (
                                <Image style={styles.imagesound} source={require('../assets/btn/sound-on-red.png')} />
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
        alignItems: 'center',
        bottom: 50,
    },

    sound: {
        alignItems: 'flex-end',
        top: 50,
        marginRight: 15,
    },
    imagesound: {
        width: 70,
        height: 70,
    }
});