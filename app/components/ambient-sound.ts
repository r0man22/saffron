// A quiet field at sunset, made with Web Audio (no audio files): a slow breeze, grass that rustles when the
// visitor scrolls, and a few distant crickets as the story reaches dusk. Everything stays well below speech level.
export type Ambience = {
  setGust(amount: number): void;     // 0..1, how hard the visitor is scrolling
  setDusk(amount: number): void;     // 0..1, story progress towards the final scene
  setPresence(amount: number): void; // 0..1, how much of the story is on screen
  setEnabled(on: boolean): void;
  close(): void;
};

function noise(ctx: AudioContext, seconds: number, brown: boolean) {
  const length = Math.round(ctx.sampleRate * seconds), buffer = ctx.createBuffer(2, length, ctx.sampleRate);
  for (let channel = 0; channel < 2; channel++) {
    const data = buffer.getChannelData(channel);
    let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0, last = 0;
    for (let i = 0; i < length; i++) {
      const white = Math.random() * 2 - 1;
      if (brown) { last = (last + 0.02 * white) / 1.02; data[i] = last * 3.5; continue; }
      b0 = 0.99886 * b0 + white * 0.0555179; b1 = 0.99332 * b1 + white * 0.0750759; b2 = 0.969 * b2 + white * 0.153852;
      b3 = 0.8665 * b3 + white * 0.3104856; b4 = 0.55 * b4 + white * 0.5329522; b5 = -0.7616 * b5 - white * 0.016898;
      data[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.11; b6 = white * 0.115926;
    }
    // Remove the drift so the loop joins without a click.
    const drift = data[length - 1] - data[0];
    for (let i = 0; i < length; i++) data[i] -= drift * i / length;
  }
  return buffer;
}

export function createAmbience(): Ambience | null {
  const AudioContextClass = window.AudioContext || (window as Window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
  if (!AudioContextClass) return null;
  const ctx = new AudioContextClass();
  const master = ctx.createGain(); master.gain.value = 0; master.connect(ctx.destination);
  const loop = (buffer: AudioBuffer) => { const source = ctx.createBufferSource(); source.buffer = buffer; source.loop = true; source.start(); return source; };
  const pink = noise(ctx, 8, false), brown = noise(ctx, 8, true);

  // Breeze: band-passed pink noise whose level and colour drift slowly.
  const breezeFilter = ctx.createBiquadFilter(); breezeFilter.type = "bandpass"; breezeFilter.frequency.value = 480; breezeFilter.Q.value = 0.7;
  const breeze = ctx.createGain(); breeze.gain.value = 0.17;
  loop(pink).connect(breezeFilter).connect(breeze).connect(master);
  // Distance: a low, soft rumble of brown noise.
  const distanceFilter = ctx.createBiquadFilter(); distanceFilter.type = "lowpass"; distanceFilter.frequency.value = 220;
  const distance = ctx.createGain(); distance.gain.value = 0.045;
  loop(brown).connect(distanceFilter).connect(distance).connect(master);
  // Grass: high, airy noise that only comes up while scrolling.
  const grassFilter = ctx.createBiquadFilter(); grassFilter.type = "highpass"; grassFilter.frequency.value = 2600;
  const grass = ctx.createGain(); grass.gain.value = 0;
  loop(pink).connect(grassFilter).connect(grass).connect(master);
  // Crickets: two quiet sine voices, left and right, pulsed in short trains.
  const crickets = [4350, 4780].map((frequency, i) => {
    const osc = ctx.createOscillator(); osc.frequency.value = frequency;
    const gain = ctx.createGain(); gain.gain.value = 0;
    const pan = ctx.createStereoPanner(); pan.pan.value = i ? 0.55 : -0.45;
    osc.connect(gain).connect(pan).connect(master); osc.start();
    return gain.gain;
  });

  let gust = 0, dusk = 0, presence = 1, enabled = false;
  const now = () => ctx.currentTime;
  const drift = setInterval(() => {
    breeze.gain.setTargetAtTime((0.12 + Math.random() * 0.1) + gust * 0.18, now(), 1.6);
    breezeFilter.frequency.setTargetAtTime(380 + Math.random() * 300 + gust * 520, now(), 1.8);
  }, 2600);
  const chirp = setInterval(() => {
    const level = 0.03 * dusk * presence;
    if (level < 0.0005) return;
    crickets.forEach((gain, voice) => {
      if (Math.random() < 0.35) return;
      const start = now() + 0.05 + Math.random() * 0.4 + voice * 0.13;
      for (let p = 0; p < 3 + Math.round(Math.random()); p++) {
        const t = start + p * 0.038;
        gain.setValueAtTime(0, t); gain.linearRampToValueAtTime(level, t + 0.007); gain.linearRampToValueAtTime(0, t + 0.024);
      }
    });
  }, 950);
  const applyMaster = () => master.gain.setTargetAtTime(enabled ? 0.9 * (0.3 + 0.7 * presence) : 0, now(), enabled ? 0.9 : 0.25);
  const visibility = () => { if (document.hidden) void ctx.suspend(); else if (enabled) void ctx.resume(); };
  document.addEventListener("visibilitychange", visibility);

  return {
    setGust(amount) {
      const rising = amount > gust; gust = amount;
      grass.gain.setTargetAtTime(amount * 0.16, now(), rising ? 0.12 : 0.9);
      breeze.gain.setTargetAtTime(0.16 + amount * 0.2, now(), rising ? 0.25 : 1.6);
      breezeFilter.frequency.setTargetAtTime(420 + amount * 620, now(), rising ? 0.3 : 1.4);
    },
    setDusk(amount) { dusk = amount; },
    setPresence(amount) { presence = amount; applyMaster(); },
    setEnabled(on) { enabled = on; if (on) void ctx.resume(); applyMaster(); },
    close() { clearInterval(drift); clearInterval(chirp); document.removeEventListener("visibilitychange", visibility); void ctx.close(); },
  };
}
