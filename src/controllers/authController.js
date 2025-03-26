import authService from "../services/authService.js";
import {formatUserdata} from "../helpers/dataFormatter.js";
import { createJWT } from "../utils/jwt.js";
import { PASSWORD_REGEX } from "../constants/regex.js";

const login =  async (req, res) => {
    try {
        const {email, phone , password} = req.body;
    if(!email && !phone){
       return res.status(400).send("email or phone is required");
    }
    if(!password){
        return res.status(400).send("password is required");
    }

    // yaha data le chai authservice bata aako response i,e registered vako user ko data dinxa 
    const data = await authService.login(req.body);
  
    const formattedata = formatUserdata(data);
    const token = createJWT(formattedata);
    res.cookie("authToken", token);
    res.json(formattedata);

    } catch (error) {
        return res.status(error.statusCode || 500).send(error.message);
        
    }
    
} 

const register = async (req, res) =>{
    try {
        const { address, email, name, phone, password, confirmPassword} = req.body
        if(!address?.city) return res.status(422).send("address is required");
        if(!email) return res.status(422).send("email is required");
        if(!name) return res.status(422).send("name is required");
        if(!phone) return res.status(422).send("phone is required");
        if(!password) return res.status(422).send("password is required");
        if(!confirmPassword) return res.status(422).send("confirm password is required");
        if(password != confirmPassword) return res.status(422).send("password and confirm password should be same");
        
        if (!PASSWORD_REGEX.test(password)) {
          return res.status(422).send("Password must contain at least 8 characters, including UPPER/lowercase and numbers");
        
        }
        const data = await authService.register(req.body);
        const formattedata = formatUserdata(data);
        const token = createJWT(formattedata);
        res.cookie("authToken", token);
        return res.json(formattedata);

    } catch (error) {
        return  res.status(error.statusCode || 500).send(error.message);
    }
}

const logout = async (req, res) => {
    res.clearCookie("authToken");
    res.json({message:   "Logged out successfully."});
  }
  
  
  const forgotPassword = async (req, res) => {
    const email = req.body.email;
  
    if (!email) return res.status(422).send("Email is required.");
  
    const data = await authService.forgotPassword(email);
  
    res.json(data);
  };
  
  const resetPassword = async (req, res) => {
    const password = req.body.password;
    const confirmPassword = req.body.confirmPassword;
    const token = req.query.token;
    const userId = req.params.userId;
  
    if (!password) return res.status(422).send("Password is required.");
    if (!confirmPassword)
      return res.status(422).send("Confirm password is required.");
  
    if (password != confirmPassword)
      return res.status(422).send("Passwords do not match.");
  
    try {
      const data = await authService.resetPassword(userId, token, password);
  
      res.json(data);
    } catch (error) {
      res.status(error.statusCode || 500).send(error.message);
    }
  };

export {login, register, logout, forgotPassword, resetPassword}; 
