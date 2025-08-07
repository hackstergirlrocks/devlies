import { StyleSheet, SafeAreaView, Text, View, Image, TouchableOpacity, ImageBackground, TextInput, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { useState } from 'react';
import { useFonts } from 'expo-font'
import { useDispatch } from 'react-redux';
import { login, setSkin } from '../../reducers/user';

export default function Play2({ navigation }) {
    const dispatch = useDispatch();

    const [MessageChat, setMessageChat] = useState('');
    const [error, setError] = useState('');

    const [fontsLoaded] = useFonts({
        'Minecraft': require('../../assets/fonts/Minecraft.ttf'),
    });

    if (!fontsLoaded) {
        return null;
    }

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}
            >
                <ImageBackground style={styles.container} source={require('../../assets/game/in-game-page-bigger.png')}>
                    <View style={styles.nav}>
                        <TouchableOpacity>
                            <Image style={styles.fleche} source={require('../../assets/btn/icone-fleche-retour.png')} />
                        </TouchableOpacity>
                        <View style={styles.iconeDroite}>
                            <TouchableOpacity>
                                <Image style={styles.icone} source={require('../../assets/btn/icone-role.png')} />
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <Image style={styles.icone} source={require('../../assets/btn/icone-friends.png')} />
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={styles.divChat}>
                        <View style={styles.chat}>
                            <View style={styles.carreChat}></View>
                            <ImageBackground style={styles.input} source={require('../../assets/btn/input-long.png')}>
                                <TextInput
                                    style={styles.inputchat}
                                    placeholder='chat'
                                    placeholderTextColor={'black'}
                                    value={MessageChat}
                                    onChangeText={setMessageChat}
                                    onSubmitEditing={Keyboard.dismiss}
                                />
                                <TouchableOpacity>
                                    <Image style={styles.envoie} source={require('../../assets/btn/envoyer-chat.png')} />
                                </TouchableOpacity>
                            </ImageBackground>
                        </View>
                    </View>
                </ImageBackground>
            </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    nav: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 15,
    },
    iconeDroite: {
        flexDirection: 'row',
    },
    icone: {
        width: 50,
        height: 52,
        top: 35,
    },
    fleche: {
        width: 50,
        height: 40,
        top: 35,
    },
    chat: {
        width: '95%',
        height: 320,
        marginTop: 20,
        alignItems: 'center',
        justifyContent: 'center'
    },
    divChat: {
        alignItems: 'center',
        flex: 1,
        justifyContent: 'flex-end', // permet au chat de rester collé en bas
    },
    input: {
        height: 45,
        width: 350,
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
        //backgroundColor: 'rgba(242, 44, 44, 0.56)',
    },
    envoie: {
        width: 35,
        height: 35,
        marginRight: 20,
    },
    inputchat: {
        //backgroundColor: 'rgba(242, 44, 44, 0.56)',
        width: 270,
        marginLeft: 20,
        fontFamily: 'Minecraft',
        fontSize: 17,
    },
    carreChat: {
        //backgroundColor: 'rgba(242, 44, 44, 0.56)',
        width: 350,
        height: 230,
        marginBottom: 10,
    }
});