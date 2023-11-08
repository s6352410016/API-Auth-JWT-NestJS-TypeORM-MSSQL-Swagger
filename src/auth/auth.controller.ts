import { Controller, UseGuards, Req, Post, HttpCode, HttpStatus, Body , Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { Token } from 'src/types/token.type';
import { SignUpDto } from 'src/dto/signup.dto';
import { ApiBody , ApiBearerAuth } from '@nestjs/swagger';
import { SignInDto } from 'src/dto/signin.dto';
import { AtAuthGuard } from './guards/at-auth.guard';
import { RtAuthGuard } from './guards/rt-auth.guard';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @ApiBody({type: SignInDto})
    @UseGuards(LocalAuthGuard)
    @HttpCode(HttpStatus.OK)
    @Post("signin")
    async signIn(@Req() req): Promise<Token> {
        return this.authService.signIn(req.user.username, req.user.email);
    }

    @ApiBody({type: SignUpDto})
    @Post("signup")
    async signUp(@Body() signUpDto: SignUpDto): Promise<Token> {
        return this.authService.signUp(signUpDto);
    }

    @ApiBearerAuth()
    @UseGuards(AtAuthGuard)
    @Get("content")
    async authUser(@Req() req){
        return {
            msg: `This action return all content Hello ${req.user.username} | email ${req.user.email}`
        }
    }

    @ApiBearerAuth()
    @UseGuards(RtAuthGuard)
    @HttpCode(HttpStatus.OK)
    @Post("refresh")
    async refresh(@Req() req): Promise<Token>{
        return this.authService.refresh(req.user.username , req.user.email);
    }
}
