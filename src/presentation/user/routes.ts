import { Router } from "express";
import { UserService } from "../services/user.service";
import { UserController } from "./controller";
import { AuthMiddleware } from "../midelwares/auth.midelwares";

export class UserRouter {
  static get routes(): Router {
    const router = Router();

    const userService = new UserService();
    const controller = new UserController(userService);

    // rutas protegidas

    router.post("/login", controller.loginUser);
    router.post("/", controller.createUser);

    router.use(AuthMiddleware.verifyToken);

    router.get("/", controller.findAllUsers);
    router.get("/:id", controller.findOneUsers);

    router.patch("/:id", controller.updateUser);
    router.delete("/:id", controller.deleteUser);

    return router;
  }
}
