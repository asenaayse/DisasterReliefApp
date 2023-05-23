import React, {useCallback, useEffect, useState} from 'react';
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '100%'
};

const center = {
  lat: 41.032064,
  lng: 29.258676
};

const GoogleMapsScreenUI = () => {
  const [selectedLocation, setSelectedLocation] = useState(null);
  const handleMapClick = useCallback((event) => {
    setSelectedLocation({
      lat: event.latLng.lat(),
      lng: event.latLng.lng(),
    });
  }, []);

  useEffect(()=>{
    console.log('selected location is:', selectedLocation)
  }, [selectedLocation]);


  return (
    <LoadScript googleMapsApiKey="AIzaSyD7cc54lrevO7ObNjdDovzlSuPqlP-JJ-c
    ">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={10}
        onClick={handleMapClick}
      >
        {selectedLocation && <Marker position={selectedLocation}/>}
      </GoogleMap>
    </LoadScript>
  );
}

export default GoogleMapsScreenUI;
