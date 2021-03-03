import React, { Component } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { Ionicons } from '@expo/vector-icons';

import Shadow from "shadows-rn"; 
import {
    colors, 
  buttons,
    containers,
  shadows, 
  styles, 
    text, 
} from '../resources/css/style';



export default class PlayButton extends Component{
    public render = () => {
        return (
            <View style={[containers.container, containers.playButtonContainer]} >
                <TouchableOpacity style={[buttons.play]}>
                    <Shadow
                        style={{
                            backgroundColor: colors.black,
                            width: 125,
                            height: 125,
                            borderRadius: 100,
                        }}
                        shadows={[shadows.light, shadows.dark]}
                        inset={false}
                    >
                        <View style={[styles.border]}>
                            <Ionicons name="md-play" size={75} color={colors.yellow} />
                        </View>
                    </Shadow>
                </TouchableOpacity>
            </View>
        )
    }
}
