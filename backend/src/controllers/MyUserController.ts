import { Request, Response } from "express";
import User from "../models/user";

const getCurrentuser = async(req: Request, res: Response) => {
  try{
  const currentUser = await User.findOne({_id: req.userId})
  if(!currentUser){
    console.log("message: User not found");
    res.status(404).json({message: "User not found"});
    return;
  }
   res.json(currentUser);
  
    }
    catch(e){
      console.log(e);
      res.status(500).json({ message: "Something went wrong" });
      return;
    }
  
  }

const createCurrentUser = async(req: Request, res: Response ) => {
try{
    const {auth0Id} = req.body;
    const existingUser = await User.findOne({auth0Id});

    if(existingUser) {
       res.status(200).send();
       return;
    }

    const newUser = new User(req.body);
    await newUser.save();
    res.status(201).json(newUser.toObject());
}
catch(e){
    console.log(e);
    res.status(500).json({message: "Error creating user"});
}
};

const updateCurrentUser = async (req: Request, res: Response) => {
    try {
      const { name, addressLine1, country, city } = req.body;
      const user = await User.findById(req.userId);
  
      if (!user) {
        res.status(404).json({ message: "User not found" });
        return ;
      }
  
      user.name = name;
      user.addressLine1 = addressLine1;
      user.city = city;
      user.country = country;
  
      await user.save();
  
      res.send(user);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Error updating user" });
    }
  };



export default {
    createCurrentUser,
    updateCurrentUser,
    getCurrentuser
}


{/* 
  The createCurrentUser function first checks if the user already exists by searching for the auth0Id in the database.
  If the user exists, it returns a 200 status code (nothing to do here).
  If the user doesn’t exist, it creates a new user in the database using the User model (new User(req.body)), saves it to the database (await newUser.save()), and sends the created user as the response.
  If there’s an error, a 500 status code is returned with an error message.
  */}