import React, { Component } from 'react'; 
import Shadow from "shadows-rn"; 

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


export default class ReceiveFile extends Component<any, any> {

    constructor (props: any) {
        super(props)
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
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('SendFile')}>
                        <Shadow style={[containers.button]}
                            shadows = {[shadows.light, shadows.dark]}
                            inset = {false}
                        >
                            <View style={[containers.receiveFile]} >
                                <Text style={[text.button, text.blueText]}>Send a file</Text>
                            </View>
                        </Shadow>
                    </TouchableOpacity>
                </View>

            </SafeAreaView>
        )
    }
}