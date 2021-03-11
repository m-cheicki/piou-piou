import { Audio } from "expo-av";

export class SoundPlayer {
    private static _player: Audio.Sound | null = null

    public static stop = async () => {
        if (SoundPlayer._player) {
            await SoundPlayer._player.unloadAsync()
            SoundPlayer._player.setOnPlaybackStatusUpdate(null)
            SoundPlayer._player = null
        }
    }

    public static play = async (file: string) => {
        await SoundPlayer.stop()

        await Audio.setAudioModeAsync({ allowsRecordingIOS: false })

        const { sound } = await Audio.Sound.createAsync({ uri: file })

        if (sound) {
            SoundPlayer._player = sound
            await SoundPlayer._player.setPositionAsync(0)
            await SoundPlayer._player.playAsync()
        }
    }
}