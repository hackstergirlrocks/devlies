import { StyleSheet, Text, View, Image, TouchableOpacity, ImageBackground, Modal, ScrollView } from 'react-native';
import { useEffect, useState } from 'react';
import { useFonts } from 'expo-font'
import { useSelector } from 'react-redux';

import skins from "../../constants/skins";

export default function Shop({ navigation }) {

    const user = useSelector((state) => state.user.value);

    const [infoCoin, setInfoCoin] = useState(0)
    const [infoSkin, setInfoSkin] = useState([])

    const [modalVisible, setModalVisible] = useState(false)
    const [modalImage, setModalImage] = useState('');
    const [msgBack, setMsgBack] = useState('')

    const [refresh, setRefresh] = useState(true)
    const [pressValid, setPressValid] = useState('')
    const [pressCroix, setPressCroix] = useState('')

    // récupère toutes les infos de l'user
    useEffect(() => {
        fetch(`http://${process.env.EXPO_PUBLIC_API_URL}/users/` + user.token)
            .then((response) => response.json())
            .then((data) => {
                setInfoCoin(data.info.coins)
                setInfoSkin(data.info.skins)
            });
    }, [refresh]);


    // récupère tous les noms des skins
    let skinList = Object.entries(skins).map(([key, skin]) => skin.name)
    // filtre pour créer un tableau des skins communs (entre l'user et le jeu)
    let skinCommun = infoSkin.filter(name => (skinList.includes(name)))

    const filtreSkin = Object.entries(skins).filter(([key, image]) => !skinCommun.includes(image.name))

    const [fontsLoaded] = useFonts({
        'Minecraft': require('../../assets/fonts/Minecraft.ttf'),
    });

    if (!fontsLoaded) {
        return null;
    }

    // fonction qui prend en argument image pour récupérer ces infos
    const openModal = (image) => {
        setModalImage(image)
        setModalVisible(!modalVisible)
    }

    const buySkin = () => {
        fetch(`http://${process.env.EXPO_PUBLIC_API_URL}/users/buySkin/` + user.token, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                coins: modalImage.price,
                skin: modalImage.name
            })
        })
            .then((response) => response.json())
            .then((data) => {
                if (data) {
                    setMsgBack(data.message)
                    setRefresh(!refresh)

                    setTimeout(() => {
                        setMsgBack('');
                    }, 3000);
                }
            })
        setModalVisible(!modalVisible)
    }

    return (
        <ImageBackground style={styles.container} source={require('../../assets/HomePage/fond-bleu.png')}>
            <View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%', height: 100, top: 20 }}>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('Home')}
                        activeOpacity={1}
                    >
                        <Image source={require('../../assets/btn/icone-fleche-retour.png')} style={{ width: 75, height: 60, marginLeft: 20 }} />
                    </TouchableOpacity>
                    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', right: 10 }}>
                        <Text style={{ fontFamily: 'Minecraft', fontSize: '20' }}>Total coins : {infoCoin}</Text>
                        <Image source={require('../../assets/HomePage/icone-coin.png')} style={styles.coin} />
                    </View>
                </View>
                <Text style={{ textAlign: 'center', fontFamily: 'Minecraft', fontSize: 15, color: 'rgb(29, 255, 104)' }}>{msgBack}</Text>
            </View>
            <ScrollView>
                <View style={{ flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center', marginTop: 10 }}>
                    {filtreSkin.length > 0 ? (
                        filtreSkin.map(([key, image]) => (
                            <ImageBackground source={require('../../assets/HomePage/icone-pop-up-windows-final (2).png')} key={key} style={{ width: 120, height: 120, justifyContent: 'center', alignItems: 'center' }}>
                                <TouchableOpacity onPress={() => openModal(image)}>
                                    <Image source={image.require} style={{ width: 60, height: 60 }} />
                                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                                        <Text style={{ fontFamily: 'Minecraft' }}>{image.price}</Text>
                                        <Image source={require('../../assets/HomePage/icone-coin.png')} style={{ width: 20, height: 20, bottom: 2 }} />
                                    </View>
                                </TouchableOpacity>
                            </ImageBackground>

                        ))
                    ) : (
                        <View style={{ height: 600, width: 250, alignItems: 'center', justifyContent: 'center'}}>
                            <Text style={{ fontFamily: 'Minecraft', fontSize: 25, textAlign: 'center' }}>Boutique vide, vous avez tous les skins!</Text>
                        </View>
                    )}
                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={modalVisible}
                        onRequestClose={() => {
                            setModalVisible(!modalVisible);
                        }}>
                        <ImageBackground source={require('../../assets/HomePage/pop-up-windows-final2.png')} resizeMode='contain' style={styles.image}>
                            <View>
                                <TouchableOpacity onPress={() => setModalVisible(!modalVisible)} style={{ width: 330, bottom: 44 }}>
                                    <Image source={require('../../assets/HomePage/croix-bleu-pop-up.png')} style={{ left: 8, height: 22, width: 22, }} />
                                </TouchableOpacity>
                            </View>
                            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                                <Text style={{ fontFamily: 'Minecraft', textTransform: 'uppercase', height: 20, width: 220, textAlign: 'center', fontSize: 25, bottom: 10 }}>{modalImage.name}</Text>
                                {/* <ImageBackground source={require('../../assets/HomePage/icone-pop-up-windows-final.png')} style={{ height: 300, width: 300, }}> */}
                                <View style={{ justifyContent: 'center', alignItems: 'center', height: 230, width: 230, left: 5 }}>
                                    <Image source={modalImage.require} style={{ width: 200, height: 200 }} />
                                    <Text style={{ fontFamily: 'Minecraft', height: 30, width: 220, textAlign: 'center', bottom: 5 }}>{modalImage.description}</Text>
                                </View>
                                {/* </ImageBackground> */}
                                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', top: 13 }}>
                                    <Text style={{ fontFamily: 'Minecraft', fontSize: 20 }}>{modalImage.price}</Text>
                                    <Image source={require('../../assets/HomePage/icone-coin.png')} style={{ width: 30, height: 30 }} />
                                </View>
                                {modalImage.price > infoCoin ?
                                    <View style={{ height: 172, width: 325, top: 30, alignItems: 'center', justifyContent: 'center' }}>
                                        <Text style={{ fontFamily: 'Minecraft', fontSize: 20, textAlign: 'center' }}>Vous n'avez pas assez de piece pour acheter ce skin</Text>
                                    </View>
                                    :
                                    <View style={{ height: 172, width: 325, top: 30, alignItems: 'center', justifyContent: 'center', gap: 20 }}>
                                        <Text style={{ fontFamily: 'Minecraft', fontSize: 20 }}>Voulez-vous acheter ce skin?</Text>
                                        <View style={{ flexDirection: 'row', gap: 20 }}>
                                            <TouchableOpacity
                                                activeOpacity={1}
                                                onPressIn={() => setPressValid(true)}
                                                onPress={() => buySkin(modalImage.price, modalImage.name)}
                                                onPressOut={() => setPressValid(false)}
                                            >
                                                {pressValid
                                                    ? <Image source={require('../../assets/btn/btn-check-down.png')} style={{ height: 50, width: 50 }} />
                                                    : <Image source={require('../../assets/btn/btn-check.png')} style={{ height: 50, width: 50 }} />
                                                }
                                            </TouchableOpacity>
                                            <TouchableOpacity
                                                activeOpacity={1}
                                                onPressIn={() => setPressCroix(true)}
                                                onPress={() => setModalVisible(!modalVisible)}
                                                onPressOut={() => setPressCroix(false)}
                                            >
                                                {pressCroix
                                                    ? <Image source={require('../../assets/btn/btn-croix-down.png')} style={{ height: 50, width: 50 }} />
                                                    : <Image source={require('../../assets/btn/btn-croix.png')} style={{ height: 50, width: 50 }} />
                                                }
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                }
                            </View>
                        </ImageBackground>
                    </Modal>
                </View>
            </ScrollView>
        </ImageBackground>

    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    coin: {
        height: 30,
        width: 30
    },
    image: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
})