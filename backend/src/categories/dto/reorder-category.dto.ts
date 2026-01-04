import { IsInt, Min } from 'class-validator';

export class ReorderCategoryDto {
    @IsInt()
    @Min(0)
    order: number;
}
