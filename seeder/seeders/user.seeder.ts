import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/infrastructure/entities/user.entity';
import { Seeder } from 'seeder/seeder.interface';
import { UserModel } from 'src/domain/model/user.model';

@Injectable()
export class UserSeederService implements Seeder<UserModel[], User[]> {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>
    ) { }

    async seed(data: Partial<UserModel>[]): Promise<User[]> {
        try {
            const result = await this.userRepository.insert(data);
            return result.raw.map((user, i) => ({
                ...data[i],
                ...user
            }));
        } catch (e) {
            console.error(e);
        }
    }
}