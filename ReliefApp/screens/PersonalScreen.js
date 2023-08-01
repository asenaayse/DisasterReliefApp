import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../firebase';
//import auth from '@react-native-firebase/auth'; // replace with your auth module
import { useRoute } from '@react-navigation/native';
import { FontAwesome5  } from '@expo/vector-icons'; // Import the icon you want to use
const deviceWidth = Dimensions.get('window').width;
const PersonalScreen = () => {
  const [donations, setDonations] = useState([]);
  const [requests, setRequests] = useState([]);

  const route = useRoute();
  const { userEmail } = route.params || {};

  

  useEffect(() => {
    const fetchItems = async () => {
    //  const user = auth().currentUser;
      if (userEmail) {
        
        // Fetch the user's donations
        const donationsSnapshot = await getDocs(query(
          collection(db, 'donations'),
          where('name', '==', userEmail),
        ));
        setDonations(donationsSnapshot.docs.map(doc => doc.data()));

        // Fetch the user's requests
        const requestsSnapshot = await getDocs(query(
          collection(db, 'needs'), // assuming 'needs' is your requests collection
          where('name', '==', userEmail),
        ));
        setRequests(requestsSnapshot.docs.map(doc => doc.data()));
      }
    };

    fetchItems();
  }, [userEmail]);

  return (

    <View style={styles.container}>
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
    // Add more cases for other categories and their corresponding icons
    default:
      return 'ios-information-circle';
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 16,
    marginBottom: 16,
    color: 'black',
    backgroundColor: '#f84242',
    borderRadius: 40,
    marginRight: 580,
    borderColor: 'black',
    padding: 20,
    width: deviceWidth > 800 ? 250 : '50%',
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 16,
  },
  itemText: {
    marginLeft: 16,
    padding: 4,
  },
});

export default PersonalScreen;
