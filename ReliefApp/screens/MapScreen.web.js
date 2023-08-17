import React, { useEffect, useState } from 'react';
import { GoogleMap, Marker, InfoWindow, LoadScript } from '@react-google-maps/api';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import { useNavigation } from '@react-navigation/native'; // import the hook

const MapScreen = () => {
  const [donations, setAvailableItems] = useState([]);
  const [needs, setRequestedItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const navigation = useNavigation(); // define the hook

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

  const mapStyles = {
    height: "100vh",
    width: "100%"
  };

  const defaultCenter = {
    lat: 41.044404, 
    lng: 29.036189
	
  };

  const handleButtonClick = () => {
    // navigate to 'DetailScreen' with the selected item as a parameter
    navigation.navigate('Profile', { item: selectedItem });
  };
  return (
    <LoadScript
      googleMapsApiKey="AIzaSyBjGooTZ-oIqvByiGphFubfMcYNtYpksxY"
      libraries={['geometry', 'drawing', 'places']}
    >
      <GoogleMap
        mapContainerStyle={mapStyles}
        zoom={10}
        center={defaultCenter}
      >
        {donations.map(item => (
          <Marker
            key={item.id}
            position={{ lat: item.locationLat, lng: item.locationLng }}
            icon={{url: "http://maps.google.com/mapfiles/ms/icons/green-dot.png"}}
            onClick={() => {
              setSelectedItem(item);
              
            }}
          />
        ))}

        {needs.map(item => (
          <Marker
            key={item.id}
            position={{ lat: item.locationLat, lng: item.locationLng }}
            icon={{url: "http://maps.google.com/mapfiles/ms/icons/red-dot.png"}}
            onClick={() => {
              setSelectedItem(item);
              
            }}
          />
        ))}

        {selectedItem && (
          <InfoWindow
            position={{ lat: selectedItem.locationLat, lng: selectedItem.locationLng }}
            onCloseClick={() => {
              setSelectedItem(null);              
            }}
          >
            <div>
              <h2>{"Contact: " + selectedItem.name}</h2>
              <p>{selectedItem.category+ " - " + selectedItem.amount+ " " +selectedItem.subCategory}</p>
              <button onClick={() => navigation.navigate('Personal', { userEmail: selectedItem.name })}>
                  Go to Profile
              </button>
			      </div>
          </InfoWindow>
        )}
      </GoogleMap>
    </LoadScript>
  );
}

export default MapScreen;
