import React, { Component } from "react";
import {
  Text,
  View,
SafeAreaView,
TouchableOpacity, 
  Image,
  LogBox
} from 'react-native';
import {
    colors,
  buttons,
  containers,
  styles, text
} from '../resources/css/style';

import typo from '../resources/images/typo.png'; 

export default function Header(){
    return(
        <View style={[containers.container, containers.header]} >
            <Image source={typo} style={{ width: 128, height: 64, top: 12}} />
        </View>
    )
}
