/*import { StyleSheet, Text, TouchableOpacity, View, Modal, Dimensions } from 'react-native';
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

      <FontAwesome5 name="hands-helping" size={150} color="#f84242" />
      
      <View style={styles.iconContainer}>
        <View style={styles.iconWithSubtitle}>
          <FontAwesome5 
            name="user-circle" 
            size={40} 
            color="#f84242" 
            onPress={() => navigation.navigate('User')}
          />
          <Text style={styles.subtitle}>Profile</Text>
        </View>
        
        <View style={styles.iconWithSubtitle}>
          <FontAwesome5 
            name="envelope" 
            size={40} 
            color="#f84242" 
            onPress={() => navigation.navigate('MessageList')}
          />
          <Text style={styles.subtitle}>Messages</Text>
        </View>

        <View style={styles.iconWithSubtitle}>
          <FontAwesome5 
            name="map" 
            size={40} 
            color="#f84242" 
            onPress={() => navigation.navigate('Mark')}
          />
          <Text style={styles.subtitle}>Map</Text>
        </View>
      </View>


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
iconContainer: {
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  marginVertical: 20
},
iconWithSubtitle: {
  marginHorizontal: 15,
  alignItems: 'center' 
},
subtitle: {
  marginTop: 5, 
  fontSize: 12, 
  color: '#f84242'
}


})

*/
import { StyleSheet, Text, TouchableOpacity, View, Modal, Dimensions,Image } from 'react-native';
import Form from './Form'
import React, {useState} from 'react'
import { FontAwesome5 } from '@expo/vector-icons'; // https://icons.expo.fyi/ 
import { Button, Header, Icon, Card, Divider } from 'react-native-elements';
import Carousel from 'react-native-snap-carousel';

const deviceWidth = Dimensions.get('window').width;

const HomeScreenUI = ({auth, clickSignOut, navigation}) => {
  
  const [formType, setFormType] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);

  const images = [
    { src: require('../../assets/slide1.png'), link: 'Screen1' },
    { src: require('../../assets/slide2.png'), link: 'Screen2' },
    // ... 
  ];

  const _renderItem = ({item, index}) => {
    return (
      <TouchableOpacity onPress={() => navigation.navigate(item.link)}>
        <Image source={item.src} style={{ width: deviceWidth, height: 200 }} />
      </TouchableOpacity>
    );
  }

  return (
  <>  
    <Header
        centerComponent={{ text: `Welcome, ${auth.currentUser?.email}`, style: { color: '#fff' } }}
        rightComponent={{ icon: 'logout', color: '#fff', onPress: clickSignOut }}
        containerStyle={{ backgroundColor: '#f84242' }}
      />
  
    <View style={styles.container}>

        <Carousel
          data={images}
          renderItem={_renderItem}
          sliderWidth={deviceWidth}
          itemWidth={deviceWidth}
          autoplay={true}
          loop={true}
        />

      
      <View style={styles.iconContainer}>
        <View style={styles.iconWithSubtitle}>
          <FontAwesome5 
            name="user-circle" 
            size={40} 
            color="#f84242" 
            onPress={() => navigation.navigate('User')}
          />
          <Text style={styles.subtitle}>Profile</Text>
        </View>
        
        <View style={styles.iconWithSubtitle}>
          <FontAwesome5 
            name="envelope" 
            size={40} 
            color="#f84242" 
            onPress={() => navigation.navigate('MessageList')}
          />
          <Text style={styles.subtitle}>Messages</Text>
        </View>

        <View style={styles.iconWithSubtitle}>
          <FontAwesome5 
            name="map" 
            size={40} 
            color="#f84242" 
            onPress={() => navigation.navigate('Mark')}
          />
          <Text style={styles.subtitle}>Map</Text>
        </View>
      </View>


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
    marginBottom: 85
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
    marginTop: 3,  // Reduced from 15 to 5
    marginBottom: 3,
    padding: 1
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
iconContainer: {
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  marginVertical: 20
},
iconWithSubtitle: {
  marginHorizontal: 15,
  alignItems: 'center' 
},
subtitle: {
  marginTop: 5, 
  fontSize: 12, 
  color: '#f84242'
}


})