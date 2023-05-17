import express from 'express';
import fs from 'fs';
import uRouter from './routers/userRouter.js';
// import argon from 'argon2';
import  {createUsersTable, addUserToDatabase}  from './routers/database.js'
import jwt from 'jsonwebtoken';
import 'dotenv/config';

const serv = express();
const secret = process.env.SECRET;
const options = {expiresIn: '15m'};
serv.use(express.json());

serv.use(uRouter);
// createUsersTable();

// serv.use((req, res, next) => {
//     res.header({
//         'Access-Control-Allow-Origin': '*',
//         'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE',
//         'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'});
//     next();
// })

// serv.get('/', (req, res) => {
//     try{
//         const all = JSON.parse(fs.readFileSync('./testpubs.json'));
//     res.send(all);
//     } catch (e) {
//         res.send(e.message);
//     }
    
// })

serv.post('/admin', (req, res) => {
    console.log('backend admin received!');
    // console.log(req.body);
    if(req.body.username !== process.env.ADMIN_USERNAME || req.body.password !== process.env.ADMIN_PASSWORD) {
        res.status(401).send("Wrong credentials")
    } else {
        res.status(204).send(jwt.sign({user: process.env.ADMIN_USERNAME}, secret, options))
    }
})

const PORT = process.env.PORT;
serv.listen(PORT, () => {
    console.log("Listening to port ", PORT);
})