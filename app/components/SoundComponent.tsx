import React, { Component } from "react";
import { Alert, Button, Text, View } from "react-native";
import Spinner from "react-native-loading-spinner-overlay";
import { Complex } from "../helpers/complex";
import { FFT } from "../helpers/ftt";
import { SoundPlayer } from "../helpers/soundPlayer";
import { SoundStorage } from "../helpers/soundStorage";
import { linspace, stdArr } from "../helpers/tools";
import { Statistic } from '../helpers/statistic';
import { WAV } from "../helpers/WAV";
import { colors } from "../resources/css/style";

export interface SoundProps {
    file: string,
    onDelete?: (file: string) => void
}

export interface SoundState {
    file?: string,
    disableAction: boolean
}

export default class SoundComponent extends Component<SoundProps, SoundState> {

    public constructor(props: SoundProps) {
        super(props)

        this.state = {
            file: 'loading file...',
            disableAction: false
        }
    }

    public componentDidMount = () => {
        this.readFile()
    }

    private readFile = async () => {
        const fileUri: string = this.props.file
        const filename: string | undefined = fileUri.split('/').pop()

        this.setState({ file: filename })
    }

    private play = async () => {
        await SoundPlayer.play(this.props.file)
    }

    private delete = async () => {
        if (this.props.onDelete)
            this.props.onDelete(this.props.file)
    }

    private getFreq = (signal: number[], sampleRate: number) => {
        let fft_result = FFT.transform(signal)
        let signalRe: number[] = fft_result[0]
        let signalIm: number[] = fft_result[1]

        let c: Complex[] = Complex.zip(signalRe, signalIm)

        const N_SAMPLE = signal.length

        const frequencies: number[] = linspace(0, sampleRate, N_SAMPLE).slice(0, N_SAMPLE / 2)
        let magnitudes: number[] = c.map(x => (x.Magnitude / N_SAMPLE) * 2).slice(0, N_SAMPLE / 2)
        magnitudes[0] /= 2

        const max = Statistic.max(magnitudes)
        let freq: number[] = []

        for (let i = 0; i < magnitudes.length; i++) {
            if (magnitudes[i] > (max / 2)) {
                const val = frequencies[i]
                const index = freq.findIndex(x => x >= val - 5 && x <= val + 5)
                if (index == -1)
                    freq.push(val)
                else
                    freq[index] = (freq[index] + val) / 2
            }
        }

        return freq.map(x => Math.floor(x))
    }

    private decode = async () => {
        this.setState({ disableAction: true })

        const bytes = await SoundStorage.read(this.props.file)
        const wav = WAV.decode(bytes)
        console.log('wav', wav)

        if (wav) {
            const fmt = wav.subChunks?.filter(x => x.chunkID == 'fmt ')
            const data = wav.subChunks?.filter(x => x.chunkID == 'data')

            if (data && data.length > 0 && fmt && fmt.length > 0) {
                const fmtChunk = fmt[0]
                const dataChunk = data[0]
                const dataContent = dataChunk.chunkContent?.data as any[]

                const sampleRate = (fmtChunk.chunkContent?.sampleRate ?? 0) as number

                if (dataContent) {
                    const signal = dataContent.map(x => x.ch_1)
                    const freq = this.getFreq(signal, sampleRate)
                    console.log('FFT result', freq)
                    setTimeout(() => {
                        Alert.alert('FFT result', freq.join('\n'))
                    }, 300)
                }
            }
        }
        this.setState({ disableAction: false })
    }

    public render = () => {
        return (
            <View>
                <Text style={{marginVertical:12}}>{this.state.file}</Text>
                <View style={{flex:1, flexDirection: 'row', justifyContent: 'space-evenly'}}>
                    <Button onPress={this.play} title='Play' disabled={this.state.disableAction} color={colors.blue} />
                    <Button onPress={this.decode} title='Analyse' disabled={this.state.disableAction} color={colors.blue} />
                    <Button onPress={this.delete} title='Delete' disabled={this.state.disableAction} color={colors.blue} />
                </View>
                <Spinner visible={this.state.disableAction} textContent={'Loading...'} />
            </View>
        )
    }
}