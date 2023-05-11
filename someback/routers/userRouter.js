import express from 'express';
import argon from 'argon2';
import jwt from 'jsonwebtoken';
import 'dotenv/config';
const router = express.Router();

let users = [];
const secret = process.env.SECRET;
const options = {expiresIn: '15m'};

router.post('/register', (req, res) => {
    if(!req.body.username || !req.body.password) {
        res.status(400).send('Some info missing!');
    } else {
        let userName = req.body.username;
        let pWord = req.body.password;
        
        argon.hash(pWord).then(result => {
            let user = { username: userName, password: result};
            users.push(user);
            // console.log(users);
        });
        const token = jwt.sign({user: userName}, secret, options);
        res.status(200).send(`Bearer ${token}`);
    }

})

router.post('/login', (req, res) => {
    if(!req.body.username || !req.body.password) {
        res.status(400).send("Some info missing!");
    } else {
        const user = users[users.indexOf(users.find(u => u.username === req.body.username))];
        let pw = req.body.password;
        let hash = user.password;
        argon.verify(hash, pw).then(result => {
            const token = jwt.sign({username: user.username}, secret, options)
            result ? res.status(200).send(`Bearer ${token}`) : res.status(401).send();
        })
    }
})

export default router;