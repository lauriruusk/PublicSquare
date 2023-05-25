import express from 'express';
import fs from 'fs';
import uRouter from './routers/userRouter.js';
import argon from 'argon2';
import  {createUsersTable, addUserToDatabase, initialUsers}  from './routers/database.js'
import jwt from 'jsonwebtoken';
import 'dotenv/config';

const serv = express();
const secret = process.env.SECRET;
const options = {expiresIn: '15m'};
serv.use(express.json());

serv.use(uRouter);

serv.use((req, res, next) => {
    res.header({
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE',
        'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'});
    next();
})

const addInitialUsers = async () => {
    let users = JSON.parse(fs.readFileSync('testusers.json'));
    // console.log(users);
    await users.map(u => {
        argon.hash(u.password).then(result => {
            u.password = result;
            initialUsers(u)
        })
    })
}

// addInitialUsers();

serv.post('/admin', (req, res) => {
    console.log('admin attempt received!');
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