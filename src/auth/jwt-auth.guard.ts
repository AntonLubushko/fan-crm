import {
  Injectable,
  ExecutionContext,
  UnauthorizedException,
  CanActivate,
} from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
const secret = 'secpass';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization?.split(' ')[1];

    if (token) {
      try {
        const decodedToken = jwt.verify(token, secret) as any;
        if (
          decodedToken.expire &&
          Number(decodedToken.expire) &&
          Number(decodedToken.expire) > Math.floor(Date.now() / 1000)
        ) {
          return true;
        } else {
          throw new UnauthorizedException('Token expired');
        }
      } catch (error) {
        throw new UnauthorizedException('Inside catch' + error);
      }
    } else {
      throw new UnauthorizedException('Token missing');
    }
  }
}
