import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Waiting from './screens/Waiting';
import Home from './screens/Home';



const Stack = createNativeStackNavigator();

// options={{gestureEnabled: false}}
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Waiting" component={Waiting}  />
         <Stack.Screen name="Home" component={Home}  />
        {/* <Stack.Screen name="Login" component={Login}  />

        <Stack.Screen name="TabNavigator" component={TabNavigator} />  */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
