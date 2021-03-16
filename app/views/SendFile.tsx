import React, { Component } from 'react';
import {SafeAreaView, Text, TouchableOpacity, View } from 'react-native';
import * as FileSystem from 'expo-file-system';
import Shadow from "shadows-rn";

import * as fs from 'fs';
import { Base64 } from '../helpers/base64';
import { BitSeparator } from '../helpers/bitSeparator';
import { SignalBuilder } from '../helpers/signalBuilder';
import { concat, linspace, normalize } from '../helpers/tools';
import { WAV } from '../helpers/wav';

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

    private _onConvert = (audioType: string) => {
        const base64: string = this.state.base64Data
        console.log('Start converting', base64)
        if (base64) {
            console.log('Converting base64 to data array')
            let bytes: number[] = []

            for (let i = 0; i < base64.length; i++) {
                const char: string = base64[i]
                const val: number = Base64.keyStr.indexOf(char)
                bytes.push(val)
            }

            console.log('Generating audio')
            // this._generateAudio(bytes, audioType)
        }
    }

    
    private _onDeleteFile = async () => {
        await this._getFileInStorage()
    }

    render = () => {
        let datasize
        let playButton

        if (this.state.selectedDataSize > 0 ) {
            datasize = <Text>Data length : {this.state.selectedDataSize} caracters</Text>
            playButton = <PlayButton disabled={false}/>
        }
        else {
            playButton = <PlayButton disabled={true}/>
        }

        return (
            <SafeAreaView style={[containers.container]}>

                <Header />

                <View style={[containers.container, containers.sendFile]} >
                    <Text style={[text.mainActionTitle, text.blueText]}>Send a file</Text>
                    <SelectFile onSelectData={this._onSelectData} />
                    {datasize}
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