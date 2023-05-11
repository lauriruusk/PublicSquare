import express from 'express';
import argon from 'argon2';
import jwt from 'jsonwebtoken';
import fs from 'fs';
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
    if(!req.body.userid || !req.body.password) {
        res.status(400).send('Some info missing!');
    } else {
        let userId = req.body.userid;
        let pWord = req.body.password;
        
        argon.hash(pWord).then(result => {
            let users = JSON.parse(fs.readFileSync('testusers.json'));
            // console.log(users);
            let user = { userid: userId, password: result};
            console.log(user);
            users.push(user);
            fs.writeFileSync('testusers.json', JSON.stringify(users, 4));
            // console.log(users);
        });
        const token = jwt.sign({user: userId}, secret, options);
        res.status(200).send(`Bearer ${token}`);
    }

})

router.post('/login', (req, res) => {
    if(!req.body.username || !req.body.password) {
        res.status(400).send("Some info missing!");
    } else {
        console.log('Received!');
        console.log(req.body);
        const users = JSON.parse(fs.readFileSync('testusers.json'));
        const user = users[users.indexOf(users.find(u => u.userid === req.body.username))];
        let pw = req.body.password;
        let hash = user.password;
        argon.verify(hash, pw).then(result => {
            const token = jwt.sign({username: user.email}, secret, options)
            result ? res.status(200).send(`Bearer ${token}`) : res.status(401).send();
        })
    }
})

export default router;