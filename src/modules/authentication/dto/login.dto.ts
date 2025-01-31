import { ApiProperty } from '@nestjs/swagger';
import { IsPositive } from "class-validator";
export class LoginDto {
  @ApiProperty()
  email: string;

  @ApiProperty()
  password: string;
}

export class SignupDto {

  @ApiProperty()
  name: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  password: string;

  @IsPositive({ message: 'El profile_id debe ser un número positivo' })
  @ApiProperty()
  profile_id: number;
}