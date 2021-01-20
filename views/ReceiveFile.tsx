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

export default function ReceiveFile({navigation}: {navigation: any}){
    return (
        <SafeAreaView style={[containers.container]}>
            <View style={[containers.container, containers.header]} >
                <Text style={[text.title]}>PIOU PIOU</Text>
                {/* <TouchableOpacity>
                    <Text style={[buttons.settings, styles.border]}></Text>
                </TouchableOpacity> */}
            </View>

            <View style={[containers.container, containers.sendFile]} >
                <Text style={[text.mainActionTitle, text.salmonText]}>Receive a file</Text>
            </View>

            <View style={[containers.container, containers.playButtonContainer]} >
                <TouchableOpacity style={[buttons.play]}>
                    <Text style={styles.playIcon}></Text>
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