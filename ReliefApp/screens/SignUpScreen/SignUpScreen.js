import React, { useState } from 'react';
import { Image, View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Dimensions } from 'react-native';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../../firebase';
import { addDoc, collection } from 'firebase/firestore';
import { useNavigation } from '@react-navigation/core';
import { MaterialIcons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons'; 

const deviceWidth = Dimensions.get('window').width;

  
const SignUpScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

  const clickSignIn = () => {
    navigation.navigate('Login'); }
    
  const handleSignUp = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredentials) => {
        const user = userCredentials.user;
        console.log('new user:', user.email);
        // Save user's name in the Firestore collection 'users'
        addDoc(collection(db, 'users'), {
          name: name,
          email: user.email,
        })
          .then(() => {
            console.log('User information saved in Firestore');
          })
          .catch((error) => {
            console.error('Error saving user information:', error);
          });
        // Additional logic after successful sign-up
        navigation.navigate('Login'); // Navigate back to the login screen after successful sign-up
      })
      .catch((error) => {
        // Handle sign-up error
        console.log('Sign-up error:', error.message);
      });
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior='padding'>
      <Image source={require('../../assets/ReliefHub.png')} style={styles.logo} />
      
      <View style={styles.inputContainer}>
        <View style={styles.inputIcon}>
          <Entypo name="user" size={24} color="black" />
          </View>
          <TextInput
            style={styles.input}
            placeholder="Name"
            value={name}
            onChangeText={(text) => setName(text)}
          />
        </View>

        <View style={styles.inputContainer}>
          <View style={styles.inputIcon}>
            <Entypo name="mail" size={24} color="black" />
          </View>
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={(text) => setEmail(text)}
          />
        </View>

        <View style={styles.inputContainer}>
           <View style={styles.inputIcon}>
              <Entypo name="lock" size={24} color="black" />
           </View>
          <TextInput
            style={styles.input}
            placeholder="Password"
            value={password}
            onChangeText={(text) => setPassword(text)}
            secureTextEntry
          />
        </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleSignUp}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>
      </View>      
      
            <Text style= {styles.text1}>Already have an account ?</Text>
                <TouchableOpacity onPress={clickSignIn}> 
                    <Text style={styles.signuptext}>Sign In!</Text>
                </TouchableOpacity>     
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 0,
  },
  inputIcon: {
    marginRight: 10,
    marginTop: 15,
    marginLeft: -30,
  },
  inputContainer: {
    width: deviceWidth > 800 ? 250 : '50%',
    flexDirection: 'row',
    marginTop: 0,    
  },
  input: {
    backgroundColor: 'white',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 20,
    marginTop: 10,
    height: 40,
    width: deviceWidth > 800 ? 250 : '100%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    color: 'black',
    fontWeight: '700',
    fontSize: 16,
    marginTop: 15,
  },
  text1:{
    color: 'black',
    fontWeight: '400',
    fontSize: 16,
    marginTop: 15,
  },
  signuptext: {
    color: 'black',
    fontWeight: '700',
    fontSize: 16,

  },
  buttonContainer: {
    width: deviceWidth > 800 ? 250 : '60%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 25,
  },
  button: {
    backgroundColor: '#f84242',
    width: '90%',
    padding: 10,
    borderRadius: 40,
    alignItems: 'center',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 1,
    elevation: 3,
  },
  buttonText: {
    color: 'black',
    fontWeight: '700',
    fontSize: 18,
  },
  logo: {
    width: 400,
    height: 400,
    resizeMode: 'contain',
    marginTop: -130,
    marginBottom: -100,
  },
});

export default SignUpScreen;
