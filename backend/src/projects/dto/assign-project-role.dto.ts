import { IsUUID, IsEnum } from 'class-validator';
import { Transform } from 'class-transformer';
import { Role } from '@prisma/client';
import { convertRoleFromFrontend } from '../utils/role-converter';

export class AssignProjectRoleDto {
    @IsUUID()
    userId: string;

    @Transform(({ value }) => convertRoleFromFrontend(value))
    @IsEnum(Role)
    role: Role;
}
