import React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';

import GoogleMapsScreenUI from './GoogleMapsScreenUI';

const GoogleMapsScreen = ({ route }) => {
  const { location } = route.params || {}; // Access the location from route.params or set it as an empty object
  
  const [geocode, setGeocode] = useState({});

  useEffect(() => {
    axios
      .get(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${location}&key=AIzaSyD7cc54lrevO7ObNjdDovzlSuPqlP-JJ-c`
      )
      .then((response) => {
        const result = response.data.results[0].geometry.location;
        setGeocode(result);
      })
      .catch((error) => console.error(error));
  }, [location]);

  return <GoogleMapsScreenUI location={geocode} />;
};

export default GoogleMapsScreen;





