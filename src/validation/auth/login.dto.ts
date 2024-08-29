import { CustomIsEmail, CustomIsString } from "@modules/validation/protocols/decorators";

export class LoginDto {
  @CustomIsEmail()
  email!: string;

  @CustomIsString()
  password!: string;
}
