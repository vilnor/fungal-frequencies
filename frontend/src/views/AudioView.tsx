import React, { useEffect, useRef, useState } from 'react';
import io from 'socket.io-client';

const AudioStreamPlayer: React.FC = () => {
  // const audioRef = useRef<HTMLAudioElement>(null);
  // const sourceBufferRef = useRef<SourceBuffer | null>(null);
  // const mediaSourceRef = useRef<MediaSource | null>(null);
  // const queueRef = useRef<Uint8Array[]>([]);
  // const [isPlaying, setIsPlaying] = useState(false);
  //
  // useEffect(() => {
  //   const mediaSource = new MediaSource();
  //   mediaSourceRef.current = mediaSource;
  //
  //   mediaSource.addEventListener('sourceopen', () => {
  //     if (mediaSourceRef.current) {
  //       const sourceBuffer = mediaSourceRef.current.addSourceBuffer('audio/mpeg');
  //       sourceBufferRef.current = sourceBuffer;
  //
  //       sourceBuffer.addEventListener('updateend', () => {
  //         if (queueRef.current.length > 0 && sourceBufferRef.current && !sourceBufferRef.current.updating) {
  //           sourceBufferRef.current.appendBuffer(queueRef.current.shift()!);
  //         }
  //       });
  //     }
  //   });
  //
  //   if (audioRef.current) {
  //     audioRef.current.src = URL.createObjectURL(mediaSource);
  //   }
  //
  //   const socket = io(`${process.env.REACT_APP_API_URL}/audio`);
  //
  //   socket.on('connect', () => console.log('connected'));
  //
  //   socket.on('audio-stream', (data) => {
  //     console.log('received');
  //     const audioData = new Uint8Array(data);
  //     if (sourceBufferRef.current && !sourceBufferRef.current.updating) {
  //       sourceBufferRef.current.appendBuffer(audioData);
  //     } else {
  //       queueRef.current.push(audioData);
  //     }
  //   });
  //
  //   return () => {
  //     socket.disconnect();
  //   };
  // }, []);
  //
  // const handlePlay = () => {
  //   if (audioRef.current) {
  //     audioRef.current.play();
  //     setIsPlaying(true);
  //   }
  // };
  //
  // return (
  //     <div>
  //       <audio
  //           ref={audioRef}
  //           controls
  //       />
  //       {!isPlaying && <button onClick={handlePlay}>Play</button>}
  //     </div>
  // );

  const [audioContext, setAudioContext] = useState<AudioContext | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

    useEffect(() => {
      const socket = io('http://localhost:8080/audio', { transports: ['websocket'] });

      socket.on('connect', () => {
        console.log('Connected to /audio namespace');
      });

      socket.on('audio-stream', (data) => {
        // console.log('Received audio data', data);
        if (audioContext && isPlaying) {
          const buffer = audioContext.createBuffer(1, data.length, 48000); // 48 kHz sample rate
          buffer.copyToChannel(new Float32Array(data), 0);
          const source = audioContext.createBufferSource();
          source.buffer = buffer;
          source.connect(audioContext.destination);
          source.start();
        }
      });

      socket.on('disconnect', () => {
        console.log('Disconnected from /audio namespace');
      });

        return () => {
          socket.disconnect();
        };
    }, [audioContext, isPlaying]);

  const handleStart = () => {
    if (!audioContext) {
      const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
      setAudioContext(ctx);
    }
    setIsPlaying(true);
  };

    return (
        <div>
          <h1>Audio Stream</h1>
          <button onClick={handleStart}>Start Audio</button>
          <audio
              ref={audioRef}
              controls
          />
        </div>
    );
};


export default AudioStreamPlayer;
