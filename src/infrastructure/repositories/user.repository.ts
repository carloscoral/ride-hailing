import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserModel } from 'src/domain/model/user.model';
import { UserRepository } from 'src/domain/repositories/user.repository';
import { User } from '../entities/user.entity';

@Injectable()
export class UserRepositoryImp extends UserRepository {

    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>
    ) {
        super();
    }

    getById(userId: number): Promise<UserModel> {
        return this.userRepository.findOne({
            where: {
                id: userId
            },
            relations: {
                role: true,
                payment_sources: true
            }
        });
    }

    async updateUser(user: UserModel): Promise<UserModel> {
        await this.userRepository.save(user);
        return user;
    }

    async getDriver(): Promise<UserModel> {
        const drivers = await this.userRepository.find({
            where: {
                role: {
                    code: 'DRIVER'
                }
            },
            select: ['id']
        });
        const randomIndex = Math.floor(
            Math.random() * drivers.length
        );
        return drivers[randomIndex];
    }
}