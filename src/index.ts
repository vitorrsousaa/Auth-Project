import express from "express";
import AuthController from "./app/controllers/authController";
import ProjectController from "./app/controllers/projectController";
import connect from "./database/connect";
import authValidate from "./app/middlewares/auth";

connect();

const app = express();

const router = express.Router();

app.use(express.json());

app.use(router);

router.post("/auth/register", AuthController.register);
router.post("/auth/authenticate", AuthController.authenticate);

router.use(authValidate);
router.get("/projects", ProjectController.register);

app.listen(3000, () => console.log("Server started"));
