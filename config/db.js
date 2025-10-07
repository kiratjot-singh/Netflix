 const mongoose=require('mongoose')
 const connection=mongoose.connect("mongodb://0.0.0.0/netflix").then(()=>{
     console.log("connected");
    
 })
 module.exports=connection
// const mongoose = require("mongoose");

// mongoose.connect(process.env.MONGO_URL, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
// })
// .then(() => console.log("✅ MongoDB Connected"))
// .catch((err) => console.error("❌ MongoDB Connection Error:", err));
// const mongoose = require("mongoose");

// const connectDB = async () => {
//   try {
//     await mongoose.connect(process.env.MONGO_URL);
//     console.log("🔍 MONGO_URL:", process.env.MONGO_URL);
//   } catch (error) {
//     console.error("❌ MongoDB Connection Error:", error.message);
//     process.exit(1);
//   }
// };

// module.exports = connectDB;

