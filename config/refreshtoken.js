require('dotenv').config()

const jwt=require('jsonwebtoken');

const generateRefreshToken=(id)=>{
    return jwt.sign({id:id},process.env.JWT_SECRET,{expires:"3d"});
};

module.exports=generateRefreshToken;