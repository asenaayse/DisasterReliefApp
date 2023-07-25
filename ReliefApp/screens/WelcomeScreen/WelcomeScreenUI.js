import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/core';

const WelcomeScreen = () => {
  const navigation = useNavigation();

  const handleGetStartedPress = () => {
    navigation.navigate('SignUpScreen');
  };

  return (
    <View style={styles.container}>
    <Image source={require('ReliefApp\test\assets\ReliefHub.png')} style={styles.logo} />
      <Text style={styles.slogan}>Your hub for disaster relief</Text>
      <TouchableOpacity style={styles.getStartedButton} onPress={handleGetStartedPress}>
        <Text style={styles.getStartedText}>Get started</Text>
      </TouchableOpacity>
    </View>
  );
};

export default WelcomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  slogan: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 50,
  },
  getStartedButton: {
    backgroundColor: '#FFD600',
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 10,
  },
  getStartedText: {
    color: 'black',
    fontSize: 20,
    fontWeight: 'bold',
  },
});
