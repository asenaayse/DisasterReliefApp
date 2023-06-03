import React from 'react';
import { Platform } from 'react-native';

import GoogleMapsScreenUIWeb from './GoogleMapsScreenUI.web';
import GoogleMapsScreenUINative from './GoogleMapsScreenUI.native';

const GoogleMapsScreenUI = ({ location }) => {
  
  if (Platform.OS === 'web') {
    return <GoogleMapsScreenUIWeb location={location} />;
  } else {
    return <GoogleMapsScreenUINative route={route} />;
  }
};

export default GoogleMapsScreenUI;
