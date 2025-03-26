import userService from "../services/userService.js";
import formatUserdata from "../helpers/dataFormatter.js";

const createUser = async(req, res) =>{
    try{
        const user = await userService.createUser(req.body);
        res.json(user);
    
    }   
    catch(error){
        res.status(500).send(error.message);
    }
};


const deleteUser = async(req, res) =>{
    try{
        const user = await userService.deleteUser(req.params.id);
        res.status(500).send(`User deleted successfully of id": ${req.params.id}`);
    
    }   
    catch(error){
        res.status(500).send(error.message);
    }
};

const getallusers = async (req, res) =>{
    try {
        
        const users = await userService.getallusers();
        const formattedUsers = users.map((user) => formatUserdata(user));
        res.json(formattedUsers);
    } catch (error) {
        res.status(500).send(error.message);
        
    }
}

const uploadProfileImage = async (req, res) => {
    const file = req.file;
    const userId = req.user.id;
    try {
      const user = await userService.uploadProfileImage(userId, file);
      res.json(formatUserdata(user));
    } catch (error) {
      res.status(500).send(error.message);
    }
  };

export {createUser, deleteUser, getallusers, uploadProfileImage};
//  yaha export chai userController.js file bata export gareko ho jasle chai userRoute.js file ma import garera use garna milxa