import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SignUpDto } from 'src/dto/signup.dto';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>
    ) { }

    async findWithUsernameOrEmail(usernameOrEmail: string): Promise<User> {
        return await this.userRepository.findOne({
            where: [
                {
                    username: usernameOrEmail
                },
                {
                    email: usernameOrEmail
                }
            ]
        });
    }

    async createUser(signUpDto: SignUpDto): Promise<User> {
        const { fullname, username, password, email } = signUpDto;
        const password_hash = await bcrypt.hash(password, 10);
        const user = this.userRepository.create({
            fullname,
            username,
            password: password_hash,
            email
        });
        return await this.userRepository.save(user);
    }
}
