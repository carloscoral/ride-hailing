import { Injectable } from '@nestjs/common';
import { RoleModel } from 'src/domain/model/role.model';
import { UserModel } from 'src/domain/model/user.model';
import { Role } from 'src/infrastructure/entities/role.entity';
import { RoleSeederService } from './seeders/role.seeder';
import { UserSeederService } from './seeders/user.seeder';

@Injectable()
export class SeederService {
    constructor(
        private roleSeeder: RoleSeederService,
        private userSeeder: UserSeederService
    ) { }

    async seed() {
        const roles = await this.seedRoles();
        console.log(roles);
        const users = await this.seedUsers(roles);
        console.log(users);
    }

    seedRoles() {
        const roles: RoleModel[] = [
            {
                code: 'RIDER',
                description: 'Rider role',
                name: 'Rider',
                users: []
            },
            {
                code: 'DRIVER',
                description: 'Driver role',
                name: 'Driver',
                users: []
            }
        ]
        return this.roleSeeder.seed(roles);
    }

    seedUsers(roles: Role[]) {
        const rider = roles.find(role => role.code === 'RIDER');
        const driver = roles.find(role => role.code === 'DRIVER');
        const users: UserModel[] = [
            {
                role: rider,
                email: 'rider1@mail.com'
            },
            {
                role: rider,
                email: 'rider2@mail.com'
            },
            {
                role: driver,
                email: 'driver1@mail.com'
            },
            {
                role: driver,
                email: 'driver2@mail.com'
            }
        ];
        return this.userSeeder.seed(users);
    }
}
