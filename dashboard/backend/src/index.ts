import cors from 'cors';
import express from 'express';
import { config } from 'dotenv';
import path from 'path';
import router from './routes';

config({ path: __dirname + '/../.env' });

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.use(router);
app.use(express.static(path.join(__dirname, '../../frontend/build')));
app.use('*', (req, res) => {
        res.sendFile(path.join(__dirname, '../../frontend/build/index.html'));
    },
);
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
