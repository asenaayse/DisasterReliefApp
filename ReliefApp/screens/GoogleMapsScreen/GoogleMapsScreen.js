import React from 'react';
import GoogleMapsScreenUI from './GoogleMapsScreenUI';

const GoogleMapsScreen = ({ route }) => {
  const { location } = route.params || {}; // Access the location from route.params or set it as an empty object
  return <GoogleMapsScreenUI location={location} />;
};



export default GoogleMapsScreen;




