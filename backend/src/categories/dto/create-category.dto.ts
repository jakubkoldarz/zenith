import { IsString, IsUUID, MinLength } from 'class-validator';

export class CreateCategoryDto {
    @IsString()
    @MinLength(1)
    name: string;

    @IsUUID()
    projectId: string;
}
