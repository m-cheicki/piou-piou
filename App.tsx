import React, {Component} from 'react';
import SendFile from "./app/views/SendFile"; 
import ReceiveFile from "./app/views/ReceiveFile"; 
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';


const Stack = createStackNavigator();

export default class App extends Component<any, any> {

  public test() {
    console.info("Application Launched"); 
  }

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

