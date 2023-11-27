import { Injectable, CanActivate, ExecutionContext, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { Request } from 'express';
import { verify, VerifyOptions } from 'jsonwebtoken';

@Injectable()
export class AuthGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest();

    //Check for valid request and then verify jwt token
    return (await this.validateRequest(request)) && (await this.verifyJwt(request));
  }

  async validateRequest(request: Request) {
    if (request.cookies && request.cookies.jwt) return true;
    return false;
  }

  async verifyJwt(request: Request) {

    const publicKey = 'HARDCODED-FOR-NOW-BUT-CAN-BE-READ-FROM-ENV'

    if (!request.cookies) return false;

    let token = request.cookies.jwt;
    const verifyOptions: VerifyOptions = {
      algorithms: ['RS256'],
    };

    let decodedJwt: any = await verify(token, publicKey, verifyOptions, (error, decoded: any) => {
      if (error) return error;
      return decoded;
    });

    // check expiry of jwt
    if (decodedJwt.userId && decodedJwt.exp) {
      if (decodedJwt.exp > Math.floor(Date.now() / 1000)) {
        request.headers.userId = decodedJwt.userId
        return true;
      }
    }

    return false;
  }
}
