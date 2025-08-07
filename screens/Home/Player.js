import { StyleSheet, SafeAreaView, Text, View, Image, TouchableOpacity, ImageBackground, TextInput, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard } from 'react-native';
import React from 'react'

export default function Player(props) {
    return (
        <View style={styles.main}>
            <Text style={styles.username}>1 - {props.username} </Text>
            <Image style={styles.skin} source={props.skin} />
        </View>
    )
}


const styles = StyleSheet.create({
    main: {
        borderColor: 'black',
        borderWidth: 2,
        width: 97.5,
        height: 90,

    },
    skin: {
        width: 96,
        height: 86,
        top: -10,

    },
    username: {
        padding: 3,
        margin: 'auto',
        width: 80,
        height: 17,
        fontFamily: 'Minecraft',
    }
});