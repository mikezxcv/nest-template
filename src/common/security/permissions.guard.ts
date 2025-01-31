import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Request } from 'express';
import { Reflector } from '@nestjs/core';
import { SignupDto } from 'src/modules/authentication/dto/login.dto';
import { JWTPayload } from './jwt.payload';

@Injectable()
export class PermissionsGuard implements CanActivate {
    constructor(private reflector: Reflector) { }

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const requiredPermissions = this.reflector.get<string[]>('permissions', context.getHandler());
        console.log('requiredPermissions at permission.guard', requiredPermissions);
        if (!requiredPermissions) {
            return true; // Si no se especificaron permisos, permite el acceso.
        }

        const request = context.switchToHttp().getRequest<Request>();
        const user = request.user as any;

        if (!user || !user.permissions) {
            throw new ForbiddenException('Access denied');
        }

        const userPermissions = user.permissions as string[];
        const hasPermission = requiredPermissions.some(permission => userPermissions.includes(permission));

        if (!hasPermission) {
            throw new ForbiddenException('Insufficient permissions');
        }

        return true;
    }
}
