import express from 'express';
import cors from 'cors';
const app = express();

import router from './routes/handleFile.route.js';


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());


app.use('/api', router);

export default app;