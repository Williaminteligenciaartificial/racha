import { NextFunction, Response, Request } from "express";
import { JwtAdapter } from "../../config/jwt.adapter";
import { Role, Status, User } from "../../data/postgres/models/user.model";

export class AuthMiddleware {
  static async verifyToken(req: Request, res: Response, next: NextFunction) {
    const authorization = req.header("Authorization");

    if (!authorization) {
      return res
        .status(401)
        .json({ message: "provide a token plis logi again" });
    }
    if (!authorization.startsWith("Bearer")) {
      return res
        .status(401)
        .json({ message: "invalid token please login again" });
    }

    const token = authorization.split(" ")[1] || "";
    try {
      const payload = (await JwtAdapter.veryfyToken(token)) as { id: string };
      if (!payload)
        return res
          .status(401)
          .json({ message: "invallid token please login again" });

      const user = await User.findOne({
        where: { id: payload.id, status: Status.AVALIABLE },
      });

      if (!user) return res.status(401).json({ message: "User not found" });
      req.body.sessionUser = user;

      next();
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "internal server error" });
    }
  }
  static restricTo = (...roles: Role[]) => {
    return (req: Request, res: Response, next: NextFunction) => {
      if (!roles.includes(req.body.sessionUser.role)) {
        return res.status(401).json({ message: "you are not authorized" });
      }
      next();
    };
  };
}
