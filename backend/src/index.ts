import cors from 'cors';
import express from 'express';
import { config } from 'dotenv';
import path from 'path';
import { createServer } from 'http';
import { Server } from 'socket.io';


config({path: __dirname + '/../.env'});

import router from './routes';

const app = express();
const PORT = process.env.PORT;
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*", // React app's origin
    methods: ["GET", "POST"]
  }
});

io.on('connection', (socket) => {
  console.log('New client connected');
  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.use(router);
app.post('/api/audio_stream', (req, res) => {
    console.log('hmm');
    req.on('data', (chunk) => {
        io.emit('audio-stream', chunk);
        console.log('Sending audio' + new Date());
    });
    req.on('end', () => {
        res.status(200).send('Stream received');
    });
});
app.use(express.static(path.join(__dirname, '../../frontend/build')));
app.use('*', (req, res) => {
        res.sendFile(path.join(__dirname, '../../frontend/build/index.html'));
    }
);

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));