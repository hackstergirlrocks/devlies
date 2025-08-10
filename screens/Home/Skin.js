import { StyleSheet, Text, View, Image, TouchableOpacity, ImageBackground, Button } from 'react-native';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useFonts } from 'expo-font'
import { login, setSkin } from '../../reducers/user'
import skins from "../../constants/skins";;

export default function App({ navigation }) {
    const dispatch = useDispatch();

    // Fonts 
    const [fontsLoaded] = useFonts({
        'Minecraft': require('../../assets/fonts/Minecraft.ttf'),
    });

    if (!fontsLoaded) {
        return null;
    }

    // State pour les boutons 
    const [pressSave, setPressSave] = useState(false)
    const [skinPlayerBdd, setSkinPlayerBdd] = useState([])
    const [countSkin, setCountSkin] = useState(0);

    // Redux
    const user = useSelector((state) => state.user.value);

    // Récupération des skins de l'utilisateur
    useEffect(() => {
        fetch(`http://${process.env.EXPO_PUBLIC_API_URL}/users/getskin/` + user.token)
            .then((response) => response.json())
            .then((data) => {
                setSkinPlayerBdd(data.skin);
                console.log(data.skin)
            });
    }, [user.token]);

    // Étape 1 : Filtrer et combiner les skins du joueur
    const combinedSkins = skinPlayerBdd
        .filter((skinKey) => skins[skinKey]) // Ne garde que les skins existants
        .map((skinKey) => ({
            key: skinKey,
            name: skins[skinKey].name,
            image: skins[skinKey].require,
            displayName: skins[skinKey].displayName,
        }));

    // Étape 2 : Affichage des skins valides
    const listItems = combinedSkins.map((skin, index) => (
        <View key={skin.key || index}>
            <Image style={styles.skin} source={skin.image} />
            <Text style={styles.textSkin}>{skin.displayName}</Text>
        </View>
    ));

    // Fonction pour changer de skin avec fleches
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

    // Fonction pour sauvegarder le skin dans la BDD
    const SaveSkin = () => {
        fetch(`http://${process.env.EXPO_PUBLIC_API_URL}/users/sakeSkin`, {
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

    // State pour le message de confirmation 
    const [message, setMessage] = useState("");

    const showMessage = () => {
        setMessage("Ton skin a bien ete change !");
        setTimeout(() => {
            setMessage('');
        }, 3000);
    };

    const addAllSkins = () => {
        const skinNames = Object.keys(skins); // récupère tous les noms

        for (let i = 0; i < skinNames.length; i++) {
            fetch(`http://${process.env.EXPO_PUBLIC_API_URL}/users/addskin`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    token: user.token,
                    skin: skinNames[i]
                }),
            })
                .then((response) => response.json())
                .then((data) => {
                });
        }
    }

    return (
        <ImageBackground style={styles.container} source={require('../../assets/SkinPage/page-skin-background-big.png')}>
            <View style={[styles.topPart, { flexDirection: 'row' }]}>
                <TouchableOpacity
                    style={styles.topMain}
                    onPress={() => navigation.navigate('Home')}
                    activeOpacity={1}

                >
                    <Image style={styles.flecheHaut} source={require('../../assets/btn/icone-fleche-retour.png')} />
                    <Button
                        title={"Ajouter tous les skins"}
                        onPress={addAllSkins}
                    />
                </TouchableOpacity>
            </View>

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
                style={styles.savebtn}
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
        //backgroundColor: 'grey',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        top: -70
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
        bottom: 45,

    },
    topMain: {
        left: -110,
        top: -90,
        // paddingTop: 50,
        // backgroundColor: 'rgba(22, 22, 22, 0.5)',
    },
    textSkin: {
        textAlign: 'center',
        fontFamily: 'Minecraft',
        fontSize: 25,
    },
    savebtn: {
        bottom: 50,
    },
    flecheHaut: {
        width: 75,
        height: 60,
        marginLeft: 20,
    },
    topPart: {
        //backgroundColor: 'rgba(255, 99, 71, 0.5)',
        justifyContent: 'space-between',
        alignItems: 'center',
    },



});
