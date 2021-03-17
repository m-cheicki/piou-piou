import * as FileSystem from 'expo-file-system';
import { Base64 } from "./base64";
import { WAV } from './WAV';

export class SoundStorage {

    public static readonly DataStorageDir: string = 'data/'

    private static checkStorageDir = async () => {
        const dir: string = FileSystem.documentDirectory + SoundStorage.DataStorageDir
        const info = await FileSystem.getInfoAsync(dir)

        if (!info.exists) {
            await FileSystem.makeDirectoryAsync(dir)
        }
    }

    public static getFiles = async () => {
        await SoundStorage.checkStorageDir()

        const dir: string = FileSystem.documentDirectory + SoundStorage.DataStorageDir
        let files = await FileSystem.readDirectoryAsync(dir)
        files = files.filter((x: any) => x.match(/.wav|.3gp/))

        for (let i = 0; i < files.length; i++) {
            files[i] = dir + files[i]
        }

        return files
    }

    public static read = async (file: string) => {
        const content = await FileSystem.readAsStringAsync(file, { encoding: FileSystem.EncodingType.Base64 })
        const str = Base64.decode(content)

        let buffer: Uint8Array = new Uint8Array(str.length)

        for (let i = 0; i < str.length; i++) {
            buffer[i] = str.charCodeAt(i);
        }

        return buffer
    }

    public static move = async (uri: string) => {
        const filename: string | undefined = uri.split('/').pop()
        const newUri: string = FileSystem.documentDirectory + SoundStorage.DataStorageDir + filename
        await FileSystem.moveAsync({ from: uri, to: newUri })

        return newUri
    }

    public static save = async (signal: number[], nchannel: number, sampleRate: number, bitsPerSample: number) => {
        const bytes = WAV.encode(signal, nchannel, sampleRate, bitsPerSample)

        await SoundStorage.checkStorageDir()

        let str: string = ''
        for (let i = 0; i < bytes.length; i++) {
            const val = bytes[i]
            const char: string = String.fromCharCode(val)
            str += char
        }

        const base64Content: string = Base64.encode(str)

        const output_folder = FileSystem.documentDirectory + SoundStorage.DataStorageDir
        const currentDate = new Date().toJSON().replace(/[:.]/g, '_')
        const filename: string = output_folder + "sound_" + currentDate + ".wav"

        await FileSystem.writeAsStringAsync(filename, base64Content, { encoding: 'base64' })

        return filename
    }

    public static delete = async (file: string) => {
        await FileSystem.deleteAsync(file)
    }
}