import { KeyboardAvoidingView, Image, StyleSheet, Text, TextInput, TouchableOpacity, View, Dimensions } from 'react-native'
import React, {useState} from 'react'
import { Entypo } from '@expo/vector-icons'; 

const deviceWidth = Dimensions.get('window').width;

const CaseStudyScreenUI = ({setNorth, setSouth, setWest, setEast, clickGetNeeds, areaNeeds}) => {
    
    return (
        <KeyboardAvoidingView
        style={styles.container}
        behavior='padding'
        >
            {/* Get the coordinates for the area */}
             <View style={styles.inputContainer}>
             <Text>Enter Coordinates for Area Corners</Text>
                <TextInput
                style={styles.input}
                placeholder="North Latitude"
                keyboardType="numeric"
                onChangeText={text => setNorth(text)}
                />
                <TextInput
                style={styles.input}
                placeholder="South Latitude"
                keyboardType="numeric"
                onChangeText={text => setSouth(text)}
                />
                <TextInput
                style={styles.input}
                placeholder="West Longitude"
                keyboardType="numeric"
                onChangeText={text => setWest(text)}
                />
                <TextInput
                style={styles.input}
                placeholder="East Longitude"
                keyboardType="numeric"
                onChangeText={text => setEast(text)}
                />
                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        onPress={clickGetNeeds}
                        style={styles.button}
                    >
                        <Text style={styles.buttonText}>Get area needs</Text>
                    </TouchableOpacity>
                    <Text style= {styles.text1}>Estimated coordinates for Maraş earthquake case study: N: 39, S: 36, W:35, E:41</Text>
                </View>
             </View>

            {/* Show the needs we get from that area */}
            <View style={styles.resultsContainer}>
                {areaNeeds.map((item, index) => (
                    <Text key={index}>{JSON.stringify(item)}</Text>
                ))}
            </View>
           
        </KeyboardAvoidingView>
    )
}

export default CaseStudyScreenUI

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'flex-start', 
        marginTop: 50, 
        

    },
    inputContainer: {
        width: deviceWidth > 800 ? 250 : '50%',
        //flexDirection: 'row',
        marginTop: 0,
        marginLeft: 50,

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
        fontweight: '700',
        fontSize: 16,
        marginTop: 15,
        marginLeft: 25,
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