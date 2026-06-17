const MUSIC_URL =
  '/music/background_music/Yiruma%2C%20(%EC%9D%B4%EB%A3%A8%EB%A7%88)%20-%20River%20Flows%20in%20You.mp3';

let audio = null;

export function getBgAudio() {
  if (!audio) {
    audio = new Audio(MUSIC_URL);
    audio.loop = true;
    audio.volume = 0.35;
  }
  return audio;
}
