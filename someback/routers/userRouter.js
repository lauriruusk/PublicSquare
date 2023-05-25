import express from 'express';
import argon from 'argon2';
import jwt from 'jsonwebtoken';
import fs from 'fs';
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

router.post('/register', async (req, res) => {
    if(!req.body.email || !req.body.password) {
        res.status(400).send('Some info missing!');
    } else {
        let email = req.body.email;
        let pWord = req.body.password;
        let rows = 0;
        argon.hash(pWord).then(result => {
            const user ={ email: email, password: result};
            addUserToDatabase(user).then(received => {
                rows = received.rowCount;
            })
        });
        
        if(rows === 0) {
            res.status(401).send("Email already in use!")
        } else {
            const token = jwt.sign({user: email}, secret, options);
            res.status(200).send(`Bearer ${token}`);
        }    
    }

})

router.post('/login', async (req, res) => {
    if(!req.body.email || !req.body.password) {
        res.status(400).send("Some info missing!");
    } else {
        console.log('Login received!');
        const userRaw = await loginData(req.body);
        const user = JSON.parse(userRaw);
        let pw = req.body.password;
        let hash = user[0].password;
        argon.verify(hash, pw).then(result => {
            const token = jwt.sign({username: user.email}, secret, options)
            result ? res.status(200).send(`Bearer ${token}`) : res.status(401).send();
        }) 
    }
})

export default router;