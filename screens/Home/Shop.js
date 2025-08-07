import { StyleSheet, Text, View, Image, TouchableOpacity, ImageBackground, Modal, ScrollView } from 'react-native';
import { useEffect, useState } from 'react';
import { useFonts } from 'expo-font'
import { useSelector } from 'react-redux';

import skins from "../../constants/skins";

export default function Shop({ navigation }) {

    const user = useSelector((state) => state.user.value);

    const [infoCoin, setInfoCoin] = useState(0)
    const [infoSkin, setInfoSkin] = useState([])
    const [listSkin, setListSkin] = useState([])

    const [modalVisible, setModalVisible] = useState(false)
    const [modalImage, setModalImage] = useState('');
    const [modalCoin, setModalCoin] = useState(0);

    useEffect(() => {
        fetch(`http://${process.env.EXPO_PUBLIC_API_URL}/users/` + user.token)
            .then((response) => response.json())
            .then((data) => {
                setInfoCoin(data.info.coins)
                setInfoSkin(data.info.skins)
            });
    }, [infoCoin]);

    useEffect(() => {
        setListSkin(Object.entries(skins))
    }, [])
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
                    <Image source={require('../../assets/btn/icone-fleche-retour.png')} />
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
                                <Image source={image} style={{ width: 60, height: 60 }} />
                                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                                    <Text style={{ fontFamily: 'Minecraft' }}>300</Text>
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
                            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                <Image source={modalImage.require} style={{ width: 200, height: 200 }} />
                                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                                    <Text style={{ fontFamily: 'Minecraft', fontSize: 20 }}>300</Text>
                                    <Image source={require('../../assets/HomePage/icone-coin.png')} style={{ width: 30, height: 30 }} />
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
    },
})