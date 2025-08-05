import { StyleSheet, Text, View, Image, TouchableOpacity, ImageBackground, Modal, Button } from 'react-native';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useFonts } from 'expo-font'


import skins from "../constants/skins";;

export default function App({ navigation }) {
  // Recup le token du joueur via redux ici
  const user = useSelector((state) => state.user.value);
  // const token = user.token

  // Recup le skin du joueur ici


  const [skinPlayer, setSkinPlayer] = useState('');
  const [skinUser, setSkinUser] = useState(skins[user.skin]);

  useEffect(() => {
    if (user.skin) {
      setSkinPlayer(user.skin);
      setSkinUser(skins[user.skin]);
    }
  }, [user.skin]);

  // Gestion des animation des buttons 
  const [pressPlay, setPressPlay] = useState(false);
  const [pressProfile, setPressProfile] = useState(false);
  const [pressSkin, setPressSkin] = useState(false);
  const [pressInfo, setPressInfo] = useState(false);
  const [pressShop, setPressShop] = useState(false);

  const [step, setStep] = useState(1)

  const changeStepPlus = () => {
    if (step === 3) {
      setStep(1)
    } else {
      setStep(step + 1)
    }
  }

  const changeStepMoins = () => {
    if (step === 1) {
      setStep(3)
    } else {
      setStep(step - 1)
    }
  }

  const [modalVisible, setModalVisible] = useState(false)

  const openInfo = () => {
    setPressInfo(false)
    setModalVisible(!modalVisible)
    setStep(1)
  }

  const [fontsLoaded] = useFonts({
    'Minecraft': require('../assets/fonts/Minecraft.ttf'),
  });

  if (!fontsLoaded) {
    return null;
  }

  // Sécurité si utilisateur pas connecte zebi
  // useEffect(() => {
  //   // if (!token) {
  //   // navigation.navigate('Waiting')
  //   // }
  // }, [])

  const Skin = () => {
    setPressSkin(false)
    navigation.navigate('Skin')
  }

  return (
    <ImageBackground style={styles.container} source={require('../assets/HomePage/desk-home-page-bigger.png')}>

      {/* Menu en haut a droite */}
      <View style={styles.MainTop}>
        <Image style={styles.top} source={require('../assets/btn/star.png')} />
        <TouchableOpacity
          style={styles.switchPage}
          activeOpacity={1}
          onPress={() => navigation.navigate('Parametres')}
        >
          <Image style={styles.top} source={require('../assets/btn/ecroue.png')} />
        </TouchableOpacity>

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
          onPressOut={() => Skin()}
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
          onPressOut={() => openInfo()}
        >
          {pressInfo
            ? <Image style={styles.btn} source={require('../assets/btn/info-btn-down.png')} />
            : <Image style={styles.btn} source={require('../assets/btn/info-btn.png')} />
          }
        </TouchableOpacity>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}>
          <ImageBackground source={require('../assets/HomePage/pop-up-windows.png')} resizeMode='contain' style={styles.image}>
            {step === 1 &&
              <View style={{ height: '50%', width: 350, paddingLeft: 50, bottom: 14 }}>
                <View style={styles.modal}>
                  <TouchableOpacity onPress={() => openInfo()} style={{ bottom: 27, width: 323, right: 19, height: 22 }}>
                    <Image source={require('../assets/HomePage/croix-bleu-pop-up.png')} style={{ bottom: 39, height: 22, width: 22, right: 123 }} />
                  </TouchableOpacity>
                  <View style={styles.modalView}>
                    <View style={styles.regles}>
                      <Text style={{ fontFamily: 'Minecraft', fontSize: '25', textDecorationLine: 'underline', color: 'red' }}>Regles du jeu :</Text>
                      <View>
                        <Text style={{ fontFamily: 'Minecraft', fontSize: '23', textDecorationLine: 'underline' }}>Objectif</Text>
                        <Text style={{ fontFamily: 'Minecraft', fontSize: '20' }}>Hackers : pirater tous les devs.</Text>
                        <Text style={{ fontFamily: 'Minecraft', fontSize: '20' }}>Devs : proteger le projet en banissant les hackers.</Text>
                      </View>
                      <View>
                        <Text style={{ fontFamily: 'Minecraft', fontSize: '23', textDecorationLine: 'underline' }}>Deroulement</Text>
                        <Text style={{ fontFamily: 'Minecraft', fontSize: '20' }}>Nuit : Tout le monde "ferme les yeux". Les hackers choississent une victime (un dev). Les devs avec un role special jouent egalement.</Text>
                        <Text style={{ fontFamily: 'Minecraft', fontSize: '20' }}>Jour : Tous les joueurs debattent dans le chat, un vote a lieu pour bannir un joueur suspect. Quand il meurt, il revele son role.</Text>
                      </View>
                      <View>
                        <Text style={{ fontFamily: 'Minecraft', fontSize: '23', textDecorationLine: 'underline' }}>Fin de partie</Text>
                        <Text style={{ fontFamily: 'Minecraft', fontSize: '20' }}>Victoire des hackers : si les devs ne sont plus assez nombreux pour resister</Text>
                        <Text style={{ fontFamily: 'Minecraft', fontSize: '20' }}>Victoires des devs : si tous les hackers ont ete bannis.</Text>
                      </View>
                    </View>
                  </View>
                </View>
              </View>
            }
            {step === 2 &&
              <View style={{ height: '50%', width: 350, paddingLeft: 50, bottom: 10 }}>
                <View style={styles.modal2}>
                  <TouchableOpacity onPress={() => openInfo()} style={{ bottom: 31, width: 323, right: 19, height: 22 }}>
                    <Image source={require('../assets/HomePage/croix-bleu-pop-up.png')} style={{ bottom: 39, height: 22, width: 22, right: 123 }} />
                  </TouchableOpacity>
                  <View style={styles.modalView}>
                    <View style={styles.regles}>
                      <Text style={{ fontFamily: 'Minecraft', fontSize: '25', textDecorationLine: 'underline', color: 'red' }}>Explication roles :</Text>
                      <View>
                        <Image source={require('../assets/HomePage/hacker.png')} style={styles.role} />
                        <Text style={{ fontFamily: 'Minecraft', fontSize: '23', textDecorationLine: 'underline' }}>Hacker :</Text>
                        <Text style={{ fontFamily: 'Minecraft', fontSize: '20' }}>Le Hacker est l’ennemi cache. Chaque nuit, il choisit un Dev a pirater avec les autres Hackers. Le jour, il tente de se faire passer pour un Dev Junior afin de ne pas etre decouvert.</Text>
                      </View>
                      <View>
                        <Image source={require('../assets/HomePage/devjunior.png')} style={styles.role} />
                        <Text style={{ fontFamily: 'Minecraft', fontSize: '23', textDecorationLine: 'underline' }}>Dev Junior :</Text>
                        <Text style={{ fontFamily: 'Minecraft', fontSize: '20' }}>Le Dev Junior est un simple membre de l’equipe. Il n’a aucun pouvoir special, mais il participe aux discussions et aux votes pour essayer de demasquer les Hackers.</Text>
                      </View>
                    </View>
                  </View>
                </View>
              </View>
            }
            {step === 3 &&
              <View style={{ height: '50%', width: 350, paddingLeft: 50, bottom: 10 }}>
                <View style={styles.modal2}>
                  <TouchableOpacity onPress={() => openInfo()} style={{ bottom: 31, width: 323, right: 19, height: 22 }}>
                    <Image source={require('../assets/HomePage/croix-bleu-pop-up.png')} style={{ bottom: 39, height: 22, width: 22, right: 123 }} />
                  </TouchableOpacity>
                  <View style={styles.modalView}>
                    <View style={styles.regles}>
                      <Text style={{ fontFamily: 'Minecraft', fontSize: '25', textDecorationLine: 'underline', color: 'red' }}>Explication roles :</Text>
                      <View>
                        <Image source={require('../assets/HomePage/devops.png')} style={styles.role} />
                        <Text style={{ fontFamily: 'Minecraft', fontSize: '23', textDecorationLine: 'underline' }}>Dev Ops :</Text>
                        <Text style={{ fontFamily: 'Minecraft', fontSize: '20' }}>Le DevOps peut chaque nuit auditer un joueur pour savoir s’il est Hacker ou Dev. Son pouvoir est precieux, mais il doit rester discret pour eviter d’etre cible par les Hackers.</Text>
                      </View>
                      <View>
                        <Image source={require('../assets/HomePage/chatgpt.png')} style={styles.role} />
                        <Text style={{ fontFamily: 'Minecraft', fontSize: '23', textDecorationLine: 'underline' }}>ChatGPT :</Text>
                        <Text style={{ fontFamily: 'Minecraft', fontSize: '20' }}>ChatGPT a deux actions speciales : il peut sauver un Dev pirate ou eliminer un joueur de son choix. Comme ses pouvoirs sont limites, il doit les utiliser au bon moment.</Text>
                      </View>
                    </View>
                  </View>
                </View>

              </View>
            }
            <View style={{ flexDirection: 'row', justifyContent: 'center', gap: 150 }}>
              <TouchableOpacity onPress={() => changeStepMoins()}>
                <Image source={require('../assets/HomePage/fleche-bleu-gauche.png')} style={{ width: 40, height: 40 }} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => changeStepPlus()}>
                <Image source={require('../assets/HomePage/fleche-bleu-droite.png')} style={{ width: 40, height: 40 }} />
              </TouchableOpacity>
            </View>
            <Image />
          </ImageBackground>
        </Modal>

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
  },
  regles: {
    gap: 10,
  },
  image: {
    flex: 1,
    justifyContent: 'center',
  },
  role: {
    height: 64,
    width: 60
  }
});
