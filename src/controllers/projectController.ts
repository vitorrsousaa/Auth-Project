import { Request, Response } from "express";

class ProjectController {
   async register(req: Request, res: Response) {
      console.log(req.user.id);
      res.send({ ok: true, user: req.user.id });
   }
}

export default new ProjectController();
