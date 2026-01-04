import { IsString, IsUUID, MinLength, IsOptional } from 'class-validator';

export class CreateTaskDto {
    @IsString()
    @MinLength(1)
    title: string;

    @IsString()
    @IsOptional()
    description?: string;

    @IsUUID()
    categoryId: string;
}
