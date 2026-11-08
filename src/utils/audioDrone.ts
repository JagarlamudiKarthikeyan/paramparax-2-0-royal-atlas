/**
 * Ambient Tanpura Drone Synthesizer using Web Audio API
 * Generates an authentic Indian classical Sa-Pa-Sa-Sa drone with overtone harmonics
 */

class TanpuraDroneSynth {
  private ctx: AudioContext | null = null;
  private isPlaying = false;
  private timer: number | null = null;
  private masterGain: GainNode | null = null;
  private baseFrequency = 146.83; // D3 root note (Sa)
  private currentVolume = 0.25;

  private initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(this.currentVolume, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  // Pluck an individual Tanpura string with rich harmonics
  private pluckString(freq: number, duration: number) {
    if (!this.ctx || !this.masterGain) return;

    const now = this.ctx.currentTime;
    
    // Fundamental + 3 overtones (Sawtooth + Sine mix)
    const osc1 = this.ctx.createOscillator();
    const osc2 = this.ctx.createOscillator();
    const osc3 = this.ctx.createOscillator();

    const stringGain = this.ctx.createGain();
    const filter = this.ctx.createBiquadFilter();

    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(800, now);
    filter.Q.setValueAtTime(3, now);

    osc1.type = 'triangle';
    osc1.frequency.setValueAtTime(freq, now);

    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(freq * 2, now); // First octave

    osc3.type = 'sawtooth';
    osc3.frequency.setValueAtTime(freq * 3, now); // Third harmonic (Javari buzz)

    // Sub-gain for the jawari metallic overtone
    const javariGain = this.ctx.createGain();
    javariGain.gain.setValueAtTime(0.08, now);
    osc3.connect(javariGain);
    javariGain.connect(filter);

    osc1.connect(filter);
    osc2.connect(filter);
    filter.connect(stringGain);
    stringGain.connect(this.masterGain);

    // Tanpura pluck envelope: quick attack, long resonant decay
    stringGain.gain.setValueAtTime(0.0001, now);
    stringGain.gain.linearRampToValueAtTime(0.18, now + 0.12);
    stringGain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

    osc1.start(now);
    osc2.start(now);
    osc3.start(now);

    osc1.stop(now + duration + 0.1);
    osc2.stop(now + duration + 0.1);
    osc3.stop(now + duration + 0.1);
  }

  // The 4 strings of classical Tanpura (Pa - Sa - Sa - Sa_low)
  // Pa = 3/2 * Sa, Sa = 1 * Sa, Sa = 1 * Sa, Sa_low = 1/2 * Sa
  public start() {
    this.initContext();
    if (this.isPlaying) return;
    this.isPlaying = true;

    const stringNotes = [
      this.baseFrequency * 1.5,  // Pa (Fifth)
      this.baseFrequency * 2.0,  // High Sa (Octave)
      this.baseFrequency * 2.0,  // High Sa (Octave)
      this.baseFrequency * 1.0   // Kharja Sa (Root)
    ];

    let stringIndex = 0;
    const intervalTime = 1600; // ~1.6s between plucks

    const cycle = () => {
      if (!this.isPlaying) return;
      const freq = stringNotes[stringIndex];
      this.pluckString(freq, 4.5);
      stringIndex = (stringIndex + 1) % stringNotes.length;
      this.timer = window.setTimeout(cycle, intervalTime);
    };

    cycle();
  }

  public stop() {
    this.isPlaying = false;
    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
    }
  }

  public toggle(): boolean {
    if (this.isPlaying) {
      this.stop();
      return false;
    } else {
      this.start();
      return true;
    }
  }

  public setVolume(vol: number) {
    this.currentVolume = Math.max(0, Math.min(1, vol));
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setValueAtTime(this.currentVolume, this.ctx.currentTime);
    }
  }

  public getIsPlaying(): boolean {
    return this.isPlaying;
  }
}

export const tanpuraDrone = new TanpuraDroneSynth();
