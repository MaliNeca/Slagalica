import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let User = new Schema({
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    mail: {
        type: String
    },
    occupation: {
        type: String
    },
    username: {
        type: String
    },
    password: {
        type: String
    },
    gender: {
        type: String
    },
    jmbg: {
        type: String
    },
    picture: {
        type: String
    },
    question: {
        type: String
    },
    answer: {
        type: String
    },
    type: {
        type: String
    },
    approved: {
        type: String
    }
});

export default mongoose.model('User', User);