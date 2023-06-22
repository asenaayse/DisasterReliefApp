import React from 'react';
import { View, Text } from 'react-native';

const ProfileScreen = ({ route }) => {
  const { userId } = route.params;

  return (
    <View>
      <Text>Profile Page</Text>
      <Text>User ID: {userId}</Text>
      {/* Add more profile details */}
    </View>
  );
};

export default ProfileScreen;
