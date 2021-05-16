import express from "express";
import morgan from 'morgan';
import cors from 'cors';
import 'dotenv/config.js';
import './db/database.js';
// built-in module of NodeJS
import path from 'path';
// Wenn ich zu URL-Path Zugang haben will in ES6 (s.u. const __dirname = ...), 
// muss ich hier built-in module of NodeJS importieren
import url from 'url';

/* routes */
import userRouter from './routes/users.js';
import commentsRouter from './routes/comments.js';
import flavorsRouter from './routes/flavors.js';
import locationRouter from './routes/locations.js';
import authRouter from './routes/auth.js';

const __dirname = path.dirname(url.fileURLToPath(import.meta.url));
const publicDir = path.join(__dirname, 'public');

const app = express();
const port = process.env.PORT || 5000;

if (process.env.NODE_ENV !== 'production') {
  app.use(morgan('dev')); 
}
// to be able to receive and send Cookie in network, need origin (http of frontend) and 
// credentials set to true; siehe credentials settings in const options in signup.js in frontend
app.use(cors({ origin: process.env.ORIGIN, credentials: true }));
app.use(express.json());

/* middlewares */
app.use('/users', userRouter);
app.use('/comments', commentsRouter);
app.use('/flavors', flavorsRouter);
app.use('/locations', locationRouter);
app.use('/auth', authRouter);

app.use('/', (req, res) => res.sendFile('index.html', { root: publicDir }));

app.listen(port, () => console.log(`Server running on port ${port}`));
