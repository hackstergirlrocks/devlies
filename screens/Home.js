import { StyleSheet, Text, View, Image, TouchableOpacity, ImageBackground } from 'react-native';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

export default function App({ navigation }) {
  // Recup le token du joueur via redux ici
  const user = useSelector((state) => state.user.value);
  // const token = user.token

  // Recup le skin du joueur ici
  const skins = {
    "onlyguts.png": require("../assets/Skin/onlyguts.png"),
    // "other.png": require("../assets/Skin/other.png"),
  };
  const [skinPlayer, setSkinPlayer] = useState("onlyguts.png");
  const [skinUser, setSkinUser] = useState(skins[skinPlayer]);

  // Gestion des animation des buttons 
  const [pressPlay, setPressPlay] = useState(false);
  const [pressProfile, setPressProfile] = useState(false);
  const [pressSkin, setPressSkin] = useState(false);
  const [pressInfo, setPressInfo] = useState(false);
  const [pressShop, setPressShop] = useState(false);


  // Sécurité si utilisateur pas connecte zebi
  useEffect(() => {
    // if (!token) {
    // navigation.navigate('Waiting')
    // }
  }, [])

  return (
    <ImageBackground style={styles.container} source={require('../assets/HomePage/desk-home-page-bigger.png')}>

      {/* Menu en haut a droite */}
      <View style={styles.MainTop}>
        <Image style={styles.top} source={require('../assets/btn/star.png')} />
        <Image style={styles.top} source={require('../assets/btn/ecroue.png')} />
      </View>

      <View style={styles.mainBtn} >

        {/* PLAY BUTTON */}
        <TouchableOpacity
          style={styles.switchPage}
          activeOpacity={1}
          onPressIn={() => setPressPlay(true)}
          onPressOut={() => setPressPlay(false)}
        >
          {pressPlay
            ? <Image style={styles.btn} source={require('../assets/btn/play-btn-down.png')} />
            : <Image style={styles.btn} source={require('../assets/btn/play-btn.png')} />
          }
        </TouchableOpacity>

        {/* PROFILE BUTTON */}
        <TouchableOpacity
          style={styles.switchPage}
          activeOpacity={1}
          onPressIn={() => setPressProfile(true)}
          onPressOut={() => setPressProfile(false)}
        >
          {pressProfile
            ? <Image style={styles.btn} source={require('../assets/btn/profile-btn-down.png')} />
            : <Image style={styles.btn} source={require('../assets/btn/profile-btn.png')} />
          }
        </TouchableOpacity>

        {/* SKIN BUTTON */}
        <TouchableOpacity
          style={styles.switchPage}
          activeOpacity={1}
          onPressIn={() => setPressSkin(true)}
          onPressOut={() => setPressSkin(false)}
        >
          {pressSkin
            ? <Image style={styles.btn} source={require('../assets/btn/skin-btn-down.png')} />
            : <Image style={styles.btn} source={require('../assets/btn/skin-btn.png')} />
          }
        </TouchableOpacity>


        {/* INFO BUTTON */}
        <TouchableOpacity
          style={styles.switchPage}
          activeOpacity={1}
          onPressIn={() => setPressInfo(true)}
          onPressOut={() => setPressInfo(false)}
        >
          {pressInfo
            ? <Image style={styles.btn} source={require('../assets/btn/info-btn-down.png')} />
            : <Image style={styles.btn} source={require('../assets/btn/info-btn.png')} />
          }
        </TouchableOpacity>

        {/* SHOP BUTTON */}
        <TouchableOpacity
          style={styles.switchPage}
          activeOpacity={1}
          onPressIn={() => setPressShop(true)}
          onPressOut={() => setPressShop(false)}
        >
          {pressShop
            ? <Image style={styles.btn} source={require('../assets/btn/shop-btn-down.png')} />
            : <Image style={styles.btn} source={require('../assets/btn/shop-btn.png')} />
          }
        </TouchableOpacity>



      </View>

      <View style={styles.Mainskin}>
        <Image style={styles.skin} source={skinUser} />
      </View>
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
    width: 250,
    height: 250,

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
