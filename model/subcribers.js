const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const validator = require('validator')
const jwt = require('jsonwebtoken')

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

subcriberSchema.pre('save', async function (){
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
    this.confirmPassword = undefined
})

subcriberSchema.methods.comparePasswords = async function (userPassword) {
    const isMatch = await bcrypt.compare(userPassword, this.password)
    return isMatch
}

subcriberSchema.methods.createJWT = function () {
    return jwt.sign({
        id : this._id, username : this.username},
        process.env.JWT_SECRET,
        {expiresIn : process.env.JWT_EXPIRES})
}


module.exports = mongoose.model('Subcribers', subcriberSchema)