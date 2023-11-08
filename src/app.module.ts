import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from './entities/user.entity';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    UserModule, 
    AuthModule,
    TypeOrmModule.forRoot({
      type: 'mssql',
      host: 'localhost',
      port: 1433,
      username: 'bunlung',
      password: '5087',
      database: 'auth_jwt_nestjs_db',
      entities: [User],
      synchronize: true,
      options: {
        encrypt: false
      }
    }),
    ConfigModule.forRoot({
      envFilePath: ".env",
      isGlobal: true
    })
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
