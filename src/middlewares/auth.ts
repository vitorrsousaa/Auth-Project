import { NextFunction, request, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

import authConfig from "../config/auth.json";

interface IPayload {
   sub: string;
}

// SEPARAR O ERRO DO MIDDLEWARE PARA OUTRO HANDLER

export default function authValidate(
   req: Request,
   res: Response,
   next: NextFunction
) {
   const authHeader = req.headers.authorization;

   if (!authHeader) {
      return res.status(401).send({ error: "No token provided" });
   }

   // Verificar se o token esta no formato JWT

   const parts = authHeader.split(" ");

   if (!(parts.length === 2)) {
      return res.status(401).send({ error: "Token error" });
   }

   const [scheme, token] = parts;

   if (!/^Bearer$/i.test(scheme)) {
      return res.status(401).send({ error: "Token malformatted" });
   }

   try {
      const { sub: user_id } = jwt.verify(token, authConfig.secret) as IPayload;

      request.user = { id: user_id };

      next();
   } catch (error) {
      return res.status(401).send({ error: "Token invalid error" });
   }

   // , (err, decoded) => {
   //    if (err) {
   //       return res.status(401).send({ error: "Token invalid" });
   //    }

   //    req.user.id = decoded;
   //    return next();
   // });
}
