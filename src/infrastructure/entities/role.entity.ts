import { RoleModel } from "src/domain/model/role.model";
import { UserModel } from "src/domain/model/user.model";
import { Entity, PrimaryGeneratedColumn, Index, Column, OneToMany } from "typeorm";
import { User } from "./user.entity";

@Entity()
export class Role implements RoleModel {
    @PrimaryGeneratedColumn()
    id: number;

    @Index({ unique: true })
    @Column('varchar', { unique: true })
    code: string;

    @Column('varchar')
    name: string;

    @Column('varchar')
    description: string;

    @OneToMany(() => User, (user) => user.role)
    users: UserModel[];
}