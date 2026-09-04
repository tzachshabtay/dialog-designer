import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const demoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const outputPath = path.join(demoRoot, "public", "assets", "audio.music.noir.original.wav");
const sampleRate = 22_050;
const beatsPerMinute = 72;
const beatSeconds = 60 / beatsPerMinute;
const totalBeats = 32;
const totalSamples = Math.round(totalBeats * beatSeconds * sampleRate);
const mix = new Float64Array(totalSamples);

const chords = [
  [146.83, 174.61, 220.0, 329.63],
  [116.54, 146.83, 174.61, 220.0],
  [98.0, 116.54, 146.83, 164.81],
  [110.0, 138.59, 164.81, 233.08]
];
const bassRoots = [73.42, 58.27, 49.0, 55.0];
const melody = [
  [2, 293.66, 1.5], [4, 349.23, 0.75], [5, 329.63, 0.75],
  [8, 293.66, 1.5], [10, 261.63, 0.75], [11, 220.0, 1.5],
  [16, 233.08, 1.5], [18, 293.66, 0.75], [19, 261.63, 0.75],
  [24, 277.18, 1.5], [26, 261.63, 0.75], [27, 220.0, 1.75]
];

for (let bar = 0; bar < 8; bar += 1) {
  const chordIndex = bar % chords.length;
  const barBeat = bar * 4;
  addPianoChord(barBeat, 2.8, chords[chordIndex], 0.105);
  addPianoChord(barBeat + 2.5, 1.1, chords[chordIndex], 0.045);

  for (let beat = 0; beat < 4; beat += 1) {
    const startBeat = barBeat + beat;
    const bassFrequency = bassRoots[chordIndex] * (beat === 3 ? 1.5 : 1);
    const crossesLoopBoundary = bar === 7 && beat === 3;
    addBass(
      startBeat,
      crossesLoopBoundary ? 1.28 : 0.72,
      bassFrequency,
      beat === 0 ? 0.19 : 0.135
    );
    addBrush(
      startBeat,
      crossesLoopBoundary ? 1.08 : (beat % 2 === 0 ? 0.42 : 0.32),
      beat % 2 === 0 ? 0.046 : 0.032
    );
  }
}

// A soft dominant turnaround crosses the render boundary so the loop keeps
// breathing into its opening downbeat instead of fading to near-silence.
addPianoChord(31.35, 1.05, chords[3], 0.082);
addBass(31.5, 0.86, bassRoots[3], 0.12);
addBrush(31.5, 0.78, 0.042);
addBrush(31.75, 0.48, 0.055);

for (const [startBeat, frequency, durationBeats] of melody) {
  addMutedLead(startBeat, durationBeats, frequency, 0.095);
}

addRoomTone();
closeLoopBoundary();
normalise();

const wav = encodeWave(mix, sampleRate);
await mkdir(path.dirname(outputPath), { recursive: true });

let previous;
try {
  previous = await readFile(outputPath);
} catch {
  previous = undefined;
}

if (!previous?.equals(wav)) {
  await writeFile(outputPath, wav);
  console.log(`Wrote ${path.relative(demoRoot, outputPath)} (${(wav.length / 1024).toFixed(1)} KiB).`);
} else {
  console.log(`${path.relative(demoRoot, outputPath)} is already current.`);
}

function addPianoChord(startBeat, durationBeats, frequencies, amplitude) {
  for (const [index, frequency] of frequencies.entries()) {
    addTone({
      startBeat: startBeat + index * 0.018,
      durationBeats,
      frequency,
      amplitude: amplitude / Math.sqrt(frequencies.length),
      attackSeconds: 0.008,
      decay: 2.45,
      harmonics: [[1, 1], [2, 0.34], [3, 0.14], [4, 0.05]]
    });
  }
}

function addBass(startBeat, durationBeats, frequency, amplitude) {
  addTone({
    startBeat,
    durationBeats,
    frequency,
    amplitude,
    attackSeconds: 0.006,
    decay: 4.8,
    pitchDrop: 0.012,
    harmonics: [[1, 1], [2, 0.21], [3, 0.08]]
  });
}

function addMutedLead(startBeat, durationBeats, frequency, amplitude) {
  addTone({
    startBeat,
    durationBeats,
    frequency,
    amplitude,
    attackSeconds: 0.12,
    decay: 0.78,
    vibrato: 4.8,
    vibratoDepth: 0.007,
    harmonics: [[1, 1], [2, 0.24], [3, 0.1], [5, 0.025]]
  });
}

