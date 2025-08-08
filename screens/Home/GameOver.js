import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const GameOverScreen = ({ route }) => {
  const { result, role, xpEarned, image, rolewin } = route.params;
  const [message, setMessage] = useState('')

  useEffect(() => {

    if (rolewin === 'dev') {
      if (role === 'devops' || role === 'dev') {
        setMessage('tu as win')
        giveXpAndCoin(500, 10)
      } else {
        setMessage('tu as perdu')
        giveXpAndCoin(150, 3)
      }
    } else {
      if (role === 'hacker') {
        setMessage('tu as win')
          giveXpAndCoin(500, 10)
      } else {
        setMessage('tu as perdu')
        giveXpAndCoin(150, 3)

      }
    }
  }, [])

  function giveXpAndCoin(xp, coins) {
    // console.log(xp, coins)
  }

  return (
    <View style={styles.container}>

      <Image source={image} style={styles.image} />
      <Text style={styles.text}> {message}</Text>
      <Text style={styles.text}>Ton role : {role} / Role win : {rolewin} </Text>


    </View>
  );
};

export default GameOverScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },

});
