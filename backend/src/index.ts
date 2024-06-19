import cors from 'cors';
import express from 'express';
import { config } from 'dotenv'
import path from 'path';

config({path: __dirname + '/../.env'});

import router from './routes';

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.use(router);
app.use('/', express.static(path.join(__dirname, '../../frontend/build')));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
