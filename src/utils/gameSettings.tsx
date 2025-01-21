import { Howl, Howler } from "howler";
import BlueWin from "../sound/blue_winner.mp3";
import BoyLetsGo from "../sound/boy_let's_go.mp3";
import BoyPump from "../sound/boy_pump_it.mp3";
import FirstPull from "../sound/first_pull.mp3";
import GirlLetsGo from "../sound/girl_let's_go.mp3";
import GirlPump from "../sound/girl_pump_it.mp3";
import GreenWin from "../sound/green_winner.mp3";
import SecondPull from "../sound/second_pull.mp3";
import ThirdPull from "../sound/third_pull.mp3";
import ToggleSound from "../sound/toggle.mp3";
import TryAgain from "../sound/try_again.mp3";
import YellowWin from "../sound/yellow_win.mp3";

let toggleSound: Howl | null;
let girlLetsGo: Howl | null;
let boyLetsGo: Howl | null;
let girlPumpIt: Howl | null;
let boyPumpIt: Howl | null;
let tryAgain: Howl | null;
let blueWin: Howl | null;
let greenWin: Howl | null;
let yellowWin: Howl | null;
let firstPull: Howl | null;
let secoundPull: Howl | null;
let thirdPull: Howl | null;
let sound: boolean = true;
let gameVolume: number = 1;

export function loadSounds(): void {
  toggleSound = new Howl({
    src: [ToggleSound],
    html5: true,
    volume: 1,
    loop: false,
    onloaderror: (error) => {
      console.error("toggleSound Sound Load Error:", error);
    },
    onload: () => {},
    onplayerror: (error) => {
      console.error("toggleSound Sound Play Error:", error);
    },
  });

  girlLetsGo = new Howl({
    src: [GirlLetsGo],
    html5: false,
    volume: gameVolume,
    loop: false,
    onloaderror: (error) => {
      console.error("girlLetsGo Sound Load Error:", error);
    },
    onload: () => {},
    onplayerror: (error) => {
      console.error("girlLetsGo Sound Play Error:", error);
    },
  });

  boyLetsGo = new Howl({
    src: [BoyLetsGo],
    html5: false,
    volume: gameVolume,
    loop: false,
    onloaderror: (error) => {
      console.error("boyLetsGo Sound Load Error:", error);
    },
    onload: () => {},
    onplayerror: (error) => {
      console.error("boyLetsGo Sound Play Error:", error);
    },
  });

  girlPumpIt = new Howl({
    src: [GirlPump],
    html5: false,
    volume: gameVolume,
    loop: false,
    onloaderror: (error) => {
      console.error("girlPumpIt Sound Load Error:", error);
    },
    onload: () => {},
    onplayerror: (error) => {
      console.error("girlPumpIt Sound Play Error:", error);
    },
  });

  boyPumpIt = new Howl({
    src: [BoyPump],
    html5: false,
    volume: gameVolume,
    loop: false,
    onloaderror: (error) => {
      console.error("boyPumpIt Sound Load Error:", error);
    },
    onload: () => {},
    onplayerror: (error) => {
      console.error("boyPumpIt Sound Play Error:", error);
    },
  });

  tryAgain = new Howl({
    src: [TryAgain],
    html5: false,
    volume: gameVolume,
    loop: false,
    onloaderror: (error) => {
      console.error("tryAgain Sound Load Error:", error);
    },
    onload: () => {},
    onplayerror: (error) => {
      console.error("tryAgain Sound Play Error:", error);
    },
  });

  blueWin = new Howl({
    src: [BlueWin],
    html5: false,
    volume: gameVolume,
    loop: false,
    onloaderror: (error) => {
      console.error("blueWin Sound Load Error:", error);
    },
    onload: () => {},
    onplayerror: (error) => {
      console.error("blueWin Sound Play Error:", error);
    },
  });

  greenWin = new Howl({
    src: [GreenWin],
    html5: false,
    volume: gameVolume,
    loop: false,
    onloaderror: (error) => {
      console.error("greenWin Sound Load Error:", error);
    },
    onload: () => {},
    onplayerror: (error) => {
      console.error("greenWin Sound Play Error:", error);
    },
  });

  yellowWin = new Howl({
    src: [YellowWin],
    html5: false,
    volume: gameVolume,
    loop: false,
    onloaderror: (error) => {
      console.error("yellowWin Sound Load Error:", error);
    },
    onload: () => {},
    onplayerror: (error) => {
      console.error("yellowWin Sound Play Error:", error);
    },
  });

  firstPull = new Howl({
    src: [FirstPull],
    html5: false,
    volume: gameVolume,
    loop: true,
    onloaderror: (error) => {
      console.error("firstPull Sound Load Error:", error);
    },
    onload: () => {},
    onplayerror: (error) => {
      console.error("firstPull Sound Play Error:", error);
    },
  });

  secoundPull = new Howl({
    src: [SecondPull],
    html5: false,
    volume: gameVolume,
    loop: true,
    onloaderror: (error) => {
      console.error("secoundPull Sound Load Error:", error);
    },
    onload: () => {},
    onplayerror: (error) => {
      console.error("secoundPull Sound Play Error:", error);
    },
  });

  thirdPull = new Howl({
    src: [ThirdPull],
    html5: false,
    volume: gameVolume,
    loop: true,
    onloaderror: (error) => {
      console.error("thirdPull Sound Load Error:", error);
    },
    onload: () => {},
    onplayerror: (error) => {
      console.error("thirdPull Sound Play Error:", error);
    },
  });
}

