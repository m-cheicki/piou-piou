import React, {Component} from 'react';
import SendFile from "./app/views/SendFile"; 
import ReceiveFile from "./app/views/ReceiveFile"; 
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useFonts, Montserrat_400Regular } from '@expo-google-fonts/montserrat';


const Stack = createStackNavigator();

export default class App extends Component<any, any> {

  render = () => {
    return (
      <NavigationContainer >
          <Stack.Navigator initialRouteName="SendFile" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="SendFile" component={SendFile} />
            <Stack.Screen name="ReceiveFile" component={ReceiveFile} />
          </Stack.Navigator>
        </NavigationContainer>
    )
  }
}

