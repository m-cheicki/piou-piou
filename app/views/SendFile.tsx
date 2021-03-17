import React, { Component } from 'react';
import {SafeAreaView, Text, TouchableOpacity, View } from 'react-native';
import * as FileSystem from 'expo-file-system';
import Shadow from "shadows-rn";

import * as fs from 'react-native-fs';
import { Base64 } from '../helpers/base64';
import { BitSeparator } from '../helpers/bitSeparator';
import { SignalBuilder } from '../helpers/signalBuilder';
import { concat, linspace, normalize } from '../helpers/tools';
import { WAV } from '../helpers/WAV';
import createBuffer from "audio-buffer-from"; 
import toWav from "audiobuffer-to-wav"; 

import Header from './Header';
import PlayButton from '../components/PlayButton'; 
import SelectFile from '../components/SelectFile';

import { containers, shadows, text } from '../resources/css/style';


export default class SendFile extends Component<any, any> {
    private readonly dataStorageDirectory: string = "data/"

    public constructor(props: any) {
        super(props)

        this.state = {
            title: 'Piou Piou',
            soundFiles: [],
            enableConvert: false,
            base64Data: null,
            selectedDataSize: 0, 
        }

        this._getFileInStorage()
    }

    private _getFileInStorage = async () => {
        try {
            const directory: string = FileSystem.documentDirectory + this.dataStorageDirectory

            const info = await FileSystem.getInfoAsync(directory)

            if (!info.exists) {
                await FileSystem.makeDirectoryAsync(directory)
            }

            let files = await FileSystem.readDirectoryAsync(directory)

            for (let i = 0; i < files.length; i++) {
                files[i] = directory + files[i]
            }

            this.setState({ soundFiles: files })
        } catch (error) {
            console.error(error)
        }
    }

    private _onSelectData = (base64: string) => {
        if (base64) {
            console.log("BASE64 Length : " + base64.length)
            this.setState({ selectedDataSize: base64.length })
            this.setState({ base64Data: base64 })
            this.setState({ enableConvert: true })
        } else {
            console.log('Selected data is null')
            this.setState({ enableConvert: true })
        }
    }
    
    private _encode_base64_to_signal = (base64: string, sample_rate: number, bloc_duration: number) => {
        const base64_values: number[] = Base64.base64_to_array(base64)

        const freqs: number[] = linspace(100, 600, 6)
        const freq_porteuse = 50
        const amp: number = 90

        let signal: number[] = []

        for (let i = 0; i < base64_values.length; i++) {
            const val = base64_values[i]
            const binary_arr: number[] = BitSeparator.split(val, 1, 6)

            let bloc_signal: number[] = SignalBuilder.generateSignal(freq_porteuse, 0, bloc_duration, sample_rate, amp)

            for (let j = 0; j < freqs.length; j++) {
                if (binary_arr[j] != 0) {
                    const freq: number = freqs[j]
                    const freq_i_signal: number[] = SignalBuilder.generateSignal(freq, 0, bloc_duration, sample_rate, amp)
                    bloc_signal = concat(bloc_signal, freq_i_signal)
                }
            }

            bloc_signal = normalize(bloc_signal, amp)
            signal = [...signal, ...bloc_signal]
        }

        return signal
    }

    /** TODO : enregistrer le signal sonore dans un wav file */
    public encode = (message: string) => {
        const SAMPLE_RATE = 44100
        const BLOC_DURATION = 0.2
        const BIT_PER_SAMPLE = 16

        const message_b64: string = Base64.encode(message)
        const signal: number[] = this._encode_base64_to_signal(message_b64, SAMPLE_RATE, BLOC_DURATION)

        const sound = WAV.encode(signal, 1, SAMPLE_RATE, BIT_PER_SAMPLE)

    }

    private _onConvert = () => {
        const base64: string = this.state.base64Data
        
        if (base64) {
            console.log('Start converting : ', base64.length)
            this.encode(base64)
        }
    }

    private _onDeleteFile = async () => {
        await this._getFileInStorage()
    }

    render = () => {
        let playButton

        if (this.state.selectedDataSize > 0 ) {
            playButton = <PlayButton disabled={false} onPress={() => this._onConvert()}/>
        }
        else {
            playButton = <PlayButton disabled={true} onPress={() => console.log("You haven't chosen a file")}/>
        }

        return (
            <SafeAreaView style={[containers.container]}>

                <Header />

                <View style={[containers.container, containers.sendFile]} >
                    <Text style={[text.mainActionTitle, text.blueText]}>Send a file</Text>
                    <SelectFile onSelectData={this._onSelectData} />
                </View>
            
                {playButton}

                <View style={[containers.container, containers.receiveFile]} >
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('ReceiveFile')}>
                        <Shadow style={[containers.button]}
                            shadows = {[shadows.light, shadows.dark]}
                            inset = {false}
                        >
                            <View style={[containers.receiveFile]} >
                                <Text style={[text.button, text.salmonText]}>Receive a file</Text>
                            </View>
                        </Shadow>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        )
    }
}