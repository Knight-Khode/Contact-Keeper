const jwt = require('jsonwebtoken')
const config = require('config')

module.exports = async function(req,res,next){
    //Get token from header
    const token = req.header('x-auth-token')

    //check if no token
    if(!token)res.status(401).json({msg:'No token, authorization denied'})

    try{
        const decoded= jwt.verify(token,config.get('jwtSecret'))

        req.user = decoded.user
        next()
        
    }catch(ex){
        res.status('401').json({msg:'Token is not valid'})
    }
}