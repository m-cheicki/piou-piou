import React from 'react';
import SendFile from "./views/SendFile"; 
import ReceiveFile from "./views/ReceiveFile"; 
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();
export default function App() {
  return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="SendFile">
          <Stack.Screen name="SendFile" component={SendFile} />
          <Stack.Screen name="ReceiveFile" component={ReceiveFile} />
        </Stack.Navigator>
      </NavigationContainer>
  );
}

