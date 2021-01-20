import React, { Component } from "react";
import {
  Text,
  View,
  SafeAreaView,
  TouchableOpacity
} from 'react-native';
import {
  buttons,
  containers,
  styles
} from '../resources/css/style';


export default class Header extends Component{
    render() {
        return(
            <div>
                <View style={[containers.container, containers.header]} >
                    <Text style={[styles.title]}>PIOU - PIOU</Text>
                    <TouchableOpacity>
                    <Text style={[buttons.settings, styles.border]}></Text>
                    </TouchableOpacity>
                </View>

                <View style={[containers.container, containers.sendFile]} >
                    <Text style={[styles.sendFileTitle]}>Choose a file</Text>
                    <TouchableOpacity>
                    <Text style={[buttons.chooseFile, styles.border]}></Text>
                    </TouchableOpacity>
                </View>
            </div>
        )
    }
}