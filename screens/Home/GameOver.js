import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, ImageBackground, TouchableOpacity } from 'react-native';

const GameOverScreen = ({ route, navigation }) => {
  const { result, role, xpEarned, rolewin } = route.params;
  const [message, setMessage] = useState('')
  const [image, setImage] = useState(null)
  const [play, setPressPlay] = useState(false)
  const [menu, setPressMenu] = useState(false)



  useEffect(() => {

    if (rolewin === 'dev') {
      if (role === 'devops' || role === 'dev') {
        setMessage('tu as win')
        giveXpAndCoin(500, 10)
        setImage(require('../../assets/GameOver/win-dev.png'))

      } else {
        setMessage('tu as perdu')
        giveXpAndCoin(150, 3)
        setImage(require('../../assets/GameOver/game-over-hacker.png'))

      }
    } else {
      if (role === 'hacker') {
        setMessage('tu as win')
        giveXpAndCoin(600, 15)
        setImage(require('../../assets/GameOver/win-hacker.png'))

      } else {
        setMessage('tu as perdu')
        giveXpAndCoin(250, 5)
        setImage(require('../../assets/GameOver/game-over-dev.png'))


      }
    }
  }, [])

  function giveXpAndCoin(xp, coins) {
    // console.log(xp, coins)
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
  }

});
