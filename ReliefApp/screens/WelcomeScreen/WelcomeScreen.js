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
        <Text style={styles.getStartedButtonText}>Get started</Text>
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
  },
  logo: {
    width: 500,
    height: 500,
    resizeMode: 'contain',
  },
  slogan: {
    fontSize: 18,
    fontWeight: '',
    marginTop: -100,
  },
  getStartedButton: {
    backgroundColor: '#f84242',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    marginTop: 50,
  },
  getStartedButtonText: {
    color: '#000000',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default WelcomeScreen;
