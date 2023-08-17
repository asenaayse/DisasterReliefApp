import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { collection, getDocs, doc, setDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../firebase';
import axios from 'axios';
import { auth } from '../firebase';

const GOOGLE_MAPS_API_KEY = 'AIzaSyBjGooTZ-oIqvByiGphFubfMcYNtYpksxY';

function haversine(lat1, lon1, lat2, lon2) {
  var radlat1 = Math.PI * lat1/180;
  var radlat2 = Math.PI * lat2/180;
  var radlon1 = Math.PI * lon1/180;
  var radlon2 = Math.PI * lon2/180;
  var theta = lon1-lon2;
  var radtheta = Math.PI * theta/180;
  var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
  if (dist > 1) {
      dist = 1;
  }
  dist = Math.acos(dist);
  dist = dist * 180/Math.PI;
  dist = dist * 60 * 1.1515;
  return dist;
}

const DistributorScreen = () => {
  const [pairs, setPairs] = useState([]);

  const fetchItems = async () => {
    try{
    const donationsSnapshot = await getDocs(collection(db, 'donations'));
    const donationsData = await Promise.all(donationsSnapshot.docs.map(async doc => {
      const data = doc.data();
      let locationName = 'Address not provided';
      if (data.locationLat !== undefined && data.locationLng !== undefined) {
        const response = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${data.locationLat},${data.locationLng}&key=${GOOGLE_MAPS_API_KEY}`);
        locationName = response.data.results && response.data.results[0] ? response.data.results[0].formatted_address : 'Address not found';
        } 
      return {
        id: doc.id,
        ...data,
        locationName,
      };
    }));
  
    const needsSnapshot = await getDocs(collection(db, 'needs'));
    const needsData = await Promise.all(needsSnapshot.docs.map(async doc => {
      const data = doc.data();
      let locationName = 'Address not provided';
      if (data.locationLat !== undefined && data.locationLng !== undefined) {
        const response = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${data.locationLat},${data.locationLng}&key=${GOOGLE_MAPS_API_KEY}`);
        locationName = response.data.results && response.data.results[0] ? response.data.results[0].formatted_address : 'Address not found';
      }
      return {
        id: doc.id,
        ...data,
        locationName,
      };
    }));

    const pairs = [];
    donationsData.forEach(donation => {
      needsData.forEach(need => {
        // Check if categories and subcategories match
        if (donation.category === need.category && donation.subCategory === need.subCategory) {
          const distance = haversine(donation.locationLat, donation.locationLng, need.locationLat, need.locationLng);
          pairs.push({ donation, need, distance });
        }
      });
    });
    pairs.sort((a, b) => a.distance - b.distance);
    setPairs(pairs);
  }catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

const handleVolunteerClick = async (donationId, needId) => {
  const userId = auth.currentUser?.email;
  await setDoc(doc(db, 'transports', `${donationId}-${needId}`), {
    donationId,
    needId,
    volunteerId: userId,
    status: 'assigned',
  });
};

  const ItemView = ({ item }) => ( 
    <View style={styles.itemContainer}>
      <Text style={styles.itemTitle}>Donation: {item.donation.name}</Text>
      <Text style={styles.itemDetail}>Category: {item.donation.category} - {item.need.amount} {item.donation.subCategory}</Text>
      <Text style={styles.itemDetail}>Location: {item.donation.locationName}</Text>
      <Text style={styles.itemTitle}>Need: {item.need.name}</Text>
      <Text style={styles.itemDetail}>Category: {item.need.category} - {item.need.amount} {item.need.subCategory}</Text>
      <Text style={styles.itemDetail}>Location: {item.need.locationName}</Text>
      <Text style={styles.itemDistance}>Distance: {item.distance.toFixed(2)} km</Text>
        <View style={styles.buttonWrapper}>
  <TouchableOpacity
    style={styles.buttonContainer}
    onPress={() => handleVolunteerClick(item.donation.id, item.need.id)}
  >
    <Text style={styles.buttonText}>Become Volunteer</Text>
  </TouchableOpacity>
</View>


    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={pairs}
        renderItem={ItemView}
        keyExtractor={item => item.donation.id + item.need.id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '110%',
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  buttonContainer: {
    width: '70%',
    paddingHorizontal: 10,
    backgroundColor: '#f5f5f5',
  },
  buttonContainer: {
    width: '50%',
    backgroundColor: '#f84242',
    padding: 10,
    marginVertical: 8,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 1,
    elevation: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
  buttonWrapper: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  
  itemContainer: {
    width: '90%',
    backgroundColor: '#fff',
    padding: 10,
    marginVertical: 8,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 1,
    elevation: 3,
  },
  itemTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  itemDetail: {
    fontSize: 16,
    marginBottom: 3,
  },
  itemDistance: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
    color: '#228B22',
  },
});

export default DistributorScreen;
