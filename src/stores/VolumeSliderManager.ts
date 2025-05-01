import { makeAutoObservable } from "mobx";

export class VolumeSliderManager {
  private _volume: number = 50;

  constructor() {
    makeAutoObservable(this);
  }

  get volume(): number {
    return this._volume;
  }

  setVolume(value: number) {
    this._volume = value;
  }
}

// Create a singleton instance
export const volumeSliderManager = new VolumeSliderManager();
