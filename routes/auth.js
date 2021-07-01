const express = require('express')
const bcrypt = require('bcryptjs')
const config = require('config')
const jwt = require('jsonwebtoken')
const {check,validationResult} = require('express-validator')
const router = express.Router()

const User = require('../models/User')

// @route  Get api/auth
// @desc   Get logged in user
// @access Private
router.get('/',(req,res)=>{
    res.send('Get logged in user')
})

// @route  POST api/auth
// @desc   Auth user and get user
// @access Public
router.post('/',[
    check('email','Please include a valid email').isEmail(),
    check('password',"Password is required").exists()
],async (req,res)=>{
    const errors=validationResult(req)
    if(!errors.isEmpty())return res.status(400).json({errors:errors.array()})
    
    const {email,password}=req.body

    try{
        let user = await User.findOne({email})

        if(!user)res.status(400).json({msg:'Invalid Credentials'})

        const isMatch = await bcrypt.compare(password,user.password)
        
        if(!isMatch)return res.status(400).json({msg:'Invalid Credentials'})

        const payload={
            user:{
                id:user.id
            }
        }

        jwt.sign(payload,config.get('jwtSecret'),{
            expiresIn:36000
        },(err,token)=>{
            if(err)throw err
            res.json({token})
        })

    }catch(ex){
        console.error(ex.message)
        res.send('Server Error').status(500)
    }
})

module.exports = router