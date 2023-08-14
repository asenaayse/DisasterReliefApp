import { KeyboardAvoidingView, Image, StyleSheet, Text, TextInput, TouchableOpacity, View, Dimensions } from 'react-native'
import React, {useState} from 'react'
import { Entypo } from '@expo/vector-icons'; 


const deviceWidth = Dimensions.get('window').width;

const LoginScreenUI = ({email, setEmail, password, setPassword, clickSignUp, clickSignin}) => {
    
    return (
        <KeyboardAvoidingView
        style={styles.container}
        behavior='padding'
        >
            <Image source={require('../../assets/ReliefHub.png')} style={styles.logo} />

            <View style={styles.inputContainer}>
                <View style={styles.inputIcon}>
                     <Entypo name="mail" size={24} color="black" />
                </View>
                <TextInput
                    placeholder='Email'
                    value = {email}
                    onChangeText={text => setEmail(text)}
                    style={styles.input}
                />
             </View>
             <View style={styles.inputContainer}>
                <View style={styles.inputIcon}>
                     <Entypo name="lock" size={24} color="black" />
                </View>
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
                <Text style= {styles.text1}>Don't you have an account ?</Text>
                <TouchableOpacity onPress={clickSignUp}> 
                    <Text style={styles.signuptext}>Sign Up!</Text>
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
        marginTop: -120,

    },
    inputContainer: {
        width: deviceWidth > 800 ? 250 : '50%',
        flexDirection: 'row',
        marginTop: 0,

    },
    logo:{
        width: 400,
        height: 400,
        resizeMode: 'contain',
        marginTop: -50,
        marginBottom: -100,
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
    inputIcon: {
        marginRight: 10,
        marginTop: 15,
        marginLeft: -30,
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
    buttonOutline: {
        backgroundColor: '#F6F6F6',
        marginTop: 5,
        borderColor: '#f84242',
        borderWidth: 2,
    },
    buttonText: {
       color: 'black',
       fontWeight: '700',
       fontSize: 18,
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
    icon: {
        marginBottom: 0,
      },
    
})