const mongoose=require('mongoose')
const connection=mongoose.connect("mongodb://0.0.0.0/netflix").then(()=>{
    console.log("connected");
    
})
module.exports=connection