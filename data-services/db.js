//database connection

//import

const mongoose=require('mongoose')

//connection

mongoose.connect("mongodb://localhost:27017/bankServer",{
    useNewUrlParser:true
})

//create model

const User=mongoose.model("User",{
    acc:Number,
    usname:String,
    passwd:String,
    bal:Number,
    transaction:[]

})

//export
module.exports={
    User
}