const mongoose = require("mongoose");

mongoose.connect(process.env.DBNAME, {
    useCreateIndex:true,
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useFindAndModify:false
}).then(()=>{
    console.log("connection sucessful")
}).catch((e)=>{
    console.log(e);
})