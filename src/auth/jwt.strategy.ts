import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { jwtConstants } from './constants';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    // Passport first verifies the JWT's signature and decodes the JSON
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
    });
  }

  // https://docs.nestjs.com/security/authentication#implementing-passport-jwt
  async validate(payload: any) {
    // payload = { username: 'john', sub: 1, iat: 1668749130, exp: 1668749190 }
    // payload 에 없는 값으로 리턴한 경우 해당 프로퍼티만 빼고 리턴할 뿐 에러 안남
    return { userId: payload.sub, username: payload.username };
  }
}
