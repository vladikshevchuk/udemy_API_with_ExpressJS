import express, { Request, Response } from 'express';
import {userRouter}  from './users/users.js';


const port = 8000;
const app = express();

app.use((req, res, next) => {
    console.log('Time: ', Date.now());
    next();
});

app.get('/hello', (req, res) => {
    res.send('Hello World!');
});

app.use('/users', userRouter);

app.use((err: Error, req: Request, res: Response) => {
    console.log(err.message);
    res.status(401).send({error: err.message});
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});