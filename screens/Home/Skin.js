import { StyleSheet, Text, View, Image, TouchableOpacity, ImageBackground } from 'react-native';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useFonts } from 'expo-font'
import { login, setSkin } from '../../reducers/user';


export default function App({ navigation }) {
    const dispatch = useDispatch();


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

    const [skinPlayerBdd, setSkinPlayerBdd] = useState([])
    const [countSkin, setCountSkin] = useState(0);

    useEffect(() => {
        fetch("http://192.168.100.206:3000/users/getskin/" + user.token)
            .then((response) => response.json())
            .then((data) => {
                setSkinPlayerBdd(data.skin);
            });
    }, [user.token]);


    const combinedSkins = skinPlayerBdd.map((skinKey) => ({
        name: skinKey,
        image: skins[skinKey] || null,
    })).filter((s) => s.image !== null);


    const listItems = combinedSkins.map((user) =>
        <Image style={styles.skin} source={user.image} />

    );

    const PlusSkin = () => {
        if ((combinedSkins.length - 1) === countSkin) {
            setCountSkin(0)
        } else {
            setCountSkin(countSkin + 1)
        }
    }

    const MoinSkin = () => {
        if (countSkin === 0) {
            setCountSkin(combinedSkins.length - 1)
        } else {
            setCountSkin(countSkin - 1)
        }
    }


    const SaveSkin = () => {
        fetch("http://192.168.100.206:3000/users/sakeSkin", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                token: user.token,
                skin: combinedSkins[countSkin].name
            }),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data.skin);
                dispatch(setSkin({ skin: data.skin }));
                showMessage()
            });
    }

    const [message, setMessage] = useState("");

    const [fontsLoaded] = useFonts({
        'Minecraft': require('../../assets/fonts/Minecraft.ttf'),
    });

    if (!fontsLoaded) {
        return null;
    }

    const showMessage = () => {
        setMessage("Ton skin a bien été changé !");
        setTimeout(() => {
            setMessage('');
        }, 3000);
    };

    return (
        <ImageBackground style={styles.container} source={require('../../assets/SkinPage/background-blue-clair.png')}>
            <TouchableOpacity
                style={styles.topMain}
                onPress={() => navigation.navigate('Home')}
                activeOpacity={1}

            >
                <Image source={require('../../assets/btn/icone-fleche-retour.png')} />
            </TouchableOpacity>

            <Text style={styles.skinChange}>{message}</Text>
            <View style={styles.box}>
                <TouchableOpacity
                    style={styles.btn}
                    activeOpacity={1}
                    onPress={MoinSkin}
                >
                    <Image style={styles.fleche} source={require('../../assets/btn/fleche-gauche.png')} />
                </TouchableOpacity>
                {listItems[0 + countSkin]}
                <TouchableOpacity
                    style={styles.btn}
                    activeOpacity={1}
                    onPress={PlusSkin}
                >
                    <Image style={styles.fleche} source={require('../../assets/btn/fleche-droite.png')} />
                </TouchableOpacity>

            </View>
            <TouchableOpacity
                style={styles.switchPage}
                activeOpacity={1}
                onPressIn={() => setPressSave(true)}
                onPressOut={() => setPressSave(false)}
                onPress={SaveSkin}
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
        // backgroundColor: 'grey',
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
    },

    skinChange: {
        fontSize: 25,
        color: 'white',
        fontFamily: 'Minecraft',

    },
    topMain: {
        left: -120,
        top: -90
    }



});
