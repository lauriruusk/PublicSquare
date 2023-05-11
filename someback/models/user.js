import mongoose from 'mongoose';
import 'dotenv/config';
mongoose.set('strictQuery', false)
const uri = process.env.MONGO_URI;


mongoose.connect(uri).then(result => {
    console.log('Connected to MongoDB');
}).catch((e) => {
    console.log('Error connecting to MongoDB: ', e.message);
})

const userSchema = mongoose.Schema({
    userid: Number,
    email: String,
    firstname: String,
    lastname: String,
    phone: String,
    birthday: Date,
    password: String
})

userSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
    }
  })

export default new Model('User', userSchema);