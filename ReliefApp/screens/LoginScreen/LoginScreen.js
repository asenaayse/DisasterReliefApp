import { KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, {useEffect, useState} from 'react'
import { auth } from "../../firebase"
import { createUserWithEmailAndPassword } from 'firebase/auth'; 
import { signInWithEmailAndPassword } from 'firebase/auth'; 
import LoginScreenUI from './LoginScreenUI';
import { useNavigation } from '@react-navigation/core';


const LoginScreen = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigation = useNavigation()

    // sign up
    const clickSignUp = () => {
        navigation.navigate('SignUpScreen'); }
  
      //sign in
      const clickSignin = () => {
        signInWithEmailAndPassword(auth, email, password)
          .then((userCredentials) => {
            const user = userCredentials.user;
            console.log('logged in user: ' + user.email);
            auth.onAuthStateChanged(user => {
              if (user) {
              navigation.navigate("Home")
            }
          })
          })
          .catch((error) => {
            const errorCode = error.code;
            let errorMessage;
            
            switch (errorCode) {
              case 'auth/invalid-email':
                errorMessage = 'Not a valid email';
                break;
              case 'auth/user-disabled':
                errorMessage = 'This account has been deactivated';
                break;
              case 'auth/user-not-found':
                errorMessage = 'This email is not registered, please click on "Sign up';
                break;
              case 'auth/wrong-password':
                errorMessage = 'Incorrect password';
                break;
              default:
                errorMessage = error.message;
            }
      
            alert(errorMessage);
          });       

      };

    return (
      <LoginScreenUI 
      email = {email}
      password = {password}
      setEmail = {setEmail}
      setPassword = {setPassword}
      clickSignUp = {clickSignUp}
      clickSignin = {clickSignin}
      
      />
    )
}

export default LoginScreen

