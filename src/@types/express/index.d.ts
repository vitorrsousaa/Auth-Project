import * as express from "express";

declare global {
   module Express {
      interface Request {
         user: {
            id: string;
         };
      }
   }
}
