import React, { Component } from 'react'; 
import { Ionicons } from '@expo/vector-icons';
import {
    colors, 
  buttons,
  containers,
  styles, 
    text, 
} from '../resources/css/style';
import {
  Text,
  View,
  SafeAreaView,
  TouchableOpacity
} from 'react-native';
import Header  from './Header';


export default function ReceiveFile({navigation}: {navigation: any}){
    return (
        <SafeAreaView style={[containers.container]}>
            <Header />

            <View style={[containers.container, containers.receiveFile]} >
                <Text style={[text.mainActionTitle, text.salmonText]}>Receive a file</Text>
            </View>

            <View style={[containers.container, containers.playButtonContainer]} >
                <TouchableOpacity style={[buttons.play]}>
                    <Ionicons name="md-play" size={75} color={colors.white} />
                </TouchableOpacity>

            </View>

            <View style={[containers.container, containers.receiveFile]} >
                <TouchableOpacity style={[buttons.button]} onPress={() => navigation.navigate('SendFile')}>
                    <Text style={[text.button, text.blueText, styles.border]}>Send a file</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}