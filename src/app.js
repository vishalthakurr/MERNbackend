require("dotenv").config();
const express = require("express");
const path = require("path")                  // use for static path 
const app = express();
const bcrypt = require("bcryptjs")
const jwt =require("jsonwebtoken");
require("./db/conn");
const Registerdata = require("./models/formst")        // schema emport
const hbs = require("hbs");                         // connect to db
const { config } = require("dotenv");
const port = process.env.PORT | 8000

// const p = path.join(__dirname ,"../public")    // static website  (index.html)
// console.log(p)
// app.use(express.static(p)) 

app.use(express.json());
app.use(express.urlencoded({ extended: false }))         ///get data to fron not undefine

const temolatepath = path.join(__dirname, "../templates/views")
const partialpath = path.join(__dirname, "../templates/partials")

// console.log(temolatepath)
// console.log(partialpath)
app.set("view engine", "hbs")
app.set("views", temolatepath);
hbs.registerPartials(partialpath)



app.get("/", (req, res) => {

    res.render("index");

})
// app.get("/register", (req, res) => {
//     res.render("register");

// })

//create new user database

app.post("/register", async (req, res) => {
    
    try {

        const pass = req.body.password
        const cpass = req.body.confirm_password

        if (pass == cpass){

            const studentdata = new Registerdata({

                name: req.body.name,
                phone: req.body.phone,
                email: req.body.email,
                address: req.body.address,
                dob: req.body.dob,
                gender: req.body.gender,
                class: req.body.class,
                password: pass,
                confirm_password:cpass
            })

            // Hash password  concept of middleware


            //generate token for the user
            const token = await studentdata.generatetoken();
            // console.log(token)


            const stored = await studentdata.save()
            res.status(201).render("register")
        }
         else {
            res.send("invalid detail")
        }

    } catch (e) {
        res.status(400).send(e)
    }


})


// authentication  token using in express
// const jwt =require("jsonwebtoken");

// const createtoken =  async ()=>{

//     const token = await  jwt.sign({_id:"111111111111"},"vishalthakur2000",{
//         expiresIn:"2 second"
//     });
//     console.log(token);

//     const userverfy= await jwt.verify(token,"vishalthakur2000")
//     console.log(userverfy)
// }

// createtoken();


app.listen(port, () => {
    console.log(`listen port sucess ${port}`)
})