import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, ImageBackground, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';


const GameOverScreen = ({ route, navigation }) => {
  const user = useSelector((state) => state.user.value);


  const { result, role, xpEarned, rolewin } = route.params;
  const [message, setMessage] = useState('')
  const [image, setImage] = useState(null)
  const [play, setPressPlay] = useState(false)
  const [menu, setPressMenu] = useState(false)


  const [xp, setXP] = useState(0)
  const [coins, setCoins] = useState(0)




  useEffect(() => {

    if (rolewin === 'dev') {
      if (role === 'devops' || role === 'dev' || role === 'chatgpt') {
        setMessage('tu as win')
        giveXpAndCoinWin(500, 10)
        setImage(require('../../assets/GameOver/win-dev.png'))
        setXP(500)
        setCoins(10)
      } else {
        setMessage('tu as perdu')
        giveXpAndCoinLose(150, 3)
        setImage(require('../../assets/GameOver/game-over-hacker.png'))
        setXP(150)
        setCoins(3)
      }
    } else {
      if (role === 'hacker') {
        setMessage('tu as win')
        giveXpAndCoinWin(600, 15)
        setImage(require('../../assets/GameOver/win-hacker.png'))
        setXP(600)
        setCoins(15)
      } else {
        setMessage('tu as perdu')
        giveXpAndCoinLose(250, 5)
        setImage(require('../../assets/GameOver/game-over-dev.png'))
        setXP(250)
        setCoins(5)
      }
    }
  }, [])

  function giveXpAndCoinWin(xp, coins) {
    console.log(xp, coins)
    fetch(`http://${process.env.EXPO_PUBLIC_API_URL}/users/win/${user.token}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ coins: coins, experience: xp, win: 1, game: 1 }),
    }).then(response => response.json())
      .then(data => {
        if (data.result) {

        }
      });
  }

  function giveXpAndCoinLose(xp, coins) {
    console.log(xp, coins)
    fetch(`http://${process.env.EXPO_PUBLIC_API_URL}/users/lose/${user.token}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ coins: coins, experience: xp, lose: 1, game: 1 }),
    }).then(response => response.json())
      .then(data => {
        if (data.result) {

        }
      });
  }

  const OutMenu = () => {
    setPressMenu(!menu)
    navigation.navigate('Home')
  }

  const OutPlayAgain = () => {
    setPressPlay(!play)
    navigation.navigate('Play2')
  }


  return (
    <ImageBackground style={styles.background} source={require('../../assets/HomePage/fond-bleu.png')}>


      <Image source={image} />
      <View style={styles.rewardBoth}>
        <View style={styles.reward}>
          <Image source={require('../../assets/HomePage/icone-xp.gif')} style={styles.iconeXP}></Image>
          <Text style={styles.textEndGame}> {xp}     </Text>
        </View>
        <View style={styles.reward}>
          <Image source={require('../../assets/HomePage/animation-coin.gif')} style={styles.iconeCoin}></Image>
          <Text style={styles.textEndGameCoin}>{coins}</Text>
        </View>
      </View>
      <View style={styles.btn}>
        <TouchableOpacity
          style={styles.switchPage}
          activeOpacity={1}
          onPressIn={() => setPressPlay(!play)}
          onPressOut={() => OutPlayAgain()}
        >
          {play
            ? <Image source={require('../../assets/btn/btn-play-again-down.png')} style={styles.image} />
            : <Image source={require('../../assets/btn/btn-play-again.png')} style={styles.image} />
          }
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.switchPage}
          activeOpacity={1}
          onPressIn={() => setPressMenu(!menu)}
          onPressOut={() => OutMenu()}
        >
          {menu
            ? <Image source={require('../../assets/btn/btn-menu-down.png')} style={styles.image} />
            : <Image source={require('../../assets/btn/btn-menu.png')} style={styles.image} />
          }
        </TouchableOpacity>


      </View>

      {/* <Text>mon role : {role} / role win : {rolewin}</Text> */}

    </ImageBackground>
  );
};

export default GameOverScreen;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 50
  },
  btn: {
    gap: 10,

  },
  image: {
    width: 200,
    height: 60
  },
  textEndGame: {
    fontFamily: 'Minecraft',
    fontSize: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textEndGameCoin: {
 fontFamily: 'Minecraft',
    fontSize: 20,
    justifyContent: 'center',
    alignItems: 'center',
    left:-5,
  },
  iconeXP: {
    width: 70,
    height: 70,
  },
  iconeCoin: {
    width: 70,
    height: 70,
  },
  reward: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',

  },
  rewardBoth: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    }


});
