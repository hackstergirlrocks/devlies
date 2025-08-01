import { StyleSheet, Text, View, Image, TouchableOpacity, ImageBackground } from 'react-native';
import { useEffect, useState } from 'react';

export default function App({ navigation }) {
    // Recup le token du joueur via redux ici
    const token = 'MOIFF'
    // Recup le skin du joueur ici
    const [skinUser, setSkinUser] = useState(require('../assets/Skin/onlyguts.png'));

    // Gestion des animation des buttons 
    const [pressSignUP, setPressSignUP] = useState(false);
    const [pressSignIN, setPressSignIN] = useState(false);


    // Sécurité si utilisateur pas connecte zebi
    useEffect(() => {
        if (!token) {
            navigation.navigate('Waiting')
        }
    }, [])

    return (
        <ImageBackground style={styles.container} source={require('../assets/WaitingPage/animation-desk-bigger.gif')}>
            <TouchableOpacity
                activeOpacity={1}
                onPressIn={() => setPressSignUP(true)}
                onPressOut={() => setPressSignUP(false)}
            >
                {pressSignUP
                    ? <Image style={styles.btn} source={require('../assets/btn/btn-sign-up-down.png')} />
                    : <Image style={styles.btn} source={require('../assets/btn/btn-sign-up.png')} />
                }
            </TouchableOpacity>
            <TouchableOpacity

                activeOpacity={1}
                onPressIn={() => setPressSignIN(true)}
                onPressOut={() => setPressSignIN(false)}
            >
                {pressSignIN
                    ? <Image style={styles.btn} source={require('../assets/btn/btn-sign-in-down.png')} />
                    : <Image style={styles.btn} source={require('../assets/btn/btn-sign-in.png')} />
                }
            </TouchableOpacity>

        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 5
    },
    btn: {
        margin: 5,
    }

});
