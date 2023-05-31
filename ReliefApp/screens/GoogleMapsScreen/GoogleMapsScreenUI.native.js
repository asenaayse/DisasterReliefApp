import React, { useState } from 'react';
import { View } from 'react-native';
import MapView from 'react-native-maps';

const GoogleMapsScreenUI = ({ route }) => {
  const { onUpdateLocation } = route.params;
  const [selectedLocation, setSelectedLocation] = useState(null);

  const handleMapClick = (event) => {
    const newLocation = {
      latitude: event.nativeEvent.coordinate.latitude,
      longitude: event.nativeEvent.coordinate.longitude,
    };

    setSelectedLocation(newLocation);
    onUpdateLocation(newLocation);
  };

  return (
    <View style={{ flex: 1 }}>
      <MapView
        style={{ flex: 1 }}
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        onPress={handleMapClick}
      >
        {selectedLocation && (
          <Marker coordinate={selectedLocation} />
        )}
      </MapView>
    </View>
  );
};

export default GoogleMapsScreenUI;
