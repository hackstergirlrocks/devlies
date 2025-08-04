import { StyleSheet, Text, View, Image, TouchableOpacity, ImageBackground } from 'react-native';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

export default function App({ navigation }) {
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
        
      
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',

  },
  mainBtn: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 25
  },
  btn: {
    width: 150,
    height: 75,
  },
  Mainskin: {
    alignItems: 'center',
  },
  skin: {
    width: 400,
    height: 400,
  },
  top: {
    width: 55,
    height: 55,
  },
  MainTop: {
    paddingTop: 40,
    paddingRight: 10,
    flexDirection: 'row',
    justifyContent: 'flex-end'
  }
});
