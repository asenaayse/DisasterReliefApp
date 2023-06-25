import React from 'react';
import { View, Text } from 'react-native';

const ProfileScreen = ({ route }) => {
  const { userData } = route.params;

  return (
    <View>
      <Text>Profile Page</Text>
      <Text>Contact : {userData.contact}</Text>
      
      {/* Add more profile details */}
    </View>
  );
};

export default ProfileScreen;