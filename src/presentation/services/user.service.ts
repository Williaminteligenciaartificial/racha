import { string } from "zod";
import { Status, User } from "../../data/postgres/models/user.model";

import { CreateUserDTO, CustomError, UpdateUserDTO } from "../../domain/errors";
import { bcryptAdpter } from "../../config/bcrypt.adapter";
import { JwtAdapter } from "../../config/jwt.adapter";

export class UserService {
  async findOne(id: string) {
    const user = await User.findOne({
      where: {
        status: Status.AVALIABLE,
        id: id,
      },
    });
    if (!user) {
      throw CustomError.notFoud("user not found");
    }
    return user;
  }

  async findAll() {
    try {
      const users = await User.find({
        where: {
          status: Status.AVALIABLE,
        },
      });
      return users;
    } catch (error) {
      throw CustomError.internalServer("error fetching users");
    }
  }

  async create(data: CreateUserDTO) {
    const user = new User();

    user.name = data.name;
    user.email = data.email;
    user.password = data.password;
    user.role = data.role;
    try {
    } catch (error) {
      throw CustomError.internalServer("error creating user.");
    }
  }

  async update(id: string, data: UpdateUserDTO) {
    const user = await this.findOne(id);

    user.name = data.name;
    user.email = data.email;
    try {
      await user.save();

      return {
        message: "User Updated",
      };
    } catch (error) {
      throw CustomError.internalServer("error updating user");
    }
  }

  async deleteUser(id: string) {
    const user = await this.findOne(id);

    user.status = Status.DISABLE;

    try {
      await user.save();
      return { ok: true };
    } catch (error) {
      throw CustomError.internalServer("Error deleting user");
    }
  }
  async login(email: string, password: string) {
    const user = await this.findUserByEmail(email);

    const isMatching = bcryptAdpter.compare(password,user.password);
    if(!isMatching) throw CustomError.unAuthorized("invalid credential");

    const token =await JwtAdapter.generateToken({id:user.id});
    if (!token) throw CustomError.internalServer("Error generating token");

    return {
      token,
      user: {
        id: user.id,
        name:user.name,
        email:user.email,
        role: user.role,
      },
    };
  }

  async findUserByEmail(email: string) {
    const user = await User.findOne({
      where: {
        email,
        status: Status.AVALIABLE,
      },
    });

    if (!user) {
      throw CustomError.notFoud("User not ound");
    }

    return user;
  }
}
