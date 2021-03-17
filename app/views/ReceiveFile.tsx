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
import { SoundRecorder } from "../helpers/soundRecorder";



export default class ReceiveFile extends Component<any, any> {

    constructor (props: any) {
        super(props)

        this.state = {
            isRecording: false,
            disableButton: false
        }

        SoundRecorder.init()
    }

    public toggleRecord = () => {
        this.setState({ disableButton: true })

        if (this.state.isRecording) {
            
            this.stopRecording()
        } else {
            this.startRecording()
        }
    }

    private startRecording = async () => {
        console.log('Recording started')
        this.setState({ isRecording: true })
        this.setState({ disableButton: false })

        SoundRecorder.start(null)
    }

    private stopRecording = async () => {
        console.log('Recording stopped')
        this.setState({ isRecording: false })
        this.setState({ disableButton: false })

        const uri = await SoundRecorder.stop()

        if (uri && this.props.onStop) {
            this.props.onStop(uri)
        }
    }


    render = () => {

        let info

        if (this.state.isRecording) {
            info = <Text>It is recording. Press another time to stop recording</Text>
        }

        return (
            <SafeAreaView style={[containers.container]}>
                <Header />

                <View style={[containers.container, containers.receiveFile]} >
                    <Text style={[text.mainActionTitle, text.salmonText]}>Receive a file</Text>
                </View>

                <View style={[containers.container, containers.receiveFile]} >
                    {info}
                </View>

                <PlayButton disabled={this.state.isRecording} onPress={() => this.toggleRecord()}/>
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