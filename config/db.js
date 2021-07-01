const mongoose = require('mongoose')

const connectDB = async ()=>{
    try{
        await mongoose.connect("mongodb://localhost/Contact-Keeper",{
            useCreateIndex:true,
            useFindAndModify:false,
            useNewUrlParser:true,
            useUnifiedTopology:true
        })
        console.log('Connected to mongodb...')
    }catch(ex){
        console.error(ex.message)
        process.exit(1)
    }
}

module.exports=connectDB