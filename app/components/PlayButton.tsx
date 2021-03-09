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


export interface PlayButtonState {
    disabled?: (isDisabled: string) => void, 
}

export default class PlayButton extends Component<PlayButtonState>{

    public constructor(props: PlayButtonState) {
        super(props)
        this.state = {}
    }


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
                        <View style={[containers.playButtonIcon]}>
                            <Ionicons name="md-play" size={70} color={colors.yellow} style={{opacity: .5}} />
                        </View>
                    </Shadow>
                </TouchableOpacity>
                <Text>{this.props.disabled}</Text>
            </View>
        )
    }
}
