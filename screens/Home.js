import { StyleSheet, Text, View, Image, TouchableOpacity, ImageBackground, Modal, TextInput } from 'react-native';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useFonts } from 'expo-font'
import ProfilModal from './ProfilModal';

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
      setSkinUser(skins[user.skin].require);
    }
  }, [user.skin]);

  // Gestion des animation des buttons 
  const [pressPlay, setPressPlay] = useState(false);
  const [pressProfile, setPressProfile] = useState(false);
  const [pressSkin, setPressSkin] = useState(false);
  const [pressInfo, setPressInfo] = useState(false);
  const [pressShop, setPressShop] = useState(false);

  // Modal en 3 steps (page)
  const [step, setStep] = useState(1)

  // aller sur la page suivante
  // si sur la page 3, retourne à la 1
  const changeStepPlus = () => {
    if (step === 3) {
      setStep(1)
    } else {
      setStep(step + 1)
    }
  }

  // revenir sur la page d'avant
  // si sur la page 1, va à la page 3
  const changeStepMoins = () => {
    if (step === 1) {
      setStep(3)
    } else {
      setStep(step - 1)
    }
  }

  // modal (pop-up) visible ou non
  const [modalVisibleAmi, setModalVisibleAmi] = useState(false)
  const [modalVisibleProfilAmi, setModalVisibleProfilAmi] = useState(false)
  const [modalVisibleInfo, setModalVisibleInfo] = useState(false)
  const [modalVisibleProfile, setModalVisibleProfile] = useState(false)

  const [infoPlayer, setInfoPlayer] = useState([])
  const [infoGame, setInfoGame] = useState(0)
  const [infoWin, setInfoWin] = useState(0)
  const [infoLose, setInfoLose] = useState(0)
  const [datePlayer, setDatePlayer] = useState()

  const [selectedFriend, setSelectedFriend] = useState(null)
  const [infoAmi, setInfoAmi] = useState([])
  const [msgBack, setMsgBack] = useState('')

  const [searchUser, setSearchUser] = useState('')
  const [allUsers, setAllUsers] = useState([])

  // useEffect, récupère toutes infos de l'user grâce à son token. Rappelle à chaque ouverture du modal Profile
  useEffect(() => {
    if (modalVisibleProfile) {
      fetch(`http://${process.env.EXPO_PUBLIC_API_URL}/users/` + user.token)
        .then((response) => response.json())
        .then((data) => {
          setInfoPlayer(data.info)
          setInfoGame(data.info.stats.game)
          setInfoWin(data.info.stats.win)
          setInfoLose(data.info.stats.lose)
          setDatePlayer(data.info.created)
        });
    }
  }, [modalVisibleProfile]);

    // useEffect pour récupérer tous ses amis, restart à chaque fois qu'on ferme le modal profil Ami
    useEffect(() => {
      if (modalVisibleAmi) {
        fetch(`http://${process.env.EXPO_PUBLIC_API_URL}/users/allfriends/` + user.token)
          .then(response => response.json())
          .then(data => {
            setInfoAmi(data.data)
          });
      }
    }, [modalVisibleProfilAmi])

      // useEffect pour récupèrer tous les membres
  useEffect(() => {
    fetch(`http://${process.env.EXPO_PUBLIC_API_URL}/users/allusers`)
      .then(response => response.json())
      .then(data => {
        setAllUsers(data.users)
      })
  }, [])

  // quand ouvre la modal, reviens sur la page 1 par défaut
  const openInfo = () => {
    setPressInfo(false)
    setModalVisibleInfo(!modalVisibleInfo)
    setStep(1)
  }

  // ouvre la modal
  const openProfile = () => {
    setPressProfile(false)
    setModalVisibleProfile(!modalVisibleProfile)
  }

  // écriture Minecraft
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

  // Appuie sur le bouton skin + navigation vers la page
  const Skin = () => {
    setPressSkin(false)
    navigation.navigate('Skin')
  }

  // Appuie sur le bouton shop + navigation vers la page
  const Shop = () => {
    setPressShop(false)
    navigation.navigate('Shop')
  }

  // fetch pour ajouter un ami
  const addAmi = () => {
    fetch(`http://${process.env.EXPO_PUBLIC_API_URL}/users/addfriend/` + user.token, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ friends: selectedFriend._id })
    }).then(response => response.json())
      .then(data => {
        setMsgBack(data.message)

        setTimeout(() => {
          setMsgBack('');
        }, 3000);
      })
  }

  // fetch pour supprimer un ami
  const removeAmi = () => {
    fetch(`http://${process.env.EXPO_PUBLIC_API_URL}/users/removefriend/` + user.token, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ friends: selectedFriend._id })
    }).then(response => response.json())
      .then(data => {
        setMsgBack(data.message)

        setTimeout(() => {
          setMsgBack('');
        }, 3000);
      })
  }

  return (
    <ImageBackground style={styles.container} source={require('../assets/HomePage/desk-home-page-bigger.png')}>
      {/* Menu en haut a droite */}
      <View style={styles.MainTop}>
        <TouchableOpacity onPress={() => setModalVisibleAmi(!modalVisibleAmi)}>
          <Image style={styles.top} source={require('../assets/btn/star.png')} />
        </TouchableOpacity>

        {/* POP-UP LISTE D'AMI */}
        <Modal
          animationType='fade'
          transparent={true}
          visible={modalVisibleAmi}
          onRequestClose={() => {
            setModalVisibleAmi(!modalVisibleAmi)
          }}>
          <View style={{ flexDirection: 'row' }}>
            {/* view créée pour fermer la modal */}
            <TouchableOpacity style={{ width: 150 }} onPress={() => setModalVisibleAmi(!modalVisibleAmi)}>
            </TouchableOpacity>
            <ImageBackground source={require('../assets/HomePage/pop-up-ami.png')} resizeMode='contain' style={styles.imageAmi}>
              <TextInput style={{ top: 60, fontFamily: 'Minecraft', fontSize: 23, left: 20 }} placeholder='Recherche un joueur' onChangeText={setSearchUser} value={searchUser}></TextInput>
              <View style={{ width: 260, height: 850, alignItems: 'center', justifyContent: 'flex-start', gap: 10 }} >
                {/* si pas de recherche,alors */}
                {searchUser.length === 0
                // montre la liste d'ami
                  ? infoAmi.map((ami =>
                    <ImageBackground key={ami.username} source={require('../assets/HomePage/pop-up-ami-input.png')} style={{ top: 70 }}>
                      <View style={{ backgroundColor: 'rgba(45, 98, 150, 0)', height: 55, width: 240, justifyContent: 'center', left: 10 }}>
                        <TouchableOpacity onPress={() => {
                          setSelectedFriend(ami)
                          setModalVisibleProfilAmi(!modalVisibleProfilAmi)
                        }}>
                          <Text style={{ fontFamily: 'Minecraft', fontSize: 20, bottom: 5 }} >{ami.username}</Text>
                        </TouchableOpacity>
                      </View>
                    </ImageBackground>
                  ))
                  // si recherche, recherche dynamique
                  : allUsers.filter(user => user.username.toLowerCase().includes(searchUser.toLocaleLowerCase()))
                    .map(user =>
                      <ImageBackground key={user.username} source={require('../assets/HomePage/pop-up-ami-input.png')} style={{ top: 70 }}>
                        <View style={{ backgroundColor: 'rgba(45, 98, 150, 0)', height: 55, width: 240, justifyContent: 'center', left: 10 }}>
                          <TouchableOpacity onPress={() => {
                            setSelectedFriend(user)
                            setModalVisibleProfilAmi(!modalVisibleProfilAmi)
                          }}>
                            <Text style={{ fontFamily: 'Minecraft', fontSize: 20, bottom: 5 }} >{user.username}</Text>
                          </TouchableOpacity>
                        </View>
                      </ImageBackground>
                    )
                }

                {/* POP UP PROFIL AMI (voir ProfilModal.js) */}
                {selectedFriend && (
                  <ProfilModal
                    visible={modalVisibleProfilAmi}
                    onClose={() => setModalVisibleProfilAmi(!modalVisibleProfilAmi)}

                    // infos des joueurs
                    skinUser={skins[selectedFriend.skin_use]?.require}
                    infoPlayer={{
                      username: selectedFriend.username,
                      level: selectedFriend.level,
                      experience: selectedFriend.experience,
                      coins: selectedFriend.coins
                    }}
                    infoGame={selectedFriend.stats.game}
                    infoWin={selectedFriend.stats.win}
                    infoLose={selectedFriend.stats.lose}
                    datePlayer={selectedFriend.created}

                    styles={styles}
                    message={msgBack}

                    // si il est dans le tableau ami
                    isFriend={infoAmi.some(ami => ami.username === selectedFriend.username)}
                    // si c'est moi, pseudo égal à celui du redux
                    isMe={selectedFriend.username === user.username}

                    // fonction ajouter/delete ami avec id_ du joueur sélectionné
                    onAddAmi={() => addAmi(selectedFriend._id)}
                    onRemoveAmi={() => removeAmi(selectedFriend._id)}
                  />
                )}

              </View>
            </ImageBackground>
          </View>
        </Modal>
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
          onPress={() => navigation.navigate('Play2')}
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
          onPressOut={() => openProfile()}
        >
          {pressProfile
            ? <Image style={styles.btn} source={require('../assets/btn/profile-btn-down.png')} />
            : <Image style={styles.btn} source={require('../assets/btn/profile-btn.png')} />
          }
        </TouchableOpacity>

        {/* POP-UP PROFIL (voir ProfilModal.js) */}
        <ProfilModal
          visible={modalVisibleProfile}
          onClose={() => setModalVisibleProfile(false)}
          skinUser={skinUser}
          infoPlayer={infoPlayer}
          infoGame={infoGame}
          infoWin={infoWin}
          infoLose={infoLose}
          datePlayer={datePlayer}
          styles={styles}
          isMe={infoPlayer.username === user.username}
        />


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

        {/* POP-UP DESCRIPTIF */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisibleInfo}
          onRequestClose={() => {
            setModalVisibleInfo(!modalVisibleInfo);
          }}>
          <ImageBackground source={require('../assets/HomePage/pop-up-windows.png')} resizeMode='contain' style={styles.image}>

            {/* PAGE 1, règle du jeu */}
            {step === 1 &&
              <View style={{ height: '50%', width: 350, paddingLeft: 50, bottom: 14 }}>
                <View style={styles.modal}>
                  <TouchableOpacity onPress={() => openInfo()} style={{ bottom: 27, width: 323, right: 19, height: 22 }}>
                    <Image source={require('../assets/HomePage/croix-bleu-pop-up.png')} style={{ bottom: 39, height: 22, width: 22, right: 123 }} />
                  </TouchableOpacity>
                  <View style={styles.modalView}>
                    <View style={styles.regles}>
                      <Text style={{ fontFamily: 'Minecraft', fontSize: '23', textDecorationLine: 'underline', color: 'red' }}>Regles du jeu :</Text>
                      <View>
                        <Text style={{ fontFamily: 'Minecraft', fontSize: '20', textDecorationLine: 'underline' }}>Objectif</Text>
                        <Text style={{ fontFamily: 'Minecraft', fontSize: '17' }}>Hackers : pirater tous les devs.</Text>
                        <Text style={{ fontFamily: 'Minecraft', fontSize: '17' }}>Devs : proteger le projet en banissant les hackers.</Text>
                      </View>
                      <View>
                        <Text style={{ fontFamily: 'Minecraft', fontSize: '20', textDecorationLine: 'underline' }}>Deroulement</Text>
                        <Text style={{ fontFamily: 'Minecraft', fontSize: '17' }}>Nuit : Tout le monde "ferme les yeux". Les hackers choississent une victime (un dev). Les devs avec un role special jouent egalement.</Text>
                        <Text style={{ fontFamily: 'Minecraft', fontSize: '17' }}>Jour : Tous les joueurs debattent dans le chat, un vote a lieu pour virer un joueur suspect. Quand il part, il revele son role.</Text>
                      </View>
                      <View>
                        <Text style={{ fontFamily: 'Minecraft', fontSize: '20', textDecorationLine: 'underline' }}>Fin de partie</Text>
                        <Text style={{ fontFamily: 'Minecraft', fontSize: '17' }}>Victoire des hackers : si les devs ne sont plus assez nombreux pour resister</Text>
                        <Text style={{ fontFamily: 'Minecraft', fontSize: '17' }}>Victoires des devs : si tous les hackers ont ete vires.</Text>
                      </View>
                    </View>
                  </View>
                </View>
              </View>
            }

            {/* PAGE 2, description rôle hacker et dev junior */}
            {step === 2 &&
              <View style={{ height: '50%', width: 350, paddingLeft: 50, bottom: 10, }}>
                <View style={styles.modal2}>
                  <TouchableOpacity onPress={() => openInfo()} style={{ bottom: 31, width: 323, right: 19, height: 22 }}>
                    <Image source={require('../assets/HomePage/croix-bleu-pop-up.png')} style={{ bottom: 39, height: 22, width: 22, right: 123 }} />
                  </TouchableOpacity>
                  <View style={[styles.modalView, { bottom: 5 }]}>
                    <View style={styles.regles}>
                      <Text style={{ fontFamily: 'Minecraft', fontSize: '23', textDecorationLine: 'underline', color: 'red' }}>Explication roles :</Text>
                      <View>
                        <Image source={require('../assets/HomePage/hacker.png')} style={styles.role} />
                        <Text style={{ fontFamily: 'Minecraft', fontSize: '20', textDecorationLine: 'underline' }}>Hacker :</Text>
                        <Text style={{ fontFamily: 'Minecraft', fontSize: '17' }}>Le Hacker est l’ennemi cache. Chaque nuit, il choisit un Dev a pirater avec les autres Hackers. Le jour, il tente de se faire passer pour un Dev Junior afin de ne pas etre decouvert.</Text>
                      </View>
                      <View>
                        <Image source={require('../assets/HomePage/devjunior.png')} style={styles.role} />
                        <Text style={{ fontFamily: 'Minecraft', fontSize: '20', textDecorationLine: 'underline' }}>Dev Junior :</Text>
                        <Text style={{ fontFamily: 'Minecraft', fontSize: '17' }}>Le Dev Junior est un simple membre de l’equipe. Il n’a aucun pouvoir special, mais il participe aux discussions et aux votes pour essayer de demasquer les Hackers.</Text>
                      </View>
                    </View>
                  </View>
                </View>
              </View>
            }

            {/* PAGE 3, description devops et chatgpt */}
            {step === 3 &&
              <View style={{ height: '50%', width: 350, paddingLeft: 50, bottom: 10 }}>
                <View style={styles.modal2}>
                  <TouchableOpacity onPress={() => openInfo()} style={{ bottom: 31, width: 323, right: 19, height: 22 }}>
                    <Image source={require('../assets/HomePage/croix-bleu-pop-up.png')} style={{ bottom: 39, height: 22, width: 22, right: 123 }} />
                  </TouchableOpacity>
                  <View style={[styles.modalView, { bottom: 5 }]}>
                    <View style={styles.regles}>
                      <Text style={{ fontFamily: 'Minecraft', fontSize: '23', textDecorationLine: 'underline', color: 'red' }}>Explication roles :</Text>
                      <View>
                        <Image source={require('../assets/HomePage/devops.png')} style={styles.role} />
                        <Text style={{ fontFamily: 'Minecraft', fontSize: '20', textDecorationLine: 'underline' }}>Dev Ops :</Text>
                        <Text style={{ fontFamily: 'Minecraft', fontSize: '17' }}>Le DevOps peut chaque nuit auditer un joueur pour savoir s’il est Hacker ou Dev. Son pouvoir est precieux, mais il doit rester discret pour eviter d’etre cible par les Hackers.</Text>
                      </View>
                      <View>
                        <Image source={require('../assets/HomePage/chatgpt.png')} style={styles.role} />
                        <Text style={{ fontFamily: 'Minecraft', fontSize: '20', textDecorationLine: 'underline' }}>ChatGPT :</Text>
                        <Text style={{ fontFamily: 'Minecraft', fontSize: '17' }}>ChatGPT a deux actions speciales : il peut sauver un Dev pirate ou eliminer un joueur de son choix. Comme ses pouvoirs sont limites, il doit les utiliser au bon moment.</Text>
                      </View>
                    </View>
                  </View>
                </View>
              </View>
            }

            {/* Flèche pour changer de page */}
            <View style={{ flexDirection: 'row', justifyContent: 'center', gap: 150 }}>
              <TouchableOpacity activeOpacity={1} onPress={() => changeStepMoins()}>
                <Image source={require('../assets/HomePage/fleche-bleu-gauche.png')} style={{ width: 40, height: 40 }} />
              </TouchableOpacity>
              <TouchableOpacity activeOpacity={1} onPress={() => changeStepPlus()}>
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
          onPressIn={() => Shop()}
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

  imageAmi: {
    flex: 1,
    justifyContent: 'center',
    width: 385
  },

  // CSS MODAL PROFILE
  infoUser: {
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  skinuser: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 130,
    width: 118,
    top: 10,
  },
  encardskin: {
    height: 150,
    width: 150,
    alignItems: 'center',
    justifyContent: 'center'
  },
  icone: {
    height: 40,
    width: 40,
    left: 20
  },

  // CSS MODAL INFO
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
