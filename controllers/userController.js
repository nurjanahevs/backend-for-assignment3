const User = require('../models/user')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

class userController {
    static register(req, res, next) {
        const { email, password,name,role } = req.body
        User.create({ email, password,name,role })
            .then(user => {
                res.status(200).json({ success: true, data: user })
            })
            .catch(next)
    }
    static login(req, res, next) {
        const { email, password } = req.body
        User.findOne({ email : email })
        .then(user => {
            if (user && bcrypt.compareSync(password, user.password)) {
                const token = jwt.sign({_id :  user._id, role : user.role }, 'EVA',{ expiresIn : '24h'})
                res.status(200).send({ success: true, user, token })
            }
                else if(!user) {next({name: 'NOT_FOUND'})}
                else next({name : 'LOGIN_FAILED'})
        })
        .catch(e => {next({name: 'NOT_FOUND'})})
            
    }
    static async getUser(req,res,next) {
         try{
        const getUser = await User.findById(req._userId)
        res.status(200).send({success: true, data : getUser})
         }
         catch(e) { next({name: 'NOT_FOUND'}) }
    }
    static async updateUser(req,res,next) {
        const {name,password,firstname,lastname,address,age} = req.body
        const salt = bcrypt.genSaltSync(10)
        try{
        const newData = {name,password,firstname,lastname,address,age}
        if(password)newData.password = await bcrypt.hashSync(newData.password,salt)
        for(let key in newData) if(!newData[key]) delete newData[key]
        const updateUser = await User.findByIdAndUpdate(req._userId,newData,{new : true })
        res.status(200).json({success : true , data : updateUser })
        }
        catch (e) { next({name: 'NOT_FOUND'}) }
    }
}
module.exports = userController