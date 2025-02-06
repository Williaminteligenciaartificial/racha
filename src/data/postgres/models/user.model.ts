import {
  BaseEntity,
  BeforeInsert,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { bcryptAdpter } from "../../../config/bcrypt.adapter";
import { Repair } from "./repair.model";
export enum Role {
  EMPLOYEE = "EMPLOYEE",
  CLIENT = "CLIENT",
}

export enum Status {
  AVALIABLE = "ABALIABLE ",
  DISABLE = "DISABLE",
}

export enum RepairStatus {
  PENDING = "PENDING",
  COMPLETED = "COMPLETED",
  CANCELED = "CANCELED",
}
@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column("varchar", {
    length: 80,
    nullable: false,
  })
  name: string;

  @Column("varchar", {
    length: 80,
    nullable: false,
    unique: true,
  })
  email: string;

  @Column("varchar", {
    nullable: false,
  })
  password: string;

  @Column("enum", {
    enum: Role,
    default: Role.CLIENT,
  })
  role: Role;

  @Column("enum", {
    enum: Status,
    default: Status.AVALIABLE,
  })
  status: Status;

  @OneToMany(() => Repair, (repair) => repair.user)
  repairs:Repair[];
  



  @BeforeInsert()
  async hashPassword() {
    this.password = await bcryptAdpter.encrypt(this.password);
  }
}
