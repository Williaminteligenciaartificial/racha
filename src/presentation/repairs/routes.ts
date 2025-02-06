import { Router } from "express";
import { RepairController } from "./controller";
import { RepairService } from "../services/repair.service";
import { AuthMiddleware } from "../midelwares/auth.midelwares";
import { Role } from "../../data/postgres/models/user.model";

export class RepairRoutes {
  static get routes(): Router {
    const router = Router();

    const repairService = new RepairService();
    const repairController = new RepairController(repairService);

    

    router.use(AuthMiddleware.verifyToken);
    router.post("/", repairController.createRepair);
    router.use(AuthMiddleware.restricTo(Role.EMPLOYEE));
    router.get("/", repairController.findAllRepairs);
    router.get("/:id", repairController.findOneRepair);
    router.patch("/:id", repairController.updateRepair);
    router.delete("/:id", repairController.delete);

    return router;
  }
}