export function playToggleSound(): void {
  if (toggleSound) {
    toggleSound.play();
  }
}

export function BoyPump_It() {
  if (boyPumpIt && !boyPumpIt.playing()) {
    boyPumpIt.play();
  }
}

export function GirlPump_It() {
  if (girlPumpIt && !girlPumpIt.playing()) {
    girlPumpIt.play();
  }
}

export function Try_Again(): void {
  if (tryAgain && !tryAgain.playing()) {
    tryAgain.play();
  }
}

export function First_Pull(): void {
  if (firstPull && !firstPull.playing()) {
    firstPull.play();
  }
}

export function stopFirstPull(): void {
  if (firstPull && firstPull.playing()) {
    firstPull.stop(); // Stop the sound
  }
}

//
export function Secound_Pull(): void {
  if (secoundPull && !secoundPull.playing()) {
    secoundPull.play();
  }
}

export function stopSecoundPull(): void {
  if (secoundPull && secoundPull.playing()) {
    secoundPull.stop(); // Stop the sound
  }
}

export function Third_Pull(): void {
  if (thirdPull && !thirdPull.playing()) {
    thirdPull.play();
  }
}

export function stopThirdPull(): void {
  if (thirdPull && thirdPull.playing()) {
    thirdPull.stop(); // Stop the sound
  }
}

export function blueWinPop() {
  if (blueWin && !blueWin.playing()) {
    blueWin.play(); // Stop the sound
  }
}

export function greenWinPop() {
  if (greenWin && !greenWin.playing()) {
    greenWin.play(); // Stop the sound
  }
}

export function yellowWinPop() {
  if (yellowWin && !yellowWin.playing()) {
    yellowWin.play(); // Stop the sound
  }
}

export function stopAllWinSound() {
  if (blueWin && blueWin.playing()) {
    blueWin.stop(); // Stop the sound
  }

  if (greenWin && greenWin.playing()) {
    greenWin.stop(); // Stop the sound
  }

  if (yellowWin && yellowWin.playing()) {
    yellowWin.stop(); // Stop the sound
  }
}

export function stopAllPullSound() {
  if (firstPull && firstPull.playing()) {
    firstPull.stop(); // Stop the sound
  }

  if (secoundPull && secoundPull.playing()) {
    secoundPull.stop(); // Stop the sound
  }

  if (thirdPull && thirdPull.playing()) {
    thirdPull.stop(); // Stop the sound
  }
}

export function playSound(): void {
  if (sound) {
    toggleSound?.mute(false);
  }
}

export function pauseSound(): void {
  toggleSound?.mute(false);
}

export function setMuted(muted: boolean): void {
  Howler.mute(muted);
}

export function setVolume(volume: number): void {
  Howler.volume(volume); // Sets global volume (range 0 to 1)
}

export function getVolume(): number {
  return Howler.volume(); // Returns current global volume
}

// Initialize sounds on import
loadSounds();
