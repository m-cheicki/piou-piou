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

                <View style={[containers.container, containers.playButtonContainer]} >
                    <TouchableOpacity style={[buttons.play, styles.border]}>
                        <Ionicons name="md-play" size={75} color={colors.yellow} />
                    </TouchableOpacity>
                </View>


                <View style={[containers.container, containers.receiveFile]} >
                    <TouchableOpacity style={[buttons.button]} onPress={() => this.props.navigation.navigate('SendFile')}>
                        <Text style={[text.button, text.blueText, styles.border]}>Send a file</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        )
    }
}