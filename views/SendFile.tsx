import React, { Component } from 'react'; 
import {
  buttons,
  containers,
  styles, 
  text
} from '../resources/css/style';

import {
  Text,
  View,
  SafeAreaView,
  TouchableOpacity
} from 'react-native';
import Header  from './Header';

export default function SendFile({navigation}: {navigation: any}){
    return (
        <SafeAreaView style={[containers.container]}>

            <Header />

            <View style={[containers.container, containers.sendFile]} >
                <Text style={[text.mainActionTitle, text.blueText]}>Send a file</Text>
                <TouchableOpacity>
                    <Text style={[buttons.chooseFile, styles.border]}></Text>
                </TouchableOpacity>
            </View>
            
            <View style={[containers.container, containers.playButtonContainer]} >
                <TouchableOpacity style={[buttons.play]}>
                    <Text style={styles.playIcon}></Text>
                </TouchableOpacity>

            </View>

            <View style={[containers.container, containers.receiveFile]} >
                <TouchableOpacity style={[buttons.button]} onPress={() => navigation.navigate('ReceiveFile')}>
                    <Text style={[text.button, text.salmonText, styles.border]}>Receive a file</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}