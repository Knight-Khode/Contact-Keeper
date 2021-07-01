const express = require('express')
const router = express.Router()
const {check,validationResult} = require('express-validator')

const User = require('../models/User')
const Contact = require('../models/Contact')
const auth = require('../middleware/auth')

// @route  GET api/contacts
// @desc   Get all users contacts
// @access Private
router.get('/',auth,async(req,res)=>{
    try{
        const contacts = await Contact.find({user:req.user.id}).sort({date:-1})
        res.json(contacts)

    }catch(ex){
        console.error(ex.message)
        res.status(500).send('Server Error')
    }
})

// @route  POST api/contacts
// @desc   Add new contacts
// @access Private
router.post('/',[
auth,[
    check('name', 'Name is required').not().isEmpty(),
    check('email','Please enter valid email').isEmail()
]
],async (req,res)=>{
    const errors=validationResult(req)
    if(!errors.isEmpty())return res.status(400).json({errors:errors.array()})
    
    const {name,email,phone,type}=req.body

    try{
        const newContact = new Contact({
            name,
            email,
            phone,
            type,
            user:req.user.id
        })

        const contact = await newContact.save()
        res.json(contact)
    }catch(err){
        console.error(err.message)
        res.status(500).send('Server Error')
    }
})

// @route  PUT api/contacts/:id
// @desc   Update contact
// @access Private
router.put('/:id',auth,async(req,res)=>{
    const {name,email,phone,type}=req.body

    //build contact object
    const contactFileds = {}
    if(name) contactFileds.name=name
    if(email) contactFileds.email=email
    if(phone) contactFileds.phone = phone
    if(type) contactFileds.type = type

    try{
        let contact = await Contact.findById(req.params.id)
        if(!contact)return res.status(404).json({msg:'Contact not found'})
        
        //Make sure user owns contact
        if(contact.user.toString() !== req.user.id)return res.status(401).json({msg:'Not authorised'})

        contact = await Contact.findByIdAndUpdate(req.params.id,{
            $set:contactFileds
        },{new:true})

        res.json(contact)
    }catch(ex){
        console.error(ex.message)
        res.status(500).send('Server Error')
    }
})

// @route  DELETE api/contacts/:id
// @desc   Delete contact
// @access Private
router.delete('/:id',(req,res)=>{
    res.send('Delete contact')
})

module.exports = router