import User from '../models/Usermodel.js';
import uploadFile from '../utils/file.js';

const createUser = async(data) =>{

    const user  = await User.create(data);
    return user;
};

const deleteUser = async(id) =>{
    await User.findByIdAndDelete(id);
};

const getallusers = async() =>{
    const users = await User.find();
    return users;
};

const uploadProfileImage = async (userId, file) => {
    
    const uploadedFiles = await uploadFile([file]);
    // console.log(uploadedFile);
  
    return await User.findByIdAndUpdate(
      userId,
      {
        profileImageUrl: uploadedFiles[0]?.url,
      },
      { new: true } // yesle instantly response ma updated data return garxa
    );
  };

export default { createUser, deleteUser, getallusers, uploadProfileImage };