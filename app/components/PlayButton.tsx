import React, { Component } from "react";
import { TouchableOpacity, View } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import Shadow from "shadows-rn";

import { colors, buttons, containers, shadows } from '../resources/css/style';

export interface PlayButtonState {
    disabled: boolean,
    onPress?: () => void, 
    onStop?: (file: string) => void
}

export default class PlayButton extends Component<PlayButtonState>{

    public constructor(props: PlayButtonState) {
        super(props)
        this.state = {}
    }

    public render = () => {

        let playButton
        
        if (this.props.disabled) {
            playButton =
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
        }
        else {
            playButton =
                <Shadow
                    style={{
                        backgroundColor: colors.yellow,
                        width: 125,
                        height: 125,
                        borderRadius: 100,
                    }}
                    shadows={[shadows.light, shadows.dark]}
                    inset={false}
                >
                    <View style={[containers.playButtonIcon]}>
                        <Ionicons name="md-play" size={70} color={colors.white} />
                    </View>
                </Shadow>
        }


        return (
            <View style={[containers.container, containers.playButtonContainer]} >
                <TouchableOpacity style={[buttons.play]} onPress={this.props.onPress}>
                    {playButton}
                </TouchableOpacity>
            </View>
        )
    }
}
