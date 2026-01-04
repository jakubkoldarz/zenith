import { Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { UUID } from 'crypto';

@Injectable()
export class UsersService {
    constructor(private readonly db: DatabaseService) {}

    async findAll(search?: string) {
        const where = search
            ? {
                  OR: [
                      {
                          email: {
                              contains: search,
                              mode: 'insensitive' as any,
                          },
                      },
                      {
                          firstname: {
                              contains: search,
                              mode: 'insensitive' as any,
                          },
                      },
                      {
                          lastname: {
                              contains: search,
                              mode: 'insensitive' as any,
                          },
                      },
                  ],
              }
            : {};

        return this.db.user.findMany({
            where,
            select: {
                id: true,
                email: true,
                firstname: true,
                lastname: true,
            },
        });
    }

    async findOne(id: UUID) {
        const user = await this.db.user.findUnique({
            where: { id: id as string },
            select: {
                id: true,
                email: true,
                firstname: true,
                lastname: true,
            },
        });

        if (!user) {
            throw new NotFoundException(`User with ID ${id} not found`);
        }

        return user;
    }
}
