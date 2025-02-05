import z, { date } from "zod";
const createRepairSchema = z.object({
  date: z.string({ message: "date is required" }).date(),
  motorsNumber: z.string().min(5, { message: "motorsnumber is required" }),
  description: z.string().min(10, { message: "descripiton is required" }),
  userId: z.string().uuid({ message: "useId is required" }),
});

export class CreateRepairDTO {
  constructor(
    public Date: Date,
    public userId: string,
    public motorsNumber: string,
    public description: string
  ) {}

  static create(object: {
    [key: string]: any;
  }): [Record<string, string>?, CreateRepairDTO?] {
    const { date, userId, motorsNumber, description } = object;
    const result = createRepairSchema.safeParse(object);

    if (!result.success) {
      const errorMessage = result.error?.errors.reduce((acc: any, err: any) => {
        const field = err.path.join(".");
        acc[field] = err.message;
        return acc;
      }, {} as Record<string, string>);

      return [errorMessage];
    }

    return [
      undefined,
      new CreateRepairDTO(date, userId, motorsNumber, description),
    ];
  }
}
