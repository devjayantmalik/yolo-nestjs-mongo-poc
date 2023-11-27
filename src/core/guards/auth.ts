import { Injectable, CanActivate, ExecutionContext, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { Request } from 'express';
import { verify, VerifyOptions } from 'jsonwebtoken';
import { EnvironmentService } from 'src/environment/environment.service';

@Injectable()
export class AuthGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest();

    //Check for valid request and then verify jwt token
    return (await this.validateRequest(request)) && (await this.verifyJwt(request));
  }

  async validateRequest(request: Request) {
    if (request.headers && request.headers.authorization) return true;
    return false;
  }

  async verifyJwt(request: Request) {
    const environment = new EnvironmentService();
    const publicKey = environment.get("JWT_SECRET")

    if (!request.headers.authorization) return false;

    let token = request.headers.authorization;
    let decodedJwt: any = '';
    verify(token, publicKey, (error, decoded: any) => {
      if (error) return error;
      decodedJwt = decoded;
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
