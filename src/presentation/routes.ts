import { Router } from "express";
import { UserRouter } from "./user/routes";
import { RepairRoutes } from "./repairs/routes";

 export  class  AppRoutes {
     static get routes(): Router {
         const router = Router();

            router.use("/api/v1/users", UserRouter.routes)
            router.use("/api/v1/repairs", RepairRoutes.routes)


 
         return router; 
     } 
 
 }