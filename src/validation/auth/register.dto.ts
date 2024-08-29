import { CustomIsEmail, CustomIsString } from "@modules/validation/protocols/decorators";

export class RegisterDto {
  @CustomIsString()
  username!: string;

  @CustomIsString()
  name!: string;

  @CustomIsEmail()
  email!: string;

  @CustomIsString()
  password!: string;
}
