import { regularEXP } from "../../config";

export class UpdateUserDTO {
  constructor(
    public name: string,
    public email: string,
  ) {}
  static create(object: { [key: string]: any }): [string?, UpdateUserDTO?] {
    const { name, email } = object;
    if (!name) return ["name is required"];
    if (!email) return ["email is required"];
    if (!regularEXP.email.test(email)) return ["invalid Email"];

    return [undefined, new UpdateUserDTO(name, email)];
  }
}
