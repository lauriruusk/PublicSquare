import mongo from 'mongodb';
import mongoose from 'mongoose';
import User from '../models/user';
import 'dotenv/config';

const uri = process.env.MONGO_URI;

mongoose.connect(uri)

const addUserToDatabase = (param) => {
    try{
        const juuseri = new User({
            userid: param.id,
            email: param.email,
            firstname: param.firstname,
            lastname: param.lastname,
            phone: param.phone,
            birthday: param.birthday,
            password: param.password
        })
        mongoose.connect(uri);
        juuseri.save().then(result => {
            console.log('saved!');
            mongoose.connection.close();
        })
        
    } catch (e) {
        console.log(e.message);
    }
}

const getUserFromDatabase = (param) => {
    if(param){
        return param
    }
}



export default {getUserFromDatabase, addUserToDatabase}