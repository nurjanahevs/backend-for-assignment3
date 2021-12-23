const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    password: {
        type: String,
        required: true,
        minlength:6,
        maxlength:20,
    },
    name : {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: 'user'
    },
    age : {
        type: String,
        default: null
    },
    firstname : {
        type: String,
        default : null
    },
    lastname : {
        type: String,
        default: null
    },
    address : {
        type : String,
        default : null
    }

})

userSchema.pre('save', function (next) {
    DataUser.findOne({ email: this.email })
        .then((user) => {
            if (user) next({name: 'ALREADYEXIST' })
            else {
                const salt = bcrypt.genSaltSync(10)
                this.password = bcrypt.hashSync(this.password, salt)
                next()
            }
        })
        .catch(next)
})
const DataUser = mongoose.model('User', userSchema);
module.exports = DataUser;