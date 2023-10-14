const mongoose=require('mongoose');
const bcrypt=require('bcrypt');
const crypto=require('crypto');

var userSchema=new mongoose.Schema(
    {
        firstName:{
            type:String,
            require:true
        },
        lastName:{
            type:String,
            require:true
        },
        email:{
            type:String,
            unique: true,
            require:true
        },
        phone:{
            type:String,
            require:true,
            unique:true
        },
        password:{
            type:String,
            require:true
        },
        role:{
            type : String,  
            default:'user'
        },
        isBlocked:{
            type:Boolean,
            default:false
        },
        cart:{
            type:Array,
            default:[]
        },
        address:{
            type:String
        },
        wishlist:[{
            type:mongoose.Types.ObjectId , 
            ref:"Product"
        }],
        refreshToken:{
            type:String
        },
        passwordChangeAt:Date,
        passwordResetToken:String,
        passowrdResetExpires:Date
    },
    {
        timestamps:true,
    }
);

userSchema.pre("save",async (next)=>{
    if (!this.isModified("password")) {
        next();
      }
      const salt= await bcrypt.genSaltSync(10);
      this.password=await bcrypt.hash(this.password,salt);
      next();
});

userSchema.methods.isPasswordMatched = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
  };
  userSchema.methods.createPasswordResetToken = async function () {
    const resettoken = crypto.randomBytes(32).toString("hex");
    this.passwordResetToken = crypto
      .createHash("sha256")
      .update(resettoken)
      .digest("hex");
    this.passwordResetExpires = Date.now() + 30 * 60 * 1000; // 10 minutes
    return resettoken;
  };

  module.exports = mongoose.model("User", userSchema);