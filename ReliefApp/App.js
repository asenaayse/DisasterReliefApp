import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import WelcomeScreen from './screens/WelcomeScreen/WelcomeScreen';
import LoginScreen from './screens/LoginScreen/LoginScreen';
import SignUpScreen from './screens/SignUpScreen/SignUpScreen';
import HomeScreen from './screens/HomeScreen/HomeScreen';
import GoogleMapsScreen from './screens/GoogleMapsScreen/GoogleMapsScreen';
import RequestedItemsScreen from './screens/RequestedItemsScreen';
import AvailableItemsScreen from './screens/AvailableItemsScreen';
import UserScreen from './screens/UserScreen';
import MapScreen from './screens/MapScreen';
import PersonalScreen from './screens/PersonalScreen';
import DistributorScreen from './screens/DistributorScreen';
import ChatScreen from './screens/ChatScreen';
import MessageListScreen from './screens/MessageListScreen';


// colors from: https://colordesigner.io/#FFD600-3C691C-ff6d1f-D8D2DD-1c1d21

const Stack = createNativeStackNavigator(); 


export default function App() { 
  return (
    <NavigationContainer>
      <Stack.Navigator>
      <Stack.Screen options={{ headerShown: false }} name="Welcome" 
      component={WelcomeScreen} />
     <Stack.Screen options={{ headerShown: false }} name="Login" component={LoginScreen} />
     <Stack.Screen options={{ headerShown: false }} name="SignUpScreen" component={SignUpScreen} />
     <Stack.Screen options={{ headerShown: false }} name="Home" component={HomeScreen} />
     <Stack.Screen name="Map"component={GoogleMapsScreen}/> 
     <Stack.Screen name="Requested Items" component={RequestedItemsScreen} />
     <Stack.Screen name="Available Items" component={AvailableItemsScreen} />
     <Stack.Screen name="User" component={UserScreen} />
     <Stack.Screen name="Mark" component={MapScreen} />
     <Stack.Screen name="Personal" component={PersonalScreen} />
     <Stack.Screen name="Distributor" component={DistributorScreen} />
     <Stack.Screen name="Message" component={ChatScreen} />
     <Stack.Screen name="MessageList" component={MessageListScreen} />


      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});