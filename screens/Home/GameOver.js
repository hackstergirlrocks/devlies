import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const GameOverScreen = ({ route }) => {
  const { result, role, xpEarned, image } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {result === "victory" ? "Victoire !" : "Défaite..."}
      </Text>
      <Image source={image} style={styles.image} />
      <Text style={styles.text}>Rôle : {role}</Text>
      <Text style={styles.text}>XP Gagnée : {xpEarned}</Text>
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
