import { useState, useEffect } from 'react';
import { PitchDetector } from 'pitchy';
import { AudioModule, setAudioModeAsync } from 'expo-audio';
import LiveAudioStream from 'react-native-live-audio-stream';
import { decode } from 'base-64';


const CHUNK_SIZE_IN_SAMPLES = 2048;
const CHUNK_SIZE_IN_BYTES = CHUNK_SIZE_IN_SAMPLES * 2;
const SAMPLE_RATE = 22050;
const CLARITY_THRESHOLD = 0.83;

function convertInt16ToFloat32(data: Uint8Array): Float32Array {
  const int16Array = new Int16Array(data.buffer);
  const float32Array = new Float32Array(int16Array.length);

  for (let i = 0; i < int16Array.length; i++) {
    float32Array[i] = int16Array[i] / 32768.0;
  }
  return float32Array;
}

export function usePitchAnalysis() {
  const [tone, setTone] = useState<number | null>(null);



  useEffect(() => {
    const startListening = async () => {
      try {
        const perrmision = await AudioModule.requestRecordingPermissionsAsync();

        if (!perrmision.granted) {
          alert('mic perrmision missing');
          return;
        }

        await setAudioModeAsync({
          allowsRecording: true,
        });


        LiveAudioStream.init({
          sampleRate: SAMPLE_RATE,
          channels: 1,
          bitsPerSample: 16,
          bufferSize: CHUNK_SIZE_IN_BYTES,
        } as any);

        const detector = PitchDetector.forFloat32Array(CHUNK_SIZE_IN_SAMPLES);

        LiveAudioStream.on('data', (data_base64) => {
          if (!data_base64) return;

          const binaryString = decode(data_base64);

          const bytes = new Uint8Array(binaryString.length);
          for (let i = 0; i < binaryString.length; i++) {
            bytes[i] = binaryString.charCodeAt(i);
          }

          const floatArray = convertInt16ToFloat32(bytes);

          if (floatArray.length !== CHUNK_SIZE_IN_SAMPLES) {
            console.warn(`wrong size, expected: ${CHUNK_SIZE_IN_SAMPLES}, arrived ${floatArray.length}`);
            return;
          }

          const [pitch, clarity] = detector.findPitch(floatArray, SAMPLE_RATE);

          if (pitch > 0 && clarity > CLARITY_THRESHOLD) {
            setTone(pitch);
          } else {
            setTone(null);
          }
        });

        LiveAudioStream.start();

      } catch (error) {
        console.error('initialization error', error);
        alert('critical mic error');
      }
    };

    startListening();
    return () => {
      LiveAudioStream.stop();
    };
  }, []);

  return tone;
}
