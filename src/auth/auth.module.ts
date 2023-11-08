import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from 'src/user/user.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { AtStrategy } from './strategies/at.strategy';
import { RtStrategy } from './strategies/rt.strategy';

@Module({
  imports: [
    UserModule,
    PassportModule,
    JwtModule.register({})
  ],
  controllers: [AuthController],
  providers: [AuthService , LocalStrategy , AtStrategy , RtStrategy]
})
export class AuthModule {}
