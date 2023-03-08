import { Wave } from "./wave.js";

export class WaveGroup {
  constructor(waves) {
    this.totalWaves = waves.length;
    this.waves = [];
    for (let i = 0; i < this.totalWaves; ++i) {
      const waveData = waves[i];
      const wave = new Wave(i, waveData);
      this.waves[i] = wave;
    }
  }

  resize(stageWidth, stageHeight) {
    for (let i = 0; i < this.totalWaves; ++i) {
      const wave = this.waves[i];
      wave.resize(stageWidth, stageHeight);
    }
  }
  draw(ctx) {
    for (let i = 0; i < this.totalWaves; ++i) {
      const wave = this.waves[i];
      wave.draw(ctx);
    }
  }
}
