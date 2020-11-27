import bcrypt from "bcrypt";
import dotenv from "dotenv";
import { registerValidation, loginValidation, profileValidate } from "../validation/userValidation";
import User from "../services/User";
import jwtHelper from "../utilities/Jwt";

dotenv.config();
const { generateToken } = jwtHelper;
/**
 * @class UserController
 * @description create, verify and log in user
 * @exports UserController
 */
export default class UserController {
  /**
   * @param {object} req - The user request object
   * @param {object} res - The user response object
   * @returns {object} Success message
   */
  static async registerUser(req, res) {
    try {
      const { error } = registerValidation(req.body);
      if (error) {
        return res.status(400).json({ status: 400, error: error.message });
      }
      const { email, username, password } = req.body;
      const Email = email.toLowerCase();
      const Username = username.toLowerCase();
      const emailExist = await User.emailExist(Email);
      if (emailExist) return res.status(409).json({ status: 409, error: "Email already used by another user." });
      const usernameExist = await User.usernameExist(Username);
      if (usernameExist) return res.status(409).json({ status: 409, error: `Sorry, ${username} is not available. Please pick another username` });
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = { email: Email, username: Username, password: hashedPassword };
      const createdUser = await User.createUser(newUser);
      //   const token = await generateToken({ createdUser });
      return res.status(201).json({
        status: 201,
        message: "User created successfully",
        data: `Thank you for registering ${createdUser.username} `
      });
    } catch (error) {
      return res.status(500).json({ status: 500, error: "Server Error" });
    }
  }

  /**
   * @param {object} req - The user request object
   * @param {object} res - The user response object
   * @returns {object} Success message
   */
  static async loginUser(req, res) {
    try {
      const { error } = loginValidation(req.body);
      if (error) return res.status(400).json({ status: 400, error: error.message });
      const { email, password } = req.body;
      const Email = email.toLowerCase();
      const user = await User.emailExist(Email);
      if (!user) return res.status(404).json({ status: 404, error: "Email does not exist." });
      const validpass = await bcrypt.compare(password, user.password);
      if (!validpass) return res.status(404).json({ status: 400, error: "Password is not correct!." });
      if (!user.active) {
        return res.status(403).send({ message: "Sorry User has been De-activated, Please contact an admin." });
      }
      const token = await generateToken({ user });
      return res.status(200).json({
        status: 200,
        message: "User Logged in Successfully",
        data: token
      });
    } catch (error) {
      return res.status(500).json({ status: 500, error: "Server error." });
    }
  }

  /**
   * @param {object} req - The user request object
   * @param {object} res - The user response object
   * @returns {object} Success message
   */
  static async updateUserProfile(req, res) {
    try {
      const { id } = req.decoded.user;
      const { error } = profileValidate(req.body);
      if (error) return res.status(400).json({ status: 400, error: error.message });
      const updatedProfile = await User.updateUserProfile(id, req.body);
      return res.status(200).json({ status: 200, message: "User profile updated", data: updatedProfile[1] });
    } catch (error) {
      return res.status(500).json({ status: 500, error: "Server error." });
    }
  }
}
