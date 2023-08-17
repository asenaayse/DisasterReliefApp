import React, { useEffect, useState } from 'react';
import MapView, { Marker, Callout, Polyline } from 'react-native-maps';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import { useNavigation } from '@react-navigation/native';
import { Button, Text, Image, TouchableOpacity, View, StyleSheet } from 'react-native';
import MapViewDirections from 'react-native-maps-directions';

import heaterNeed from '../assets/MapIcons/heater_need.png';
import heaterDonation from '../assets/MapIcons/heater_donation.png';
import blanketNeed from '../assets/MapIcons/blanket_need.png';
import blanketDonation from '../assets/MapIcons/blanket_donation.png';
import painkillerNeed from '../assets/MapIcons/painkiller_need.png';
import painkillerDonation from '../assets/MapIcons/painkiller_donation.png';
import bandaidNeed from '../assets/MapIcons/bandaid_need.png';
import bandaidDonation from '../assets/MapIcons/bandaid_donation.png';
import tentNeed from '../assets/MapIcons/tent_need.png';
import tentDonation from '../assets/MapIcons/tent_donation.png';
import containerNeed from '../assets/MapIcons/container_need.png';
import containerDonation from '../assets/MapIcons/container_donation.png';
import foodNeed from '../assets/MapIcons/food_need.png';
import foodDonation from '../assets/MapIcons/food_donation.png';
import waterNeed from '../assets/MapIcons/water_need.png';
import waterDonation from '../assets/MapIcons/water_donation.png';

const MapScreen = () => {
    const [donations, setAvailableItems] = useState([]);
    const [needs, setRequestedItems] = useState([]);
    const [start, setStart] = useState(null);
    const [destination, setDestination] = useState(null);
    const navigation = useNavigation();

    useEffect(() => {
        const fetchItems = async () => {
            // Fetch available items
            const donationsSnapshot = await getDocs(collection(db, 'donations'));
            const donationsData = donationsSnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
            }));
            setAvailableItems(donationsData);

            // Fetch requested items
            const needsSnapshot = await getDocs(collection(db, 'needs'));
            const needsData = needsSnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
            }));
            setRequestedItems(needsData);
        };

        fetchItems();
    }, []);
    const getIcon = (item, isNeed = false) => {
        switch (item.subCategory) {
            case 'Electric_Heater':
                return isNeed ? heaterNeed : heaterDonation;
            case 'Blanket':
                return isNeed ? blanketNeed : blanketDonation;
            case 'Painkiller':
                return isNeed ? painkillerNeed : painkillerDonation;
            case 'Bandage':
                return isNeed ? bandaidNeed : bandaidDonation;
            case 'Tent':
                return isNeed ? tentNeed : tentDonation;
            case 'Container':
                return isNeed ? containerNeed : containerDonation;
            case 'Food':
                return isNeed ? foodNeed : foodDonation;
            case 'Water':
                return isNeed ? waterNeed : waterDonation;
            default:
                return isNeed ? redDot : greenDot;
        }
    }
    

    return (
        <MapView style={{ flex: 1 }}
        initialRegion={{
            latitude: 41.043029,
            longitude: 29.030063,
            latitudeDelta: 0.5,  // This defines the zoom level. Smaller values are more zoomed in.
            longitudeDelta: 0.5, 
        }}
    
        >
            {[...donations, ...needs].map(item => (
                <Marker
                    key={item.id}
                    coordinate={{ latitude: item.locationLat, longitude: item.locationLng }}
                    image={getIcon(item, needs.includes(item))}
                >
                    <Image source={getIcon(item, needs.includes(item))} style={{ width: 30, height: 30 }} /> 
                    
                    <Callout tooltip>
                        <View style={styles.callout}>
                            <Text style={styles.calloutText}>{"Contact: " + item.name}</Text>
                            <Text style={styles.calloutText}>{item.category + " - " + item.amount + " " + item.subCategory}</Text>
                            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Personal', { userEmail: item.name })}>
                                <Text style={styles.buttonText}>Go to Profile</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.button} onPress={() => setStart({ latitude: item.locationLat, longitude: item.locationLng })}>
                                <Text style={styles.buttonText}>Set as start</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.button} onPress={() => setDestination({ latitude: item.locationLat, longitude: item.locationLng })}>
                                <Text style={styles.buttonText}>Set as destination</Text>
                            </TouchableOpacity>
                        </View>

                    </Callout>
                </Marker>
            ))}
            {start && destination && (
                <MapViewDirections
                    origin={start}
                    destination={destination}
                    apikey={'AIzaSyBjGooTZ-oIqvByiGphFubfMcYNtYpksxY'} 
                    strokeWidth={3}
                    strokeColor="blue"
                />
            )}
        </MapView>
    );
}

const styles = StyleSheet.create({
    callout: {
        width: 200, // Ensures the callout isn't too wide or too narrow
        padding: 10,
        borderRadius: 10, // Rounded corners
        backgroundColor: 'white', // Background color for distinction
        shadowColor: '#000', // Shadow for depth effect
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.2, // Adjust to your liking
        shadowRadius: 3,
        elevation: 3, // for Android elevation
    },
    calloutText: {
        marginBottom: 5, // Spacing between text elements
        color: '#333', // Slightly subdued text color
    },
    button: {
        marginTop: 5, // Spacing between buttons
        padding: 5, // Padding for clickable area
        borderRadius: 5, // Rounded corners for buttons
        backgroundColor: '#007BFF', // A common blue color for CTAs
    },
    buttonText: {
        color: 'white', // Text color for the buttons
        textAlign: 'center', // Centering text inside the button
    },

});



export default MapScreen;
