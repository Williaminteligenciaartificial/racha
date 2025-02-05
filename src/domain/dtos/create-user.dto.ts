import { regularEXP } from "../../config";
import { Role } from "../../data/postgres/models/user.model";

export class CreateUserDTO {
  constructor(
    public name: string,
    public email: string,
    public password: string,
    public role: Role
  ) {}
  static create(object: { [key: string]: any }): [string?, CreateUserDTO?] {
    const { name, email, password, role } = object;
    if (!name) return ["name is required"];
    if (!email) return ["email is required"];
    if (!regularEXP.email.test(email)) return ["invalid Email"];
    if (!password) return ["Missing password"];
    if (!regularEXP.password.test(password))
      return ["the password need 10 letrass,"];
    if (!role) return ["Missing role"];
    return [undefined, new CreateUserDTO(name, email, password, role)];
  }
}
