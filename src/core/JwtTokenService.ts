import { Injectable } from '@nestjs/common';
import { sign } from 'jsonwebtoken';
import { EnvironmentService } from 'src/environment/environment.service';

@Injectable()
export class JwtTokenService {
  constructor() {}

  async create(user_id: string): Promise<string> {
    let environment: EnvironmentService = new EnvironmentService();

    // let SignInOptions: SignOptions = {
    //   algorithm: 'RS256',
    //   expiresIn: environment.get('JWT_EXPIRY_MINS') * 60,
    // };
    let token = sign(
      {
        userId: user_id,
        iat: Math.floor(Date.now() / 1000),
        exp: Math.floor(Date.now() / 1000) + 60 * 60,
      },
      environment.get('JWT_SECRET'),
    );

    return token;
  }
}
