import React, { Component } from 'react'; 
import { Ionicons } from '@expo/vector-icons';
import {
    colors, 
  buttons,
    containers,
  shadows,
  styles, 
    text, 
} from '../resources/css/style';
import {
  Text,
  View,
  SafeAreaView,
  TouchableOpacity
} from 'react-native';

import Header from './Header';
import PlayButton from '../components/PlayButton'; 
import Shadow from "shadows-rn"; 




export default class ReceiveFile extends Component<any, any> {

    constructor (props: any) {
        super(props)
        this.state = {
            redirect: 'SendFile', 
            buttonText : 'Send a file'
        }
    }

    render = () => {
        return (
            <SafeAreaView style={[containers.container]}>
                <Header />

                <View style={[containers.container, containers.receiveFile]} >
                    <Text style={[text.mainActionTitle, text.salmonText]}>Receive a file</Text>
                </View>

                <PlayButton />


                <View style={[containers.container, containers.receiveFile]} >
                    <TouchableOpacity style={[buttons.button, styles.border]} onPress={() => this.props.navigation.navigate(this.state.redirect)}>
                        <Text style={[text.blueText, text.button]}>{this.state.buttonText}</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        )
    }
}