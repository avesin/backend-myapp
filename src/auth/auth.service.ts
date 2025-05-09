import { Injectable, BadRequestException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';
import { UsernameDto } from './dto/username.dto';
import { UserDocument } from 'src/user/schemas/user.schema';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) { }

  async register(registerDto: RegisterDto) {
    const existingUser = await this.userService.findByEmail(registerDto.email);
    if (existingUser) {
      throw new BadRequestException('Email already registered');
    }

    const hashedPassword = await bcrypt.hash(registerDto.password, 10);

    const user = await this.userService.createUser({
      email: registerDto.email,
      password: hashedPassword,
      username: registerDto.username
    });

    return {
      code: 200,
      message: 'Registration successful',
      data: {
        userId: user._id.toString()
      }
    }
  }

  async refreshToken(token: string, refresh_token: string) {
    var user = this.jwtService.decode(token)
    if (user != null) {
      const payload = { sub: user.sub, email: user.email, username: user.username };

      var refreshPayload = this.jwtService.decode(refresh_token)

      if(refreshPayload.email != user.email){
        throw new UnauthorizedException('Token Invalid');
      }

      const token = this.jwtService.sign(payload, {
        expiresIn: '5m'
      });

      const refreshToken = this.jwtService.sign(payload, {
        expiresIn: '30d'
      });

      return {
        token: token,
        refresh_token: refreshToken
      }
    }else{
      throw new UnauthorizedException('Token Invalid');
    }
  }

  async checkusername(UsernameDto: UsernameDto) {
    const existingUser = await this.userService.findUsername(UsernameDto.username.toLowerCase());
    const isUsenameUsed = existingUser != null;

    return {
      code: 200,
      message: isUsenameUsed ? 'Username Used' : 'Username Available',
      data: {
        isUsenameUsed: isUsenameUsed
      }
    };
  }

  async login(loginDto: LoginDto) {

    if (loginDto.email == null && loginDto.username == null) {
      throw new UnauthorizedException('Invalid email or username');
    }

    if (loginDto.email.length == 0 && loginDto.username.length == 0) {
      throw new UnauthorizedException('Invalid email or username');
    }

    var user: UserDocument | null = null;

    if (loginDto.email != null) {
      user = await this.userService.findByEmail(loginDto.email);
    }

    if (!user && loginDto.username != null) {
      user = await this.userService.findUsername(loginDto.username);
    }

    if (!user) {
      throw new UnauthorizedException('Invalid email/username or password');
    }

    const passwordValid = await bcrypt.compare(loginDto.password, user.password);

    if (!passwordValid) {
      throw new UnauthorizedException('Invalid email/username or password');
    }

    const payload = { sub: user._id, email: user.email, username: user.username };

    const token = this.jwtService.sign(payload, {
      expiresIn: '5m'
    });

    const refreshToken = this.jwtService.sign(payload, {
      expiresIn: '30d'
    });

    return {
      code: 200,
      message: "Login Success",
      data: {
        access_token: token,
        refresh_token: refreshToken,
        user: {
          _id: user._id,
          username: user.username,
          email: user.email
        }
      }
    };
  }
}