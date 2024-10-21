import express from 'express';
import router from './routes';
import cors from 'cors';
import path from 'path';

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.use(router);
app.use(express.static(path.join(__dirname, '../../frontend/build')));
app.use('*', (req, res) => {
        res.sendFile(path.join(__dirname, '../../frontend/build/index.html'));
    }
);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});