import { StyleSheet, Text, TouchableOpacity, View, Modal, Dimensions } from 'react-native';
import Form from './Form'
import React, {useState} from 'react'
import { FontAwesome5 } from '@expo/vector-icons'; // https://icons.expo.fyi/ 

const deviceWidth = Dimensions.get('window').width;

const HomeScreenUI = ({auth, clickSignOut, navigation}) => {
  
  const [formType, setFormType] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);


  return (

    <View style={styles.container}>

      <FontAwesome5 name="hands-helping" size={100} color="#f84242" />

      <Text>Welcome {auth.currentUser?.email} </Text>


      <TouchableOpacity
        style = {styles.button}
        onPress={() => {
          setFormType('needs');
          setIsModalVisible(true);
        }}
        
      >
        <Text style = {styles.buttonText}>I need something...</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style = {styles.button}
        onPress={() => {
          setFormType('donations');
          setIsModalVisible(true);
        }}
      >
        <Text style = {styles.buttonText}>I want to donate...</Text>

      </TouchableOpacity>

      <TouchableOpacity
       style = {styles.button}
       onPress={() => {
        navigation.navigate('Map');
  }}
>
  <Text style = {styles.buttonText}>Go to Map</Text>
</TouchableOpacity>


<TouchableOpacity
       style = {styles.button}
       onPress={() => {
        navigation.navigate('Requested Items');
  }}
>
  <Text style = {styles.buttonText}>Requested Items</Text>
</TouchableOpacity>

<TouchableOpacity
       style = {styles.button}
       onPress={() => {
        navigation.navigate('Available Items');
  }}
>
  <Text style = {styles.buttonText}>Available Items</Text>
</TouchableOpacity>


      
      
      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
             <Form formType={formType} closeModal={() => setIsModalVisible(false)} auth={auth} />
          </View>
      </View>
      </Modal>




      <TouchableOpacity
        style = {styles.signOutButton}
        onPress = {clickSignOut}
      >
        <Text style = {styles.signOutButtonText}>Sign out</Text>

      </TouchableOpacity>
      
    </View>
  )
}

export default HomeScreenUI

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#f84242',
    width: '60%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 15,
    borderColor: 'black',
    width: deviceWidth > 800 ? 250 : '60%',
  },
  buttonText: {
    color: 'black',
    fontWeight: '700',
    fontSize: 16,
  },
  signOutButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    width: deviceWidth > 800 ? 250 : '60%',
  },
  signOutButtonText: {
    textDecorationLine: 'underline',
    color: 'black', 
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
},
modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
        width: 0,
        height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: deviceWidth * 0.5, 
    height: '80%',
},


})
