import React from 'react';
import { GoogleMap, LoadScript } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '100%'
};

const center = {
  lat: 41.032064,
  lng: 29.258676
};

const GoogleMapsScreenUI = () => {
  return (
    <LoadScript googleMapsApiKey="AIzaSyD7cc54lrevO7ObNjdDovzlSuPqlP-JJ-c
    ">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={10}
      >
        <></>
      </GoogleMap>
    </LoadScript>
  );
}

export default GoogleMapsScreenUI;
