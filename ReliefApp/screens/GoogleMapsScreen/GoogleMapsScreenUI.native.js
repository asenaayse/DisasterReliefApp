import React, { useEffect, useState } from 'react';
import MapView, { Marker } from 'react-native-maps';

const GoogleMapsScreenUI = ({ location }) => {
  const [mapRegion, setMapRegion] = useState({
    latitude: 41.032064,
    longitude: 29.258676,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  useEffect(() => {
    if (location.lat && location.lng) {
      setMapRegion({
        latitude: location.lat,
        longitude: location.lng,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });
    }
  }, [location]);

  return (
    <MapView
      style={{ flex: 1 }}
      region={mapRegion}
    >
      <Marker
        coordinate={mapRegion}
      />
    </MapView>
  );
};

export default GoogleMapsScreenUI;
