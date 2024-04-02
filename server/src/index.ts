import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import 'module-alias/register';
dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3030;

app.get('/', (req: Request, res: Response) => {
  res.json({ message: 'Server is Running' });
});

app.get('/health', (req: Request, res: Response) => {
  res.json({ message: 'health is okay' });
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
