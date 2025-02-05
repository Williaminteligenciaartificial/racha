import { CreateUserDTO, CustomError } from "../../domain/errors";
import { Response, Request } from "express";
import { UserService } from "../services/user.service";
import { UpdateUserDTO } from "../../domain/dtos/update-user.dto";
import { error } from "console";

export class UserController {
  constructor(private readonly userService: UserService) {}

  private handleError = (error: unknown, res: Response) => {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({ message: error.message });
    }
    console.log(error);
    return res.status(500).json({ message: "Something went very wrong" });
  };

  findAllUsers = (req: Request, res: Response) => {
    this.userService
      .findAll()
      .then((data) => res.status(200).json(data))
      .catch((error: any) => this.handleError(error, res));
  };
  findOneUsers = (req: Request, res: Response) => {
    const { id } = req.params;
    this.userService
      .findOne(id)
      .then((data) => res.status(200).json(data))
      .catch((error: any) => this.handleError(error, res));
  };
  createUser = (req: Request, res: Response) => {
    const [error, createUserDTO] = CreateUserDTO.create(req.body);

    if (error) return res.status(422).json({ message: error });

    this.userService
      .create(createUserDTO!)
      .then((data) => res.status(200).json(data))
      .catch((error: any) => this.handleError(error, res));
  };
  updateUser = (req: Request, res: Response) => {
    const { id } = req.params;
    const [error, updateUserDto] = UpdateUserDTO.create(req.body);

    if (error) return res.status(422).json({ message: error });

    this.userService
      .update(id, updateUserDto!)
      .then((data) => res.status(200).json(data))
      .catch((error: any) => this.handleError(error, res));
  };
  deleteUser = (req: Request, res: Response) => {
    const { id } = req.params;
    this.userService
      .deleteUser(id)
      .then((data) => res.status(204).json(data))
      .catch((error: any) => this.handleError(error, res));
  };
  loginUser = (req: Request, res: Response) => {
    const { email, password } = req.body;

    this.userService
    .login(email, password)
    .then((data) => res.status(200).json(data))
    .catch((error:any) => this.handleError(error,res));
  };
}
