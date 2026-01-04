import {
    BadRequestException,
    Injectable,
    ConflictException,
} from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { JwtService } from '@nestjs/jwt';
import bcrypt from 'node_modules/bcryptjs';

@Injectable()
export class AuthService {
    constructor(
        private readonly db: DatabaseService,
        private readonly jwtService: JwtService,
    ) {}

    async login(loginDto: LoginDto) {
        const user = await this.db.user.findUnique({
            where: { email: loginDto.email },
        });

        if (!user) {
            throw new BadRequestException('Invalid credentials');
        }

        const passwordMatch = await bcrypt.compare(
            loginDto.password,
            user.password,
        );
        if (!passwordMatch) {
            throw new BadRequestException('Invalid credentials');
        }

        return {
            token: this.jwtService.sign({
                sub: user.id,
                name: user.firstname,
                email: user.email,
            }),
        };
    }

    async register(registerDto: RegisterDto) {
        // Check if user with this email already exists
        const existingUser = await this.db.user.findUnique({
            where: { email: registerDto.email },
        });

        if (existingUser) {
            throw new ConflictException('User with this email already exists');
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(registerDto.password, 10);

        // Create user
        const user = await this.db.user.create({
            data: {
                email: registerDto.email,
                firstname: registerDto.firstname,
                lastname: registerDto.lastname || null,
                password: hashedPassword,
            },
            select: {
                id: true,
                email: true,
                firstname: true,
                lastname: true,
            },
        });

        return user;
    }
}
