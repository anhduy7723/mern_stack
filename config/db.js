const mongoose=require('mongoose');

const dbConnect=()=>{
    try{
        const con=mongoose.connect(process.env.MONGO_URL);
        console.log("Database connected successfully");
    } catch(err){
        console.log("Error");
    }
};
module.exports=dbConnect;