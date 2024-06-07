import cors from 'cors';
import express from 'express';
import { config } from 'dotenv'

config();

import router from './routes';

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.use(router);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
