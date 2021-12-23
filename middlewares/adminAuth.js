const jwt = require('jsonwebtoken')
const User = require('../models/user')

const adminAuth = (req,res,next) => {
    let token = req.headers['access_token'] || req.headers['authorization']
    if (token.startsWith('Bearer')) {
        token = token.slice(7, token.length);
      }
    if(token) {
        jwt.verify(token,'EVA',(err,decoded) => {
            if(err || decoded.role == 'user') next({name : 'INVALID_TOKEN'})
            else {
                next()
            }
        })
    }else next({name : 'MISSING_TOKEN'})
}
module.exports = adminAuth