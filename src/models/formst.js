const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken");

const formschema = new mongoose.Schema({


    name: {
        type: String,
        required: true,
        trim: true
    },
    phone: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,



    },

    address: {
        type: String,
        required: true
    },

    dob: {
        type: Date,
        required: true,
        trim: true
    },

    gender: {
        type: String,
        required: true
    },

    class: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    confirm_password: {
        type: String,
        // required: true
    },
    tokens: [{
        token: {
            type: "String",
            required: true
        }
    }]


});

//define token instance use methods , collection use static

formschema.methods.generatetoken = async function () {
    try {
        console.log(this._id);
        const token = await jwt.sign({ _id: this._id.toString() }, process.env.SECRET_KEY );

        this.tokens = this.tokens.concat({token:token});

       const tokensave= await this.save();
        console.log(token);

        return token

    } catch (e) {
        res.send("error")

    }
}







// password convert into hash
formschema.pre("save", async function (next) {

    if (this.isModified("password")) {
        // const passhash = await bcrypt.hash(password,10)
        console.log(`the current pass is ${this.password}`)

        this.password = await bcrypt.hash(this.password, 10);
        this.confirm_password  = await bcrypt.hash(this.password, 10);
        console.log(this.password)

        // this.confirm_password = undefined;
    }
    next()

})




//create model or table
const Regieterdata = new mongoose.model("Registerdata", formschema);


module.exports = Regieterdata;    //export