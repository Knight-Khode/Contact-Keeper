const mongoose = require('mongoose')

const ContactSchema= new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    },
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
    },
    phone:{
        type:String
    },
    type:{
        type:String,
        default:'personal'
    },
    date:{
        type:Date,
        default:Date.now
    }
})

const Contact = mongoose.model('contacts',ContactSchema)

module.exports=Contact