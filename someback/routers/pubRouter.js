import express from 'express';
import { getAllPublications, getFilteredPublications } from './database.js';
const pubRouter = express.Router();

pubRouter.get('/', (req, res) => {
    if(!req.body){
        const pubs = getAllPublications();
        res.status(200).send(pubs);
    } else {
        const pubs = getFilteredPublications(req.body);
        res.status(200).send(pubs);
    }
    
})