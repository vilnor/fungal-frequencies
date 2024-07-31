import { Box } from '@mui/material';
import React, { useEffect, useRef } from 'react';
import io, { Socket } from 'socket.io-client';

const ENDPOINT = `${process.env.REACT_APP_API_URL}`;
function AudioView() {
    const audioContextRef = useRef<AudioContext | null>(null);
    const socketRef = useRef<Socket | null>(null);

    useEffect(() => {
        audioContextRef.current = new window.AudioContext();

        socketRef.current = io('/');

        socketRef.current.on('audio-stream', (chunk: ArrayBuffer) => {
            const audioContext = audioContextRef.current;
            if (audioContext) {
                audioContext.decodeAudioData(chunk, (decodedData) => {
                    const bufferSource = audioContext.createBufferSource();
                    bufferSource.buffer = decodedData;
                    bufferSource.connect(audioContext.destination);
                    bufferSource.start();
                }, (error) => {
                    console.error('Error decoding audio data:', error);
                });
            }
        });

        return () => {
            if (socketRef.current) {
                socketRef.current.disconnect();
            }
        };
    }, []);

    return (
        <Box sx={{p: 5, height: '100%', overflow: 'auto'}}>
            Audio Stream
        </Box>
    );
};

export default AudioView;