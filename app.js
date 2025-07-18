// const express=require('express')
// const bcrypt=require('bcrypt')
// const user_model=require('./models/user.js')
// const db_connection=require('./config/db.js');
// const { JsonWebTokenError } = require('jsonwebtoken');
// const app=express();
// const jwt=require('jsonwebtoken')
// const cookie=require('cookie-parser');
// const cookieParser = require('cookie-parser');


// app.use(express.static('public'))
// app.use(express.json())
// app.use(express.urlencoded({extended:true}))
// app.set("view engine","ejs")
// app.use(cookieParser())


// app.get("/",(req,res)=>{
//     res.render('main');
// })

// app.post("/create",async (req,res)=>{
//     const {email,password,age}=req.body;
//     bcrypt.genSalt(10,(err,salt)=>{
//         bcrypt.hash(password,salt,async(err,hash)=>{
//             const user=await user_model.create({
//                 email,
//                 password:hash,
//                 age,
//             })
//             let token=jwt.sign({email},"secret");
//             res.cookie("token",token)
//             res.send(user)
//         })
//     })

// })
// app.get("/sign_up",async (req,res)=>{
//     let u=await user_model.findOne({email:req.body.email})
//     if(!user){
//         return res.send("wrong")
//     }
//     bcrypt.compare(req.body.password,u.password,function(err,result){
//         if(result){
//             res.send("yes");
//         }
//         else{
//             res.send("wrong")
//         }
//     })
// })




// app.post("/",async(req,res)=>{
//     let user= await user_model.findOne({email})
//     if(!user){
//         return res.send("something went wrong")
//     }
//     bcrypt.compare(req.body.password,user.password),(err,result)=>{
//         if(result){
//             res.send('login successfull')
//               let token=jwt.sign({email},"secret");
//                 res.cookie("token",token)

//         }
//         else{
//             res.send("something went wrong")
//         }
//     }
// })
// app.get("/sign_up",(req,res)=>{
//     res.render('sign_up')
// })
// app.post('/sign_up',async (req,res)=>{
//    // res.render('sign_up')
//      const {
//         email,
//         password,
//         age,
//     }= req.body;
//     bcrypt.genSalt(10,(err,salt)=>{
//             bcrypt.hash(password,salt,async(err,hash)=>{
//    // console.log(req.body);
    
    
//     const newuser = await user_model.create({
//         email:email,
//         password:hash,
//         age:age,
//     })
//     let token=jsonWebToken.sign({email},"secret");
//     res.cookie("token",token)
//     res.send("data recieved")


// })})});

// app.post("/home",async (req,res)=>{
//     res.send("hello");
//     // const {
//     //     email,
//     //     password,
//     //     age,
//     // }= req.body;
//     // console.log(req.body);
    
    
//     // const newuser = await user_model.create({
//     //     email:email,
//     //     password:password,
//     //     age:age,
//     // })
//     // res.send("data recieved")
//     // res.send(newuser)
// })

// app.listen(5000)
const express = require('express');
const bcrypt = require('bcrypt');
const user_model = require('./models/user.js');
const db_connection = require('./config/db.js');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');

const app = express();

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.set("view engine", "ejs");

// Main page (Login form)
app.get("/", (req, res) => {
    res.render('main');
});

// Login logic

app.post("/", async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await user_model.findOne({ email });
        if (!user) return res.send("User not found");

        const match = await bcrypt.compare(password, user.password);
        if (match) {
            const token = jwt.sign({ email }, "secret", { expiresIn: '1h' });
            res.cookie("token", token);
           
            res.redirect('home')
        } else {
            res.send("Incorrect password");
        }
    } catch (err) {
        console.error(err);
        res.send("Something went wrong");
    }
});

// Signup page
app.get("/sign_up", (req, res) => {
    res.render('sign_up');
});
app.get("/home",(req,res)=>{
    res.render('home')
})

// Signup logic
app.post('/sign_up', async (req, res) => {
    const { email, password, age } = req.body;

    try {
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);

        const newuser = await user_model.create({
            email,
            password: hash,
            age,
        });

        const token = jwt.sign({ email }, "secret", { expiresIn: '1h' });
        res.cookie("token", token);
        res.send("Signup successful");
    } catch (err) {
        console.error(err);
        res.send("Signup failed");
    }
});

app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});
