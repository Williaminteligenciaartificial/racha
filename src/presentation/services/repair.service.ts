import { Repair, RepairStatus } from "../../data/postgres/models/repair.model";
import { CustomError } from "../../domain/errors";
import { CreateRepairDTO } from "../../domain/dtos/create-repair.dto";
import { In } from "typeorm";

export class RepairService {
  async findAll() {
    try {
      return await Repair.find({
        where: {
          status: In([RepairStatus.PENDING, RepairStatus.COMPLETED]),
        },
        relations: {
          user:true,
        },
        select: {
          user: {
            id:true,
            name:true,
            email:true,
            role:true,
          },
        },
      });
    } catch (error) {
      throw CustomError.internalServer("error fetching repair data");
    }
  }

  async findOne() {
    const repair = await Repair.findOne({
      where: {
        status: RepairStatus.PENDING,
      },
    });
    if (!repair) {
      throw CustomError.notFoud("repair not found");
    }
    return repair;
  }
  async create(data: CreateRepairDTO) {
    const repair = new Repair();
    repair.date = data.Date;
    repair.userId = data.userId;
    repair.motorsNumber = data.motorsNumber;
    repair.description = data.description

    console.log("se ejecuta final")

    try {
      return await repair.save();
    } catch (error) {
      console.log(error);
      
      throw CustomError.internalServer("error creating repair");
    }
  }

  async update() {
    const repair = await this.findOne();
    repair.status = RepairStatus.COMPLETED;
    try {
      await repair.save();
      return {
        messsage: "Reparacion completada",
      };
    } catch (error) {
      throw CustomError.internalServer("error updating repair");
    }
  }
  async delete(id: string) {
    const repair = await this.findOne();
    repair.status = RepairStatus.CANCELED;
    try {
      await repair.save();
      return {
        messsage: "Reparacion cancelada",
      };
    } catch (error) {
      throw CustomError.internalServer("error deleting repair");
    }
  }
}