function addTone({
  startBeat,
  durationBeats,
  frequency,
  amplitude,
  attackSeconds,
  decay,
  harmonics,
  pitchDrop = 0,
  vibrato = 0,
  vibratoDepth = 0
}) {
  const start = Math.round(startBeat * beatSeconds * sampleRate);
  const length = Math.round(durationBeats * beatSeconds * sampleRate);
  let phase = 0;

  for (let index = 0; index < length; index += 1) {
    const time = index / sampleRate;
    const progress = index / Math.max(1, length - 1);
    const attack = Math.min(1, time / attackSeconds);
    const release = Math.min(1, (1 - progress) * 9);
    const envelope = attack * release * Math.exp(-decay * progress);
    const drift = 1 + pitchDrop * Math.exp(-10 * progress);
    const modulation = 1 + Math.sin(2 * Math.PI * vibrato * time) * vibratoDepth;
    phase += 2 * Math.PI * frequency * drift * modulation / sampleRate;

    let value = 0;
    for (const [multiple, weight] of harmonics) value += Math.sin(phase * multiple) * weight;
    mix[(start + index) % mix.length] += value * envelope * amplitude;
  }
}

function addBrush(startBeat, durationBeats, amplitude) {
  const start = Math.round(startBeat * beatSeconds * sampleRate);
  const length = Math.round(durationBeats * beatSeconds * sampleRate);
  let previousNoise = 0;
  let randomState = (0x9e3779b9 ^ start) >>> 0;

  for (let index = 0; index < length; index += 1) {
    randomState ^= randomState << 13;
    randomState ^= randomState >>> 17;
    randomState ^= randomState << 5;
    const noise = ((randomState >>> 0) / 0xffffffff) * 2 - 1;
    const highPassed = noise - previousNoise * 0.92;
    previousNoise = noise;
    const progress = index / Math.max(1, length - 1);
    const envelope = Math.sin(Math.PI * progress) * Math.exp(-2.2 * progress);
    mix[(start + index) % mix.length] += highPassed * envelope * amplitude;
  }
}

function addRoomTone() {
  for (let index = 0; index < mix.length; index += 1) {
    const phase = index / mix.length;
    mix[index] += (
      Math.sin(2 * Math.PI * 997 * phase) * 0.0035
      + Math.sin(2 * Math.PI * 1_511 * phase + 0.7) * 0.0022
      + Math.sin(2 * Math.PI * 2_003 * phase + 1.9) * 0.0014
      + Math.sin(2 * Math.PI * 47 * phase + 0.3) * 0.0028
    );
  }
}

function closeLoopBoundary() {
  const seamSamples = Math.round(sampleRate * 0.012);
  const correction = mix[0] - mix[mix.length - 1];
  const start = mix.length - seamSamples;
  for (let index = 0; index < seamSamples; index += 1) {
    const progress = index / Math.max(1, seamSamples - 1);
    const smoothstep = progress * progress * (3 - 2 * progress);
    mix[start + index] += correction * smoothstep;
  }
}

function normalise() {
  let peak = 0;
  for (const sample of mix) peak = Math.max(peak, Math.abs(sample));
  const gain = peak > 0 ? 0.84 / peak : 1;
  for (let index = 0; index < mix.length; index += 1) mix[index] *= gain;
}

function encodeWave(samples, rate) {
  const bytesPerSample = 2;
  const dataLength = samples.length * bytesPerSample;
  const buffer = Buffer.alloc(44 + dataLength);
  buffer.write("RIFF", 0);
  buffer.writeUInt32LE(36 + dataLength, 4);
  buffer.write("WAVE", 8);
  buffer.write("fmt ", 12);
  buffer.writeUInt32LE(16, 16);
  buffer.writeUInt16LE(1, 20);
  buffer.writeUInt16LE(1, 22);
  buffer.writeUInt32LE(rate, 24);
  buffer.writeUInt32LE(rate * bytesPerSample, 28);
  buffer.writeUInt16LE(bytesPerSample, 32);
  buffer.writeUInt16LE(16, 34);
  buffer.write("data", 36);
  buffer.writeUInt32LE(dataLength, 40);

  for (let index = 0; index < samples.length; index += 1) {
    const value = Math.max(-1, Math.min(1, samples[index]));
    buffer.writeInt16LE(Math.round(value * 32767), 44 + index * bytesPerSample);
  }
  return buffer;
}
