import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Seeder } from 'seeder/seeder.interface';
import { Role } from 'src/infrastructure/entities/role.entity';
import { RoleModel } from 'src/domain/model/role.model';

@Injectable()
export class RoleSeederService implements Seeder<RoleModel[], Role[]> {

    constructor(
        @InjectRepository(Role)
        private readonly roleRepository: Repository<Role>
    ) { }

    async seed(data: Partial<RoleModel>[]): Promise<Role[]> {
        try {
            const result = await this.roleRepository.insert(data);
            return result.raw.map((role, i) => ({
                ...data[i],
                ...role
            }));
        } catch (e) {
            console.error(e);
        }
    }
}