import { BitSeparator } from "./bitSeparator"

/**
 * Type of channel
 */
export enum ChannelType {
    MONO = 1,
    STEREO = 2
}

/**
 * Type of sample rate
 */
export enum SampleRateType {
    RATE_8000 = 8000,
    RATE_44100 = 44100,
    RATE_48000 = 48000,
    RATE_96000 = 96000
}

/**
 * Type of bits per sample
 */
export enum BitsPerSampleType {
    BIT_8 = 8,
    BIT_16 = 16
}

/**
 * Type of sound wave
 */
export enum SoundWaveType {
    SIN,
    COS,
    SQUARE,
}

/**
 * Result of a wave encoder
 */
export interface WAVEncoderResult {
    data: number[]
    bitsPerSample: BitsPerSampleType,
    numberOfSample: number,
    isCorrect: boolean
}

/**
 * Result of a generated wave data
 */
export interface Wave {
    data: number[],
    numChannel: number,
    sampleRate: number,
    bitsPerSample: number,
    byteRate: number,
    blockAlign: number
}

/**
 * Class that provide functions in order to genarate wave data
 */
export class WaveBuilder {
    private readonly _numChannels: number
    private readonly _sampleRate: number
    private readonly _bitsPerSample: number

    public get NumChannel(): number { return this._numChannels }
    public get SampleRate(): number { return this._sampleRate }
    public get BitsPerSample(): number { return this._bitsPerSample }
    public get ByteRate(): number { return this.SampleRate * this.NumChannel * (this.BitsPerSample / 8) }
    public get BlocAlign(): number { return this.NumChannel * (this.BitsPerSample / 8) }

    public constructor(
        numChannels: ChannelType = ChannelType.MONO,
        sampleRate: SampleRateType = SampleRateType.RATE_44100,
        bitsPerSample: BitsPerSampleType = BitsPerSampleType.BIT_8) {
        this._numChannels = (numChannels as number)
        this._sampleRate = (sampleRate as number)
        this._bitsPerSample = (bitsPerSample as number)
    }

    private _sinFormula = (w: number, t: number, phase: number = 0) => {
        return Math.sin((w * t) + phase)
    }

    private _cosFormula = (w: number, t: number, phase: number = 0) => {
        return Math.sin((w * t) + phase)
    }

    private _squareFormula = (w: number, t: number, phase: number = 0) => {
        return 0
    }

    /**
     * Generate sound data
     * @param frequency Frenquency of the sound
     * @param phase Phase
     * @param duration Duration of the sound in seconds
     * @param amplitude Amplitude of the sound on %
     * @param soundWaveType Type of sound wave
     */
    public generateData = (frequency: number, phase: number, duration: number, amplitude: number = 100, soundWaveType: SoundWaveType = SoundWaveType.SIN) => {
        const w: number = 2 * Math.PI * frequency
        const max_amplitude: number = Math.pow(2, (this.BitsPerSample - 1)) - 1
        let data: number[] = []

        amplitude = Math.min(amplitude, 100)
        amplitude = (amplitude * max_amplitude) / 100

        for (let i = 0; i < this.SampleRate * duration; i++) {
            const t: number = i * (1 / this.SampleRate)
            let value: number = 0

            switch (soundWaveType) {
                case SoundWaveType.COS:
                    value = amplitude * this._cosFormula(w, t, phase)
                    break;
                case SoundWaveType.SQUARE:
                    value = amplitude * this._squareFormula(w, t, phase)
                    break;
                default:
                    value = amplitude * this._sinFormula(w, t, phase)
                    break;
            }

            value += (max_amplitude * (this._bitsPerSample / 8))

            const integerValue: number = Math.round(value)
            const tmp: number[] = BitSeparator.split(integerValue, 8, this._bitsPerSample / 8)
            tmp.reverse()

            for (let j = 0; j < this.NumChannel; j++) {
                data.push(...tmp)
            }
        }

        const wave: Wave = {
            data: data,
            bitsPerSample: this.BitsPerSample,
            blockAlign: this.BlocAlign,
            byteRate: this.ByteRate,
            numChannel: this.NumChannel,
            sampleRate: this.SampleRate
        }

        return wave
    }

    /**
     * Generate sound data in one period of a frequency
     * @param frequency Frenquency of the sound
     * @param phase Phase
     * @param amplitude Amplitude of the sound on %
     * @param soundWaveType Type of sound wave
     */
    public generatePeriod = (frequency: number, phase: number, amplitude: number = 100, soundWaveType: SoundWaveType = SoundWaveType.SIN) => {
        const period: number = 1 / frequency
        return this.generateData(frequency, phase, period, amplitude, soundWaveType)
    }
}

