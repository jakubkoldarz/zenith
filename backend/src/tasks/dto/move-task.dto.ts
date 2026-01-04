import { IsUUID, IsInt, Min } from 'class-validator';

export class MoveTaskDto {
    @IsUUID()
    categoryId: string;

    @IsInt()
    @Min(0)
    order: number;
}
