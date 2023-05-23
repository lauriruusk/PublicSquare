import express from 'express';
import argon from 'argon2';
import jwt from 'jsonwebtoken';
import fs from 'fs';
import User from '../models/user.js';
// import addUserToDatabase from './databaseRouter.js';
import { addUserToDatabase, loginData } from './database.js';
import 'dotenv/config';
const router = express.Router();

let users = JSON.parse(fs.readFileSync('testusers.json'));
const secret = process.env.SECRET;
const options = {expiresIn: '15m'};
router.use((req, res, next) => {
    res.header({
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE',
        'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'});
    next();
})

router.post('/register', (req, res) => {
    if(!req.body.email || !req.body.password) {
        res.status(400).send('Some info missing!');
    } else {
        let email = req.body.email;
        let pWord = req.body.password;
        
        argon.hash(pWord).then(result => {
            // TODO create users into MongoDB instead
            let users = JSON.parse(fs.readFileSync('testusers.json'));
            // console.log(users);
            const user = new User({ email: email, password: result});
            console.log(user);
            users.push(user);
            // adds user into postgreSql database
            addUserToDatabase(user);
            // user.save().then(console.log('Success!'));
            // fs.writeFileSync('testusers.json', JSON.stringify(users, 4));
            // console.log(users);
        });
        const token = jwt.sign({user: email}, secret, options);
        res.status(200).send(`Bearer ${token}`);
    }

})

router.post('/login', (req, res) => {
    if(!req.body.email || !req.body.password) {
        res.status(400).send("Some info missing!");
    } else {
        console.log('Received!');
        console.log(req.body);
        const users = JSON.parse(fs.readFileSync('testusers.json'));
        //TODO get users from MongoDB instead
        const user = loginData(req.body)
        let pw = req.body.password;
        let hash = user.password;
        argon.verify(hash, pw).then(result => {
            const token = jwt.sign({username: user.email}, secret, options)
            result ? res.status(200).send(`Bearer ${token}`) : res.status(401).send();
        })
    }
})

export default router;