/**
 * Class that provide functions to build a .wav's file data
 */
export class WAVEncoder {
    // chunk descriptor
    public static readonly CHUNK_ID: string = 'RIFF'
    public static readonly FORMAT: string = 'WAVE'

    // 'fmt ' sub-chunk
    public static readonly SUBCHUNK_1_ID: string = 'fmt '
    public static readonly AUDIO_FORMAT: number = 1

    // 'data' sub-chunk
    public static readonly SUBCHUNK_2_ID: string = 'data'

    public constructor() {
    }

    /**
     * Build .wav data
     * @param data wave data
     */
    public static generateSound = (data: Wave | Wave[]) => {
        let soundData: number[] = []
        let chunkSize: number = 0
        const subchunk1Size: number = 16
        let subchunk2Size: number = 0
        let bitsPerSample: number = 0
        let isDataCorrect: boolean = false
        let wavDataArray: Wave[] = []

        if (data) {
            if (!Array.isArray(data)) {
                wavDataArray = [data]
            } else {
                wavDataArray = [...data]
            }

            isDataCorrect = wavDataArray.every((val, i, arr) => {
                return val.bitsPerSample == arr[0].bitsPerSample && val.numChannel == arr[0].numChannel && val.sampleRate == arr[0].sampleRate
            })
        }

        let header: number[] = []

        if (isDataCorrect) {
            for (let i = 0; i < wavDataArray.length; i++) {
                for (let j = 0; j < wavDataArray[i].data.length; j++) {
                    soundData.push(wavDataArray[i].data[j])
                }
            }

            subchunk2Size = soundData.length * (wavDataArray[0].bitsPerSample / 8)

            chunkSize = 4 + (8 + subchunk1Size) + (8 + subchunk2Size)
            bitsPerSample = wavDataArray[0].bitsPerSample

            // build file data
            // -> chunk info
            // chunk ID (big-endian) - 4 bytes
            header.push(...BitSeparator.splitString(WAVEncoder.CHUNK_ID))
            // chunk size (litlle-endian) - 4 bytes
            header.push(...BitSeparator.split(chunkSize, 8, 4).reverse())
            // format (big-endian) - 4 bytes
            header.push(...BitSeparator.splitString(WAVEncoder.FORMAT))

            // -> sub chunk 1 info
            // sub chunk 1 ID (bif-endian) - 4 bytes
            header.push(...BitSeparator.splitString(WAVEncoder.SUBCHUNK_1_ID))
            // sub chunk 1 size (litlle-endian) - 4 bytes
            header.push(...BitSeparator.split(subchunk1Size, 8, 4).reverse())
            // audio format (litlle endian) - 2 bytes
            header.push(...BitSeparator.split(WAVEncoder.AUDIO_FORMAT, 8, 2).reverse())
            // number of channel (litlle endian) - 2 bytes
            header.push(...BitSeparator.split(wavDataArray[0].numChannel, 8, 2).reverse())
            // sample rate (litlle endian) - 4 bytes
            header.push(...BitSeparator.split(wavDataArray[0].sampleRate, 8, 4).reverse())
            // byterate (litlle endian) - 4 bytes
            header.push(...BitSeparator.split(wavDataArray[0].byteRate, 8, 4).reverse())
            // block align (little endian) - 2 bytes
            header.push(...BitSeparator.split(wavDataArray[0].blockAlign, 8, 2).reverse())
            // bits per sample (litlle endian) - 2 bytes
            header.push(...BitSeparator.split(bitsPerSample, 8, 2).reverse())

            // -> sub chunk 2
            // sub chunk 2 ID (big-endian) - 4 bytes
            header.push(...BitSeparator.splitString(WAVEncoder.SUBCHUNK_2_ID))
            // sub chunk 2 size (litlle endian) - 4 bytes
            header.push(...BitSeparator.split(subchunk2Size, 8, 4).reverse())
            // data (litlle endian) - subchunk2Size bytes
            // soundData
        } else {
            console.warn('Error : data is not correct')
        }

        let byteArray: number[] = [...header]

        for (let i = 0; i < soundData.length; i++) {
            byteArray.push(soundData[i])
        }

        const result: WAVEncoderResult = {
            data: byteArray,
            bitsPerSample: bitsPerSample,
            isCorrect: isDataCorrect,
            numberOfSample: subchunk2Size
        }

        return result
    }

}