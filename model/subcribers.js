const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const validator = require('validator')

const subcriberSchema = mongoose.Schema ({
    first_name : {
        type : String
    },
    last_name : {
        type : String
    },
    nationality : {
        type : String
    },
    city : {
        type : String
    },
    age : {
        type : String
    },
    work_status : {
        type : String
    },
    tech_field : {
        type : String
    },
    username : {
        type : String
    },
    email : {
        type : String,
        validate : [validator.isEmail, 'Email is invalid']
    },
    password : {
        type : String
    },
    confirmPassword : {
        type : String,
        validate : {
            validator : function (el) {
                return el === this.password
            }
        }
    }
})




module.exports = mongoose.model('Subcribers', subcriberSchema)