
import { compareHashPassword } from '@/helpers/util';
import { UsersService } from '@/modules/users/users.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) { }

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findByEmail(email);
    const isValidPassword = await compareHashPassword(pass, user.password);

    if (!user || !isValidPassword) {
      return null;
    }
    return user;
  }

  async signIn(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findByEmail(email);

    if (!user) {
      throw new UnauthorizedException("Username/Password không hợp lệ");
    }

    const isValidPassword = await compareHashPassword(pass, user.password);

    if (!isValidPassword) {
      throw new UnauthorizedException("Username/Password không hợp lệ");
    }

    const payload = {
      sub: user._id,
      username: user.email
    };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
