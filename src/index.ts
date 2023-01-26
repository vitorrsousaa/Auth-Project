import express, { RequestHandler } from "express";
import AuthController from "./controllers/authController";
import ProjectController from "./controllers/projectController";
import connect from "./database/connect";
import authValidate from "./middlewares/auth";

connect();

const app = express();

const router = express.Router();

app.use(express.json());

app.use(router);

router.post("/auth/register", AuthController.register);
router.post("/auth/authenticate", AuthController.authenticate);

router.use(authValidate as RequestHandler);
router.get("/projects", ProjectController.register);

app.listen(3000, () => console.log("Server started"));
