import React, { useState, useEffect } from 'react';
import { LoadScript, GoogleMap, Marker } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '100%'
};

const center = {
  lat: 41.032064,
  lng: 29.258676
};

const GoogleMapsScreenUI = ({ route }) => {

 // const initialLocation = {
 //   lat: route.params.item.location.lat, 
 //   lng: route.params.item.location.lng
 // };
  
  const useGeocode = (address) => {
    const [location, setLocation] = useState(center);
  
    useEffect(() => {
      if (address) {
        const geocoder = new google.maps.Geocoder();
        geocoder.geocode({ address }, (results, status) => {
          if (status === "OK") {
            setLocation({
              lat: results[0].geometry.location.lat(),
              lng: results[0].geometry.location.lng(),
            });
          } else {
            alert("Geocode was not successful for the following reason: " + status);
          }
        });
      } else {
        setLocation(center);
      }
    }, [address]);
  
    return location;
  };
  

  const selectedLocation = useGeocode(route?.params?.location);
  
  return (
    <LoadScript googleMapsApiKey="AIzaSyD7cc54lrevO7ObNjdDovzlSuPqlP-JJ-c">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={selectedLocation}
        zoom={10}
      >
        <Marker position={selectedLocation} />
      </GoogleMap>
    </LoadScript>
  );
};

export default GoogleMapsScreenUI;
