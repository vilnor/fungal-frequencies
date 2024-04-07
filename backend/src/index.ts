import cors from 'cors';
import express from 'express';
import router from './routes';
import { config } from 'dotenv'

config();

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.use(router);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));