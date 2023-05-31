import React, { useState } from 'react';

export const LocationContext = React.createContext({
  location: null,
  setLocation: () => {},
});
