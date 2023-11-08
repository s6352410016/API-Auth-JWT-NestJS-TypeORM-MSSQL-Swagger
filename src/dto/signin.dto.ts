import { IsString , IsNotEmpty , MinLength } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class SignInDto{
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    usernameOrEmail: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    @MinLength(6)
    password: string;
}