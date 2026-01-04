import { IsUUID } from 'class-validator';

export class RevokeAccessDto {
    @IsUUID()
    userId: string;
}
