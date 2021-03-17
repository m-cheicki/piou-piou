import React from "react";
import { View, Image } from 'react-native';
import { containers } from '../resources/css/style';

import typo from '../resources/images/typo.png'; 

export default function Header(){
    return(
        <View style={[containers.container, containers.header]} >
            <Image source={typo} style={{ width: 128, height: 64, top: 12}} />
        </View>
    )
}
