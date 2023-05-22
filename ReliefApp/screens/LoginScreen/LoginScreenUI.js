import { KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View, Dimensions } from 'react-native'
import React, {useState} from 'react'
import { auth } from "../../firebase"
import { createUserWithEmailAndPassword } from 'firebase/auth'; 
import { signInWithEmailAndPassword } from 'firebase/auth'; 
import { MaterialIcons } from '@expo/vector-icons';

const deviceWidth = Dimensions.get('window').width;

const LoginScreenUI = ({email, setEmail, password, setPassword, clickSignUp, clickSignin}) => {
    
    return (
        <KeyboardAvoidingView
        style={styles.container}
        behavior='padding'
        >
            <MaterialIcons name="person" size={180} color="#f84242" style={styles.icon} />
      
            <View style={styles.inputContainer}>
                <TextInput
                    placeholder='Email'
                    value = {email}
                    onChangeText={text => setEmail(text)}
                    style={styles.input}
                />
                <TextInput
                    placeholder='Password'
                    value = {password}
                    onChangeText={text => setPassword(text)}
                    style={styles.input}
                    secureTextEntry={true}
                />
            </View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    onPress={clickSignin}
                    style={styles.button}
                >
                    <Text style={styles.buttonText}>Sign in</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={clickSignUp}
                    style={[styles.button, styles.buttonOutline]}
                >
                    <Text style={styles.buttonOutlineText}>Sign up</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    )
}

export default LoginScreenUI

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    inputContainer: {
        width: deviceWidth > 800 ? 250 : '60%',
    },
    input: {
        backgroundColor: 'white',
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 15,
        marginTop: 10,
    },
    buttonContainer: {
        width: deviceWidth > 800 ? 250 : '60%',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 40,
    },
    button: {
        backgroundColor: '#f84242',
        width: '100%',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
    },
    buttonOutline: {
        backgroundColor: '#F6F6F6',
        marginTop: 5,
        borderColor: '#f84242',
        borderWidth: 2,
    },
    buttonText: {
       color: 'black',
       fontWeight: '700',
       fontSize: 16,
    },
    buttonOutlineText: {
        color: 'black',
        fontWeight: '700',
        fontSize: 16,
    },
    icon: {
        marginBottom: 20,
      },
    
})