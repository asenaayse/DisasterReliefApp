import React from 'react';
import { View } from 'react-native';
import MapView from 'react-native-maps';

const GoogleMapsScreenUI = () => {
  return (
    <View style={{ flex: 1 }}>
      <MapView
        style={{ flex: 1 }}
        initialRegion={{
          latitude: -3.745,
          longitude: -38.523,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      />
    </View>
  );
}

export default GoogleMapsScreenUI;
