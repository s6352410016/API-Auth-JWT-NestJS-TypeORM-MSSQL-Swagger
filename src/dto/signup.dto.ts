import { IsString , IsNotEmpty , MinLength , IsEmail } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class SignUpDto{
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    fullname: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    username: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    @MinLength(6)
    password: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    @IsEmail()
    email: string;
}