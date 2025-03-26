import User from '../models/Usermodel.js';
import bcrypt from 'bcryptjs';
import ResetPassword from "../models/ResetPassword.js";

const login = async(data) => {
    const user =  await User.findOne({
        $or: [{email: data.email}, {phone: data.phone}],
    });

    if(!user){
        throw{
            message: "Invalid credentials or User not found",
            statusCode: 400,
        };
    }

    const ispasswordmatched =  bcrypt.compareSync(data.password, user.password);

    if(!ispasswordmatched){
        throw{
            message: "Incorrect email or password!",
            statusCode: 400,
        };
    }
    // yesle chai login gareko user ko data return garxa
    return user;
    
}

const register = async (data) => {
 const user =   await User.findOne({
     $or:  [{email: data.email}, {phone:data.phone}],

});

if(user){
    throw{
        message: "user already exists",
        statusCode: 400
    };
}

const hashedPassword = bcrypt.hashSync(data.password);

return await User.create({
    email: data.email,
    address: data.address,
    password: hashedPassword,
    name: data.name,
    phone: data.phone,
    roles: data.roles,

})


};

const forgotPassword =  async(email)=> {
  const user =  await User.findOne({email});

  if (!user){
    throw {
        statusCode: 404,
        message: "user not found"
    };
  }

  const otp = Math.floor(Math.random() *1000000);

  await ResetPassword.create({
    userId: user?._id,
    token: otp,
  })

  return {message: "Reset password link has been sent!"};

};

const resetPassword = async (userId, token, password)=> {
  const data =  await ResetPassword.findOne({
        userId,
        expiresAt: {$gt: Date.now() },
    });

    if (!data || data.token !== token) {
        throw {
            statusCode: 400,
            message: "Invalid TOken",
        };
    }

    if (data.isUsed) {
        throw {
          statusCode: 400,
          message: "Token already used.",
        };
      }
    
      const hashedPassword = bcrypt.hashSync(password);
    
      await User.findByIdAndUpdate(userId, {
        password: hashedPassword,
      });
    
      await ResetPassword.findByIdAndUpdate(data._id, {
        isUsed: true,
      });
    
      return { message: "Password reset successful." };
    };



export default {register, login, forgotPassword, resetPassword};
