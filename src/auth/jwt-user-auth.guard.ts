import {
  Injectable,
  ExecutionContext,
  UnauthorizedException,
  CanActivate,
} from '@nestjs/common';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class JwtUserAuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization?.split(' ')[1];

    if (token) {
      try {
        const decodedToken = jwt.verify(token, process.env.USER_SECRET) as any;

        if (decodedToken.role !== process.env.USER_ROLE) {
          throw new UnauthorizedException('The role is not user');
        }

        if (!decodedToken.user || isNaN(decodedToken.user)) {
          throw new UnauthorizedException('User id absent');
        }

        if (!decodedToken.expire || isNaN(decodedToken.expire)) {
          throw new UnauthorizedException('Invalid token, expired absent');
        }
        if (Number(decodedToken.expire) <= Math.floor(Date.now() / 1000)) {
          throw new UnauthorizedException('Token expired');
        }

        return true;
      } catch (error) {
        throw new UnauthorizedException(error);
      }
    } else {
      throw new UnauthorizedException('Token missing');
    }
  }
}
