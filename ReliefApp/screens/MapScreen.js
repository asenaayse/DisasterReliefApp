import React, { useEffect, useState } from 'react';
import MapView, { Marker } from 'react-native-maps';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import MapScreen from './MapScreen';

const MapScreen = () => {
    const [donations, setAvailableItems] = useState([]);
    const [needs, setRequestedItems] = useState([]);

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

    return (
        <MapView
            style={{ flex: 1 }}
            initialRegion={{
                latitude: 41.044404,
                longitude: 29.036189,
                latitudeDelta: 0.5,
                longitudeDelta: 0.5,
				
            }}
        >
            {donations.map(item => (
                <Marker
                    key={item.id}
                    coordinate={{ latitude: item.locationLat, longitude: item.locationLng }}
                    title={"Contact: " + item.name}
                    description={item.category + " - " + item.amount +" "+ item.subCategory}
                    pinColor="green"
                />
            ))}

            {needs.map(item => (
                <Marker
                    key={item.id}
                    coordinate={{ latitude: item.locationLat, longitude: item.locationLng }}
                    title={"Contact: " + item.name}
                    description={item.category + " - " + item.amount +" "+ item.subCategory}
                    pinColor="red"
                />
            ))}
        </MapView>
    );
};

export default MapScreen;
