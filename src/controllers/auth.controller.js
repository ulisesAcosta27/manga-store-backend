import User from '../models/User.js'
import Role from '../models/Roles.js'
import jwt from 'jsonwebtoken'
import config from '../config.js'

export const signUp = async (req, res) => {
  const { username, email, password, roles } = req.body
  const newUser = new User({
    username,
    email,
    password: await User.encryptPassword(password),
  })

  if (roles) {
    const foundRoles = await Role.find({ name: { $in: roles } });
    console.log(foundRoles)
    newUser.roles = foundRoles.map((role) => role._id);
  } else {
    const role = await Role.findOne({ name: "user" });
    newUser.roles = [role._id];
  }

  const userSaved = await newUser.save()
  const token = jwt.sign({ id: userSaved._id }, config.SECRET, {
    expiresIn: 86400
  })
  return res.json({
    status: 200,
    message: "user successfully created",
    scope: "controllers/auth.controllers.js", 
    token 
  })
}

export const signIn = async (req, res) => {
  const { email, password } = req.body
  const userFound = await User.findOne({ email: email }).populate(
    "roles"
  );
  if (!userFound) return res.status(400).json({ message: "User Not Found" });

  const matchPassword = await User.comparePassword(
    password,
    userFound.password
  );

  if (!matchPassword)
    return res.status(401).json({
      token: null,
      message: "Invalid Password",
    });

  const token = jwt.sign({ id: userFound._id }, config.SECRET, {
    expiresIn: 86400, 
  });

  return res.status(200).json({
    status: 200,
    message: "user successfully registered",
    scope: "controllers/auth.controllers.js",
    token
  })
}

