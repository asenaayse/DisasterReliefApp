import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import WelcomeScreen from './screens/WelcomeScreen/WelcomeScreen';
import LoginScreen from './screens/LoginScreen/LoginScreen';
import HomeScreen from './screens/HomeScreen/HomeScreen';
import GoogleMapsScreen from './screens/GoogleMapsScreen/GoogleMapsScreen';

// colors from: https://colordesigner.io/#FFD600-3C691C-ff6d1f-D8D2DD-1c1d21

const Stack = createNativeStackNavigator();


export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
      <Stack.Screen options={{ headerShown: false }} name="Welcome" 
      component={WelcomeScreen} />
     <Stack.Screen name="Login" component={LoginScreen} />
     <Stack.Screen name="Home" component={HomeScreen} />
     <Stack.Screen name="Map" component={GoogleMapsScreen}/>
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