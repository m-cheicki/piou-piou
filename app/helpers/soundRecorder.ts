import { Audio } from 'expo-av';
import * as Permissions from "expo-permissions";
import { SoundStorage } from './soundStorage';

export const RECORDING_OPTIONS_PRESET_HIGH_QUALITY: Audio.RecordingOptions = {
    android: {
        extension: '.3gp',
        outputFormat: Audio.RECORDING_OPTION_ANDROID_OUTPUT_FORMAT_DEFAULT,
        audioEncoder: Audio.RECORDING_OPTION_ANDROID_AUDIO_ENCODER_DEFAULT,
        sampleRate: 44100,
        numberOfChannels: 1,
        bitRate: 128000,
    },
    ios: {
        extension: '.wav',
        audioQuality: Audio.RECORDING_OPTION_IOS_AUDIO_QUALITY_MAX,
        outputFormat: Audio.RECORDING_OPTION_IOS_OUTPUT_FORMAT_LINEARPCM,
        sampleRate: 44100,
        numberOfChannels: 1,
        bitRate: 128000,
        linearPCMBitDepth: 16,
        linearPCMIsBigEndian: false,
        linearPCMIsFloat: false,
    },
};

export class SoundRecorder {
    private static _recorderPermissions: boolean = false
    private static _recorderMode: Partial<Audio.AudioMode> | null = null
    private static _recorderOption: Audio.RecordingOptions | null = null
    private static _recorder: Audio.Recording | null = null
    private static _inited: boolean = false

    public static init = () => {
        if (!SoundRecorder._inited) {
            SoundRecorder._recorderPermissions = false
            SoundRecorder._recorderMode = null
            SoundRecorder._recorderOption = null

            SoundRecorder.setupRecorder()
            SoundRecorder.resetRecording()
            SoundRecorder.askPermission()

            SoundRecorder._inited = true
        }
    }

    private static setupRecorder = () => {
        SoundRecorder._recorderMode = {
            allowsRecordingIOS: true,
            interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
            playsInSilentModeIOS: true,
            shouldDuckAndroid: true,
            interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
            playThroughEarpieceAndroid: false,
            staysActiveInBackground: false,
        }

        SoundRecorder._recorderOption = RECORDING_OPTIONS_PRESET_HIGH_QUALITY
    }

    private static resetRecording = async () => {
        if (SoundRecorder._recorder) {
            const status = await SoundRecorder._recorder.getStatusAsync()
            if (!status.isRecording) {
                SoundRecorder._recorder.setOnRecordingStatusUpdate(null)
                SoundRecorder._recorder = null
            } else {
                console.warn('Cannot reset the recording yet. It is still working')
            }
        }
    }

    public static askPermission = async () => {
        const response = await Permissions.askAsync(Permissions.AUDIO_RECORDING)
        SoundRecorder._recorderPermissions = response.status === "granted"
    }

    public static start = async (statusUpdate: ((status: Audio.RecordingStatus) => void) | null) => {
        if (!SoundRecorder._recorder) {
            if (SoundRecorder._recorderPermissions && SoundRecorder._recorderMode && SoundRecorder._recorderOption) {
                await Audio.setAudioModeAsync(SoundRecorder._recorderMode)
                SoundRecorder._recorder = new Audio.Recording()
                try {
                    await SoundRecorder._recorder.prepareToRecordAsync(SoundRecorder._recorderOption)
                    SoundRecorder._recorder.setOnRecordingStatusUpdate(statusUpdate)
                    await SoundRecorder._recorder.startAsync()
                } catch (error) {
                    console.error('Error during recording', error)
                    await SoundRecorder.resetRecording()
                }
            }
        } else {
            console.warn('Cannot start recording. The main recorder is working')
        }
    }

    public static stop = async () => {
        if (SoundRecorder._recorder) {
            await SoundRecorder._recorder.stopAndUnloadAsync()
            let recordURI = SoundRecorder._recorder.getURI()
            await SoundRecorder.resetRecording()

            if (recordURI) {
                recordURI = await SoundStorage.move(recordURI)
            }

            return recordURI
        } else {
            console.warn('Cannot stop the recording because it has no been started yet')
        }
    }
}