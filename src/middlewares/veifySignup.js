import { ROLES } from "../models/Roles.js"
import User from '../models/User.js'

export const checkExistingUser = async (req, res, next) => {
  try {
    const { username, email } = req.body 
    const userFound = await User.findOne({ username });
    if (userFound)
      return res.status(400).json({ message: "The user already exists" });

    const findEmail = await User.findOne({ email });
    if (findEmail)
      return res.status(400).json({ message: "The email already exists" });

    next();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const checkRolesExisted = (req, res, next) => {
  const { roles } = req.body 
  if (roles) {
    for (let i = 0; i < roles.length; i++) {
      if(!ROLES.includes(roles[i])) {
        return res.status(400).json({
          message: `Role ${roles[1]} does not exists`
        })
      }
    }
  }
  next();
}