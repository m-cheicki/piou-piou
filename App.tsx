import React, { Component } from 'react';
import {ActivityIndicator } from 'react-native';
import SendFile from "./app/views/SendFile"; 
import ReceiveFile from "./app/views/ReceiveFile"; 
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as Font from "expo-font";

const Stack = createStackNavigator();

export default class App extends Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      fontLoaded : false
    }
  }

  async componentDidMount() {
    await Font.loadAsync({
      'Montserrat' : require('./assets/fonts/Montserrat_400Regular.ttf'), 
      'Montserrat Medium' : require('./assets/fonts/Montserrat_500Medium.ttf'), 
      'Montserrat Bold' : require('./assets/fonts/Montserrat_600SemiBold.ttf'), 
      'Open Sans' : require('./assets/fonts/OpenSans_400Regular.ttf'), 
    })
    this.setState({ fontLoaded: true })
  }

  render = () => {
    let isLoaded = this.state.fontLoaded
    return (
      isLoaded ? (
        <NavigationContainer >
          <Stack.Navigator initialRouteName="SendFile" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="SendFile" component={SendFile} />
            <Stack.Screen name="ReceiveFile" component={ReceiveFile} />
          </Stack.Navigator>
        </NavigationContainer>
      ):(
        <ActivityIndicator size="large" />
      )
    )
  }
}

