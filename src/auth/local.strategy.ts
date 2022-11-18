import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    const option = {
      //usernameField: 'email' // example
    };

    super(option); // 여기에 옵션 적용 가능
  }

  // For each strategy, Passport will call the verify function
  // (implemented with the validate() method in @nestjs/passport)
  // using an appropriate strategy-specific set of parameters
  // Passport는 user를 찾고 인증이 유효한 경우
  // user 를 리턴함(request 객체에 user 값을 만듦)으로 역할을 완료함

  // 각 전략에 따른 차이점은 사용자 유무와 유효한지를 정의하는 데에 있음
  // validate 메소드가 성공하면 request 객체에 user 프로퍼티 생성
  async validate(username: string, password: string): Promise<any> {
    const user = await this.authService.validateUser(username, password);
    if (!user) {
      throw new UnauthorizedException(); // exception layer handle it
    }
    return user;
  }
}
