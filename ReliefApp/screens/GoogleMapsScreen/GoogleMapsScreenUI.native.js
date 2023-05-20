import React from 'react';
import { View } from 'react-native';
import MapView from 'react-native-maps';

const GoogleMapsScreenUI = () => {
  return (
    <View style={{ flex: 1 }}>
      <MapView
        style={{ flex: 1 }}
        initialRegion={{
          latitude: 41.032064,
          longitude: 29.258676,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      />
    </View>
  );
}

export default GoogleMapsScreenUI;
