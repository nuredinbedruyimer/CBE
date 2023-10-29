import bcrypt from "bcrypt";
import Joi from "joi";

import { User, validate } from "../model/user.js";
// Register User
export const registerController = async (req, res) => {
  try {
    const { error } = validate(req.body);
    if (error) return res.send({ message: error.details[0].message });

    const user = await User.findOne({ email: req.body.email });
    if (user)
      return res.send({ message: "User with given email already Exist!" });

    const salt = await bcrypt.genSalt(Number(process.env.SALT));
    const hashPassword = await bcrypt.hash(req.body.password, salt);

    await new User({ ...req.body, password: hashPassword }).save();
    res.send({ message: "User created successfully" });
  } catch (error) {
    console.log(error);
    res.send({ message: error });
  }
};

// Login User

export const loginController = async (req, res) => {
  try {
    const { error } = validate1(req.body);
    console.log(req.body);
    if (error) return res.send({ message: error.details[0].message });

    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.send({ message: "Invalid Email or Password" });

    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!validPassword)
      return res.send({ message: "Invalid Email or Password" });

    const token = user.generateAuthToken();
    res.send({ data: token, message: "logged in successfully" });
  } catch (error) {
    res.send({ message: "Internal Server Error" });
  }
};
const validate1 = (data) => {
  const schema = Joi.object({
    email: Joi.string().email().required().label("Email"),
    password: Joi.string().required().label("Password"),
  });
  return schema.validate(data);
};
