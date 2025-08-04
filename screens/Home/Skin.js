import { StyleSheet, Text, View, Image, TouchableOpacity, ImageBackground } from 'react-native';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

export default function App({ navigation }) {
    const [pressSave, setPressSave] = useState(false)

    // Recup le token du joueur via redux ici
    const user = useSelector((state) => state.user.value);

    // const token = user.token

    // Recup le skin du joueur ici
    const skins = {
        "ange": require("../../assets/Skin/ange-big.png"),
        "astro": require("../../assets/Skin/astro-big.png"),
        "basic": require("../../assets/Skin/basic-big.png"),
        "cat": require("../../assets/Skin/cat-big.png"),
        "clovis": require("../../assets/Skin/clovis-big.png"),
        "clown": require("../../assets/Skin/clown-big.png"),
        "demon": require("../../assets/Skin/demon-big.png"),
        "flower-girl": require("../../assets/Skin/flower-girl-big.png"),
        "guts": require("../../assets/Skin/guts-big.png"),
        "lunette": require("../../assets/Skin/lunette-big.png"),
        "mafia": require("../../assets/Skin/mafia-big.png"),
        "nosferatu": require("../../assets/Skin/nosferatu-big.png"),
        "peach": require("../../assets/Skin/peach-big.png"),
        "plant": require("../../assets/Skin/plant-big.png"),
        "pokemon": require("../../assets/Skin/pokemon-big.png"),
        "robot": require("../../assets/Skin/robot-big.png"),
        "roi": require("../../assets/Skin/roi-big.png"),
        "wolf": require("../../assets/Skin/wolf-big.png"),
        "emo": require("../../assets/Skin/emo-big.png"),
        // "other.png": require("../assets/Skin/other.png"),
    };

    const [skinPlayer, setSkinPlayer] = useState(user.skin);
    const [skinUser, setSkinUser] = useState(skins[skinPlayer]);

    return (
        <ImageBackground style={styles.container} source={require('../../assets/HomePage/desk-home-page-bigger.png')}>
            <View style={styles.box}>
                <TouchableOpacity
                    style={styles.btn}
                    activeOpacity={1}
                >
                    <Image style={styles.fleche} source={require('../../assets/btn/fleche-gauche.png')} />


                </TouchableOpacity>
                <Image style={styles.skin} source={skinUser} />

                <TouchableOpacity
                    style={styles.btn}
                    activeOpacity={1}
                >
                    <Image style={styles.fleche} source={require('../../assets/btn/fleche-droite.png')} />

                </TouchableOpacity>

            </View>
            <TouchableOpacity
                style={styles.switchPage}
                activeOpacity={1}
                onPressIn={() => setPressSave(true)}
                onPressOut={() => setPressSave(false)}
            >
                {pressSave
                    ? <Image style={styles.btn} source={require('../../assets/btn/btn-save-down.png')} />
                    : <Image style={styles.btn} source={require('../../assets/btn/btn-save.png')} />
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
        gap: 50
    },

    box: {
        backgroundColor: 'grey',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
    },


    fleche: {
        width: 75,
        height: 75,
    },



    skin: {
        width: 170,
        height: 170,
    }

});
