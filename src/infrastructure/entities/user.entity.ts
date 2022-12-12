import { RoleModel } from "src/domain/model/role.model";
import { UserModel } from "src/domain/model/user.model";
import { Entity } from "typeorm";
import { Column } from "typeorm/decorator/columns/Column";
import { PrimaryGeneratedColumn } from "typeorm/decorator/columns/PrimaryGeneratedColumn";
import { Index } from "typeorm/decorator/Index";
import { OneToMany, ManyToOne, JoinColumn } from "typeorm";
import { Role } from "./role.entity";
import { PaymentSource } from "./payment-source.entity";

@Entity()
export class User implements UserModel {
    @PrimaryGeneratedColumn()
    id: number;

    @Index({ unique: true })
    @Column('varchar', { unique: true })
    email: string;

    @OneToMany(() => PaymentSource, paymentSource => paymentSource.user)
    payment_sources: PaymentSource[];

    @ManyToOne(() => Role, (role) => role.users)
    @JoinColumn()
    role: RoleModel;
}