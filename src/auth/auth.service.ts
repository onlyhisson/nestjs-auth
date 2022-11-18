import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service'; // 사용자 조회

/**
 * AuthService 역할
 * - 유저(username)를 받고 비밀번호 확인
 */
@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService, // 사용자 조회
    private jwtService: JwtService,
  ) {}

  // username 및 password 확인, Passport local strategy
  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(username); // 사용자 조회
    if (user && user.password === pass) {
      const { password, ...result } = user; // result는 비밀 번호 제외 user 데이터
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.userId };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
