import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../firebase';
import { useRoute } from '@react-navigation/native';
import { FontAwesome5  } from '@expo/vector-icons'; 
import { useNavigation } from '@react-navigation/native';


const deviceWidth = Dimensions.get('window').width;
const PersonalScreen = () => {
  const [donations, setDonations] = useState([]);
  const [requests, setRequests] = useState([]);

  const route = useRoute();
  const { userEmail } = route.params || {};

  const navigation = useNavigation();


  useEffect(() => {
    const fetchItems = async () => {
    //  const user = auth().currentUser;
      if (userEmail) {
        
        const donationsSnapshot = await getDocs(query(
          collection(db, 'donations'),
          where('name', '==', userEmail),
        ));
        setDonations(donationsSnapshot.docs.map(doc => doc.data()));

        const requestsSnapshot = await getDocs(query(
          collection(db, 'needs'), 
          where('name', '==', userEmail),
        ));
        setRequests(requestsSnapshot.docs.map(doc => doc.data()));
      }
    };

    fetchItems();
  }, [userEmail]);

  return (

    <View style={styles.container}>

      <View style={styles.iconWithSubtitle}>
          <FontAwesome5 
            name="user-circle" 
            size={100} 
            color="#f84242" 
        //    onPress={() => navigation.navigate('User')}
          />
          <Text style={styles.subtitle}>{userEmail}</Text>
        </View>
      
        <TouchableOpacity 
          style={styles.buttonMessageContainer} 
          onPress={() => navigation.navigate('Message', { userEmail: userEmail })}
          activeOpacity={0.7}  
        >
          <Text style={styles.buttonMessageText}>Send Message</Text>
        </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Message', { userEmail: userEmail })}>
        <Text>Send Message</Text>
      </TouchableOpacity>
      <Text style={styles.header}>Donations</Text>
      {donations.map((item, index) => (
        <View key={index} style={styles.itemContainer}>
        <FontAwesome5  name={getIconName(item.category)} size={20} color="black" />
        <Text style={styles.itemText}>{item.category + ' - ' + item.amount + ' ' + item.subCategory}</Text>
      </View>
      ))}
    
      <Text style={styles.header}>Requests</Text>
      {requests.map((item, index) => (
        <View key={index} style={styles.itemContainer}>
        <FontAwesome5  name={getIconName(item.category)} size={20} color="black" />
        <Text style={styles.itemText}>{item.category + ' - ' + item.amount + ' ' + item.subCategory}</Text>
      </View>        
      ))}
    </View>
  );
};

const getIconName = category => {
  switch (category) {
    case 'Medical':
      return 'briefcase-medical';
    case 'Nutrition':
      return 'nutritionix';
    case 'Shelter':
      return 'warehouse';
    case 'Heating':
        return 'fire';
    default:
      return 'ios-information-circle';
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    alignItems: 'center' ,
    justifyContent: 'center',
  },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 16,
    marginBottom: 16,
    paddingHorizontal: 40,
    color: 'white',
    backgroundColor: '#f84242',
    borderRadius: 40,
    borderColor: 'black',
    width: deviceWidth > 800 ? 250 : '50%',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
    alignItems: 'center' ,

  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  //  marginLeft: 16,
  },
  itemText: {
    marginLeft: 16,
    padding: 4,
    fontSize: 16,
  },
  iconWithSubtitle: {
    marginHorizontal: 15,
    alignItems: 'center' 
  },
  subtitle: {
    marginTop: 5, 
    fontSize: 16, 
    color: '#f84242'
  },
  buttonMessageContainer: {
    backgroundColor: '#f84242',
    borderRadius: 25,   
    paddingVertical: 15, 
    paddingHorizontal: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 2.60,
    elevation: 4,
    alignItems: 'center', 
    justifyContent: 'center',
    marginTop: 16, 
    marginBottom: 16, 

  },
  buttonMessageText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',  
    alignItems: 'center',

  },
  
});

export default PersonalScreen;
