const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required:true
    },
    email:{
        type: String,
        required:true
    },
    password:{
        type: String,
        required:true
    },
    role:{
        type: String,
        required:true
    }
})

const User = mongoose.model('User',userSchema);
module.exports = User;


// {
//     "name":"Abhishek",
//     "email":"a@a.com",
//     "password":"qwerty123",
//     "role":"user"
// }
// {
//     "name":"Abhiram",
//     "email":"ar@a.com",
//     "password":"asdfd123",
//     "role":"admin"
// }