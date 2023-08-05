import { StyleSheet, Text, TouchableOpacity, View, Modal, Dimensions } from 'react-native';
import Form from './Form'
import React, {useState} from 'react'
import { FontAwesome5 } from '@expo/vector-icons'; // https://icons.expo.fyi/ 
import { Button, Header, Icon, Card, Divider } from 'react-native-elements';

const deviceWidth = Dimensions.get('window').width;

const HomeScreenUI = ({auth, clickSignOut, navigation}) => {
  
  const [formType, setFormType] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);


  return (
  <>  
    <Header
        centerComponent={{ text: `Welcome, ${auth.currentUser?.email}`, style: { color: '#fff' } }}
        rightComponent={{ icon: 'logout', color: '#fff', onPress: clickSignOut }}
        containerStyle={{ backgroundColor: '#f84242' }}
      />

    <View style={styles.container}>

      <FontAwesome5 name="hands-helping" size={100} color="#f84242" />

      
<TouchableOpacity
       style = {styles.button}
       onPress={() => {
        navigation.navigate('User');
  }}
>
  <Text style = {styles.buttonText}>Profile</Text>
</TouchableOpacity>


      <TouchableOpacity
        style = {styles.button}
        onPress={() => {
          setFormType('needs');
          setIsModalVisible(true);
        }}
        
      >
        <Text style = {styles.buttonText}>Make a Request</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style = {styles.button}
        onPress={() => {
          setFormType('donations');
          setIsModalVisible(true);
        }}
      >
        <Text style = {styles.buttonText}>Make a Donation</Text>

      </TouchableOpacity>

      <TouchableOpacity
       style = {styles.button}
       onPress={() => {
        navigation.navigate('Mark');
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

<TouchableOpacity
       style = {styles.button}
       onPress={() => {
        navigation.navigate('Distributor');
  }}
>
  <Text style = {styles.buttonText}>Volunteer Couriers</Text>
</TouchableOpacity>

<TouchableOpacity
  style={styles.button}
  onPress={() => {
    navigation.navigate('MessageList');
  }}
>
  <Text style={styles.buttonText}>Conversations</Text>
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
      
    </View>

    </>
  )
}

export default HomeScreenUI

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  button: { 
    backgroundColor: '#f84242',
    width: '60%',
    padding: 15,
    borderRadius: 40,
    alignItems: 'center',
    marginTop: 15,
    borderColor: 'black',
    width: deviceWidth > 800 ? 250 : '60%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3, 
    shadowRadius: 1,
    elevation: 3, 
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

