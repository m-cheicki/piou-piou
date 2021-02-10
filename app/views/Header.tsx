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
            <Image source={typo} style={{ width: 150, height: 75}} />
            {/*
            <Text style={[text.title]}>PIOU PIOU   dsdsd</Text>
                <TouchableOpacity>
                <Text style={[buttons.settings, styles.border]}></Text>
            </TouchableOpacity> */}
        </View>
    )
}
