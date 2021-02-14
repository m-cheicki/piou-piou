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

import Header from './Header';
import SelectFile from '../components/SelectFile';
import * as FileSystem from 'expo-file-system';


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
            console.log(base64)
            this.setState({ selectedDataSize: base64.length })
            this.setState({ base64Data: base64 })
            this.setState({ enableConvert: true })
        } else {
            console.log('Selected data is null')
            this.setState({ enableConvert: true })
        }
    }

    private _onConvertWithFreqShift = () => {
        this._onConvert('freq_shift')
    }

    private _onConvertWithPhaseShift = () => {
        this._onConvert('phase_shift')
    }

    private _onConvert = (audioType: string) => {
        const base64: string = this.state.base64Data
        console.log('Start converting', base64)
        if (base64) {
            console.log('Converting base64 to data array')
            let bytes: number[] = []

            for (let i = 0; i < base64.length; i++) {
                const char: string = base64[i]
                // const val: number = Base64.keyStr.indexOf(char)
                // bytes.push(val)
            }

            console.log('Generating audio')
            this._generateAudio(bytes, audioType)
        }
    }

    private _generateAudio = (bytes: number[], audioType: string) => {
        switch (audioType) {
            case 'phase_shift':
                console.log('-> phase shift')
                this._generatePhaseShiftAudio(bytes)
                break;
            case 'freq_shift':
                console.log('-> frequency shift')
                this._generateFrequencyShiftAudio(bytes)
                break;
            default:
                alert("Audio type not known")
                break;
        }
    }

    private _generateFrequencyShiftAudio = (bytes: number[]) => {
        const phaseShift: number = 0
        const amplitude: number = 90
        const freqRange = 18000 - 100

        // const wb: WaveBuilder = new WaveBuilder(1, SampleRateType.RATE_44100, BitsPerSampleType.BIT_8)
        // let notes: Wave[] = []


        for (let i = 0; i < bytes.length; i++) {
            const val = bytes[i]
            const freq: number = val * (freqRange / 64) + 100
            // const note = wb.generatePeriod(freq, phaseShift, amplitude)
            // notes.push(note)
        }

        console.log('Generating sound')
        // const wave = WAVEncoder.generateSound(notes)
        // this._createAudioFile(wave)
    }

    private _generatePhaseShiftAudio = (bytes: number[]) => {
        console.log('Converting data array into binary array')
        let binary: number[] = []
        for (let i = 0; i < bytes.length; i++) {
            const val = bytes[i]
            //binary.push(...BitSeparator.split(val, 1, 6))
        }

        // const wb: WaveBuilder = new WaveBuilder(1, SampleRateType.RATE_44100, BitsPerSampleType.BIT_8)
        // let notes: Wave[] = []

        const freq: number = 523.25
        const amplitude: number = 90

        console.log('Converting data into binary array')
        for (let i = 0; i < binary.length; i++) {
            const phase: number = binary[i] == 0 ? 0 : Math.PI
            // const note = wb.generatePeriod(freq, phase, amplitude)
            // notes.push(note)
        }

        // console.log(notes.length)

        console.log('Generating sound')
        // const wave = WAVEncoder.generateSound(notes)
        // this._createAudioFile(wave)
    }

    /*
    private _createAudioFile = async (wave: WAVEncoderResult) => {
        if (wave.isCorrect) {
            console.log('Generating audio file')

            const data = Uint8Array.from(wave.data)

            // converting data into a string
            let str: string = ''
            for (let i = 0; i < data.length; i++) {
                const val = data[i]
                const char: string = String.fromCharCode(val)
                str += char
            }

            // convert to base64
            const base64Content: string = Base64.encode(str)

            let fileDirectory: string = FileSystem.documentDirectory + this.dataStorageDirectory
            const currentDate = new Date().toJSON().replace(/[:.]/g, '_')
            let fileUri = fileDirectory + "sound_" + currentDate + ".wav"

            try {
                const info = await FileSystem.getInfoAsync(fileDirectory)

                if (!info.exists) {
                    await FileSystem.makeDirectoryAsync(fileDirectory)
                }

                await FileSystem.writeAsStringAsync(fileUri, base64Content, { encoding: 'base64' })
                await this._getFileInStorage()
            } catch (error) {
                console.log(error)
            }
        }
    }
*/
    private _onDeleteFile = async () => {
        await this._getFileInStorage()
    }

    render = () => {
        return (
            <SafeAreaView style={[containers.container]}>

                <Header />

                <View style={[containers.container, containers.sendFile]} >
                    <Text style={[text.mainActionTitle, text.blueText]}>Send a file</Text>
                    <SelectFile onSelectData={this._onSelectData}/>
                    <Text>Data length : {this.state.selectedDataSize} caracters</Text>
                </View>
            
                <View style={[containers.container, containers.playButtonContainer]} >
                    <TouchableOpacity style={[buttons.play, styles.border]}>
                        <Ionicons name="md-play" size={75} color={colors.yellow} />
                    </TouchableOpacity>
                </View>

                <View style={[containers.container, containers.receiveFile]} >
                    <TouchableOpacity style={[buttons.button, styles.border]} onPress={() => this.props.navigation.navigate('ReceiveFile')}>
                        <Text style={[text.button, text.salmonText]}>Receive a file</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        )
    }
}