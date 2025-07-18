// const mongoose=require('mongoose')
// const connection=mongoose.connect("mongodb://0.0.0.0/netflix").then(()=>{
//     console.log("connected");
    
// })
// module.exports=connection
const mongoose = require("mongoose");

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log("✅ MongoDB Connected"))
.catch((err) => console.error("❌ MongoDB Connection Error:", err));
