import express, { Application, Request, Response } from 'express';
import compression from 'compression';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import dotenv from 'dotenv';
dotenv.config();

import { createLinePrint, generateSecretKey } from './utils/devHelper';
import connectDatabase from './config/connectDB';
import usersRoute from './routes/users.route';
import { pathBuilder } from './utils/helpers';

const app: Application = express();
const port = process.env.PORT || 3030;

app.use(helmet());
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(compression());

app.get('/', (req: Request, res: Response) => {
    res.json({
        status: res.statusCode,
        message: 'Welcome to Homepage',
        url: req.url,
        meta: null,
        data: null,
    });
});

app.get(pathBuilder('/health', 'V1'), (req: Request, res: Response) => {
    res.json({
        status: res.statusCode,
        message: 'health is okay',
        url: req.url,
        meta: null,
        data: null,
    });
});

app.get(pathBuilder('/secret', 'V2'), async (req: Request, res: Response) => {
    res.json({
        status: res.statusCode,
        message: 'Secret key',
        url: req.url,
        meta: null,
        data: await generateSecretKey(),
    });
});

app.use(pathBuilder('/users', 'V1'), usersRoute);

const startServer = async () => {
    app.listen(process.env.PORT, () => {
        createLinePrint(50);
        console.log(`Server at http://localhost:7000`);
        connectDatabase();
    });
};

startServer();
