import {
  CustomIsDate,
  CustomIsNumber,
  CustomIsString,
} from "@modules/validation/protocols/decorators";

export class UpdateTaskDto {
  @CustomIsString()
  title?: string;

  @CustomIsDate()
  deadline?: Date;

  @CustomIsNumber()
  priority?: number;

  @CustomIsString()
  description?: string;
}