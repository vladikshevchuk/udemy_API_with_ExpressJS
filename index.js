import express from 'express';
import {userRouter}  from './users/users.js';


const port = 8000;
const app = express();

app.get('/hello', (req, res) => {
    res.send('Hello World!');
});

app.use('/users', userRouter);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});