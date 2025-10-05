import { Audio } from "expo-av";

let sound = null;

export async function initMusic(audioFile) {
  if (!sound) {
    const { sound: newSound } = await Audio.Sound.createAsync(audioFile, {
      shouldPlay: true,
      isLooping: true, 
    });
    sound = newSound;
  }
}

export async function playMusic() {
  if (sound) {
    await sound.playAsync();
  }
}

export async function pauseMusic() {
  if (sound) {
    await sound.pauseAsync();
  }
}

export async function toggleMusic() {
  if (sound) {
    const status = await sound.getStatusAsync();
    if (status.isPlaying) {
      await sound.pauseAsync();
    } else {
      await sound.playAsync();
    }
  }
}

export async function stopMusic() {
  if (sound) {
    await sound.stopAsync();
  }
}
