import { RoleModel } from "src/domain/model/role.model";
import { UserModel } from "src/domain/model/user.model";
import { Entity } from "typeorm";
import { Column } from "typeorm/decorator/columns/Column";
import { PrimaryGeneratedColumn } from "typeorm/decorator/columns/PrimaryGeneratedColumn";
import { Index } from "typeorm/decorator/Index";
import { ManyToOne } from "typeorm/decorator/relations/ManyToOne";
import { Role } from "./role.entity";

@Entity()
export class User implements UserModel {
    @PrimaryGeneratedColumn()
    id: number;

    @Index({ unique: true })
    @Column('varchar', { unique: true })
    email: string;

    @Column('integer')
    payment_source_id: number;

    @ManyToOne(() => Role, (role) => role.users)
    role: RoleModel;
}