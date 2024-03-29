import { ExtractJwt, Strategy } from 'passport-jwt';
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';
import { GuardTypeEnum } from './guard-type.enum';
import { TokenPayloadInterface } from '../interface/token-payload.interface';
import { UsersRepository } from '../repositories/users.repository';

@Injectable()
export class JwtAccessStrategy extends PassportStrategy(
  Strategy,
  GuardTypeEnum.JWT_ACCESS,
) {
  constructor(
    private readonly configService: ConfigService,
    private readonly usersRepository: UsersRepository,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get('JWT_ACCESS_TOKEN_SECRET'),
    });
  }

  async validate(payload: TokenPayloadInterface) {
    return await this.usersRepository.getUserById(payload.user.id);
  }
}
