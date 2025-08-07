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

    useEffect(() => {
        fetch(`http://${process.env.EXPO_PUBLIC_API_URL}/users/` + user.token)
            .then((response) => response.json())
            .then((data) => {
                setInfoCoin(data.info.coins)
                setInfoSkin(data.info.skins)
            });
    }, [infoCoin]);

    let skinList = Object.entries(skins).map(([key, skin]) => skin.name)
    // console.log('skin', skinList)
    let skinCommun = infoSkin.filter(name => (skinList.includes(name)))
    // let skinList = infoSkin.map(name => name);
    // console.log(infoSkin)
    // let skinCommun = Object.entries(skins).filter(name => (skinList.includes(name)))
    console.log('skinCommun', skinCommun)

    const [fontsLoaded] = useFonts({
        'Minecraft': require('../../assets/fonts/Minecraft.ttf'),
    });

    if (!fontsLoaded) {
        return null;
    }

    const openModal = (image) => {
        setModalImage(image)
        setModalVisible(!modalVisible)
    }



    return (
        <ImageBackground style={styles.container} source={require('../../assets/SkinPage/background-blue-clair.png')}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center', backgroundColor: 'rgba(120, 56, 87, 0.5)', width: '100%' }}>
                <TouchableOpacity
                    onPress={() => navigation.navigate('Home')}
                    activeOpacity={1}
                >
                    <Image source={require('../../assets/btn/icone-fleche-retour.png')} style={{ width: 75, height: 60, marginLeft: 20 }} />
                </TouchableOpacity>
                <Text>Shop</Text>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(170, 56, 87, 0.5)', width: '100%', height: 50 }}>
                <Text style={{ fontFamily: 'Minecraft', fontSize: '20' }}>Total coins : {infoCoin}</Text>
                <Image source={require('../../assets/HomePage/icone-coin.png')} style={styles.coin} />
            </View>
            <ScrollView>
                <View style={{ flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center' }}>
                    {Object.entries(skins).map(([key, image]) => (
                        <ImageBackground source={require('../../assets/HomePage/icone-pop-up-windows-final.png')} key={key} style={{ width: 120, height: 120, justifyContent: 'center', alignItems: 'center' }}>
                            <TouchableOpacity onPress={() => openModal(image)}>
                                <Image source={image.require} style={{ width: 60, height: 60 }} />
                                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                                    <Text style={{ fontFamily: 'Minecraft' }}>{image.price}</Text>
                                    <Image source={require('../../assets/HomePage/icone-coin.png')} style={{ width: 20, height: 20, bottom: 2 }} />
                                </View>
                            </TouchableOpacity>
                        </ImageBackground>


                    ))}
                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={modalVisible}
                        onRequestClose={() => {
                            setModalVisible(!modalVisible);
                        }}>
                        <ImageBackground source={require('../../assets/HomePage/pop-up-windows.png')} resizeMode='contain' style={styles.image}>
                            <View>
                                <TouchableOpacity onPress={() => setModalVisible(!modalVisible)} style={{ width: 330, bottom: 12, left: 27 }}>
                                    <Image source={require('../../assets/HomePage/croix-bleu-pop-up.png')} style={{ left: 10, height: 22, width: 22 }} />
                                </TouchableOpacity>
                            </View>
                            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                                <Text style={{ fontFamily: 'Minecraft', textTransform: 'uppercase', height: 20, width: 220, textAlign: 'center', fontSize: 25, top: 10 }}>{modalImage.name}</Text>
                                <ImageBackground source={require('../../assets/HomePage/icone-pop-up-windows-final.png')} style={{ height: 300, width: 300, }}>
                                    <View style={{ justifyContent: 'center', alignItems: 'center', height: 300 }}>
                                        <Image source={modalImage.require} style={{ width: 200, height: 200 }} />
                                        <Text style={{ fontFamily: 'Minecraft', height: 30, width: 220, textAlign: 'center' }}>{modalImage.description}</Text>
                                    </View>
                                </ImageBackground>
                                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                                    <Text style={{ fontFamily: 'Minecraft', fontSize: 20 }}>{modalImage.price}</Text>
                                    <Image source={require('../../assets/HomePage/icone-coin.png')} style={{ width: 30, height: 30 }} />
                                </View>
                                <View style={{ height: 145, width: 320, alignItems: 'center', justifyContent: 'center', gap: 20 }}>
                                    <Text style={{ fontFamily: 'Minecraft', fontSize: 20 }}>Voulez-vous acheter ce skin?</Text>
                                    <View style={{ flexDirection: 'row', gap: 20 }}>
                                        <Image source={require('../../assets/btn/btn-check.png')} style={{ height: 50, width: 50 }} />
                                        <Image source={require('../../assets/btn/btn-check.png')} style={{ height: 50, width: 50 }} />
                                    </View>
                                </View>
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