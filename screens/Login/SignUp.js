import { StyleSheet, Text, View, Image, TouchableOpacity, ImageBackground, TextInput, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { useEffect, useState } from 'react';
import { useFonts } from 'expo-font'

export default function App({ navigation }) {

    const [pressNext, setPressNext] = useState(false);
    const [focusedField, setFocusedField] = useState(null);
    const [message, setMessage] = useState('');

    const [fontsLoaded] = useFonts({
        'Minecraft': require('../../assets/fonts/Minecraft.ttf'),
    });

    if (!fontsLoaded) {
        return null;
    }

    const Next = () => {
        setPressNext(false)
        console.log('next pressed');
        // navigation.navigate('SignUp')
    }


    const ChangePassword = (value) => {
        console.log(message)
        setMessage(value)
    }


    return (

        <ImageBackground style={styles.container} source={require('../../assets/WaitingPage/animation-desk-bigger.gif')}>

            <TouchableOpacity
                style={styles.topMain}
                onPress={() => navigation.navigate('PageSign')}
                activeOpacity={1}
            >
                <Image source={require('../../assets/btn/icone-fleche-retour.png')} />
            </TouchableOpacity>

            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <KeyboardAvoidingView
                    style={styles.container}
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                    keyboardVerticalOffset={Platform.OS === 'ios' ? 80 : 0}
                >
                    <View style={styles.inputs}>
                        <ImageBackground style={styles.inputImage} source={require('../../assets/input.png')}>
                            <TextInput style={[styles.username, { textAlign: 'center' }]} placeholderTextColor="black" placeholder='username'
                              
                            ></TextInput>
                        </ImageBackground>

                        <ImageBackground style={styles.inputImage} source={require('../../assets/input.png')}>
                            <TextInput style={[styles.email, { textAlign: 'center' }]} placeholderTextColor="black" placeholder='email'
                           
                            ></TextInput>
                        </ImageBackground>

                        <ImageBackground style={styles.inputImage} source={require('../../assets/input.png')}>
                            <TextInput style={[styles.password, { textAlign: 'center' }]} placeholderTextColor="black" placeholder='password'
                               
                            ></TextInput>
                        </ImageBackground>

                        <ImageBackground style={styles.inputImage} source={require('../../assets/input.png')}>
                            <TextInput style={[styles.passwordConfirm, { textAlign: 'center' }]} placeholderTextColor="black" placeholder='confirm password'
                                onFocus={() => setFocusedField('confirmPassword')}
                                onBlur={() => setFocusedField(null)}
                                onChangeText={(value) => ChangePassword(value)}
                            ></TextInput>
                        </ImageBackground>
                        <TouchableOpacity
                            activeOpacity={1}
                            onPressIn={() => setPressNext(true)}
                            onPressOut={() => Next()}
                        >
                            {pressNext
                                ? <Image style={styles.btn} source={require('../../assets/btn/btn-next-down.png')} />
                                : <Image style={styles.btn} source={require('../../assets/btn/btn-next.png')} />
                            }
                        </TouchableOpacity>
                    </View>
                    {focusedField === 'password' || focusedField === 'confirmPassword' ? (
                        <View style={styles.messageBar}>
                            <TextInput
                                style={styles.messageInput}
                                placeholder="Votre password"
                                value={message}
                                onChangeText={setMessage}
                            />

                        </View>
                    ) : null}

                </KeyboardAvoidingView>
            </TouchableWithoutFeedback>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    topMain: {
        paddingTop: 50
    },
    inputs: {
        //backgroundColor: 'rgba(145, 71, 255, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
        top: '133',
        gap: 10,
    },

    username: {
        //backgroundColor: 'rgba(138, 71, 255, 0.5)',
        fontFamily: 'Minecraft',
        fontSize: '20',
        paddingTop: 25,

    },
    password: {
        //backgroundColor: 'rgba(138, 71, 255, 0.5)',
        fontFamily: 'Minecraft',
        fontSize: '20',
        paddingTop: 25,
    },
    email: {
        //backgroundColor: 'rgba(138, 71, 255, 0.5)',
        fontFamily: 'Minecraft',
        fontSize: '20',
        paddingTop: 25,
    },
    passwordConfirm: {
        //backgroundColor: 'rgba(138, 71, 255, 0.5)',
        fontFamily: 'Minecraft',
        fontSize: '20',
        paddingTop: 25,
    },
    inputImage: {
        // backgroundColor: 'rgba(255, 99, 71, 0.5)',
        width: 320,
        height: 70,
    },

    messageBar: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        top: -45,
        borderTopWidth: 1,
        borderColor: '#ddd',
        backgroundColor: '#fff',

    },
    messageInput: {
        flex: 1,
        backgroundColor: '#f0f0f0',
        borderRadius: 20,
        paddingVertical: 10,
        paddingHorizontal: 15,
        fontSize: 16,
        marginRight: 10,
    },
    sendButton: {
        backgroundColor: '#4caf50',
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 20,
    },


});
