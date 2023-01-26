import { Request, Response } from "express";
import User from "../models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import authConfig from "../config/auth.json";

function generateToken(id: string) {
   return jwt.sign({ id: id }, authConfig.secret, {
      expiresIn: 86400,
   });
}

class AuthController {
   async register(req: Request, res: Response) {
      const { email } = req.body;
      try {
         if (await User.findOne({ email })) {
            return res.status(400).send({ error: "User already exists" });
         }

         const user = await User.create(req.body);

         user.password = "";

         return res.send({ user, token: generateToken(user._id.toString()) });
      } catch (err) {
         return res.status(400).send({ error: "Registration failed" });
      }
   }

   async authenticate(req: Request, res: Response) {
      const { email, password } = req.body;

      const user = await User.findOne({ email }).select("+password");

      if (!user) {
         return res.status(400).send({ error: "User not found" });
      }

      if (!(await bcrypt.compare(password, user.password))) {
         return res.status(400).send({ error: "Invalid password" });
      }

      user.password = "";

      res.send({ user, token: generateToken(user._id.toString()) });
   }
}

export default new AuthController();
