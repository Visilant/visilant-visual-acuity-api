import { JwtConfig } from '@config/config.loader';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtPayload } from '@auth/jwt/jwt-payload';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private config: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: config.get<JwtConfig>('jwt')?.secret,
    });
  }

  validate(payload: unknown) {
    const user = this.mapPayloadToUser(payload);
    return user;
  }

  private mapPayloadToUser(payload: any): JwtPayload {
    try {
      return { username: payload.username, id: payload.id, email: payload.email };
    } catch (e) {
      throw new Error('JWT error' + e);
    }
  }
}
