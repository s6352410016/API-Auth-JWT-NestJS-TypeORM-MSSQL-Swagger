import { Injectable , ConflictException } from '@nestjs/common';
import { User } from 'src/entities/user.entity';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from "@nestjs/jwt";
import { Token } from 'src/types/token.type';
import { SignUpDto } from 'src/dto/signup.dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService,     
        private readonly configService: ConfigService
    ){}

    async createToken(username: string , email: string): Promise<Token>{
        const [access_token , refresh_token] = await Promise.all([
            this.jwtService.signAsync(
                {
                    username,
                    email
                },              
                {
                    // secret: process.env.ACCESS_TOKEN_SECRET,
                    secret: this.configService.get<string>("ACCESS_TOKEN_SECRET"),
                    expiresIn: "300s"
                }
            ),
            this.jwtService.signAsync(
                {
                    username,
                    email
                },              
                {
                    // secret: process.env.REFRESH_TOKEN_SECRET,
                    secret: this.configService.get<string>("REFRESH_TOKEN_SECRET"),
                    expiresIn: "1h"
                }
            ),
        ]);
        return {
            access_token,
            refresh_token
        }
    }

    async validateUser(usernameOrEmail: string , password: string): Promise<Omit<User , "password">>{
        const user = await this.userService.findWithUsernameOrEmail(usernameOrEmail);
        if(user && await bcrypt.compare(password , user.password)){
            const { password , ...otherDetail } = user;
            return otherDetail;
        }
        return null;
    }

    async signIn(username: string , email: string): Promise<Token>{
        return await this.createToken(username , email);
    }

    async signUp(signUpDto: SignUpDto): Promise<Token>{
        const userExistWithUsername = await this.userService.findWithUsernameOrEmail(signUpDto.username);
        const userExistWithEmail = await this.userService.findWithUsernameOrEmail(signUpDto.email);
        
        if(userExistWithUsername){
            throw new ConflictException("Username is already exist.");
        }
        if(userExistWithEmail){
            throw new ConflictException("Email is already exist.");
        }
        
        const { username , email } = await this.userService.createUser(signUpDto);
        return await this.createToken(username , email);
    }

    async refresh(username: string , email: string): Promise<Token>{
        return await this.createToken(username , email);
    }
}
