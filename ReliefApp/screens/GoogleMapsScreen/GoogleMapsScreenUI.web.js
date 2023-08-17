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

const GoogleMapsScreenUI = ({ location }) => {
  const [mapCenter, setMapCenter] = useState(center);
  
  useEffect(() => {
    if (location.lat && location.lng) {
      setMapCenter(location);
    }
  }, [location]);

  return (
    <LoadScript googleMapsApiKey="AIzaSyBjGooTZ-oIqvByiGphFubfMcYNtYpksxY">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={mapCenter}
        zoom={10}
      >
        <Marker position={mapCenter} />
      </GoogleMap>
    </LoadScript>
  );
};

export default GoogleMapsScreenUI;
