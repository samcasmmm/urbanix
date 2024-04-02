import express, { Application, Request, Response } from 'express';
import {
    createLine,
    createLinePrint,
    generateSecretKey,
} from './utils/devHelper';
import connectDatabase from './config/connectDB';
import dotenv from 'dotenv';
dotenv.config();

const app: Application = express();
const port = process.env.PORT || 3030;

app.get('/', (req: Request, res: Response) => {
    res.json({ message: 'Server is Running' });
});

app.get('/health', (req: Request, res: Response) => {
    res.json({ message: 'health is okay' });
});
app.get('/gen', async (req: Request, res: Response) => {
    res.json({ message: await generateSecretKey() });
});
app.get('/v1/health', (req: Request, res: Response) => {
    res.json({ message: 'v1 health is okay' });
});

const startServer = async () => {
    app.listen(process.env.PORT, () => {
        createLinePrint(50);
        console.log(`Server at http://localhost:7000`);
        connectDatabase();
    });
};

startServer();
