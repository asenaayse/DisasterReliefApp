import React from 'react';
import { View, Image, Text, StyleSheet, TouchableOpacity } from 'react-native';

const WelcomeScreen = ({ navigation }) => {
  const handleGetStarted = () => {
    navigation.navigate('Login');
  };

  return (
    <View style={styles.container}>
    <Image source={require('../../assets/ReliefHub.png')} style={styles.logo} />
      <Text style={styles.slogan}>"your hub for disaster relief"</Text>
      <TouchableOpacity style={styles.getStartedButton} onPress={handleGetStarted}>
        <Text style={styles.getStartedButtonText}>Get Started !</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    marginTop: -100,

  },
  logo: {
    width: 500,
    height: 500,
    resizeMode: 'contain',
  },
  slogan: {
    fontSize: 18,
    fontWeight: '500',
    marginTop: -120,
  },
  getStartedButton: {
    backgroundColor: '#f84242',
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 40,
    marginTop: 40,
  },
  getStartedButtonText: {
    color: '#000000',
    fontSize: 18,
    fontWeight: '700',
  },
});

export default WelcomeScreen;
