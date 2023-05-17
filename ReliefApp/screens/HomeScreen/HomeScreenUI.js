import { StyleSheet, Text, TouchableOpacity, View, Modal } from 'react-native';
import Form from './Form'
import React, {useState} from 'react'


const HomeScreenUI = ({auth, clickSignOut, navigation}) => {
  
  const [formType, setFormType] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);


  return (
    <View style={styles.container}>
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
        <Text style = {styles.buttonText}>I want to donate something...</Text>
      </TouchableOpacity>

      <TouchableOpacity
       style = {styles.button}
       onPress={() => {
        navigation.navigate('Map');
  }}
>
  <Text style = {styles.buttonText}>Go to Map</Text>
</TouchableOpacity>

      
      {/* will make overlay later */}
      <Modal
        animationType="slide"
        transparent={false}
        visible={isModalVisible}
        onRequestClose={() => setIsModalVisible(false)}
      >
        <Form formType={formType} closeModal={() => setIsModalVisible(false)} />
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
    alignItems: 'center'
  },
  button: {
    backgroundColor: '#FFD600',
    width: '60%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 15,
    borderColor: 'black'
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
  },
  signOutButtonText: {
    textDecorationLine: 'underline',
    color: 'black', 
  },

})