
const mongoose = require('mongoose');

var Register = mongoose.model('RegisterUsers', {
    fname: { type: String },
    lname: {type : String},
    Email: { type: String },
    password: {type: String},
    isLoginuser: {type: Number,default:1}

});
module.exports = { Register }