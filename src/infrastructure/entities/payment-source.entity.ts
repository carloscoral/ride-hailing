import { PaymentSourceModel } from "src/domain/model/payment-source.model";
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { User } from "./user.entity";

@Entity()
export class PaymentSource implements PaymentSourceModel {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('integer')
    payment_source_id: number;

    @ManyToOne(() => User, user => user.id, { onDelete: 'CASCADE' })
    @JoinColumn()
    user: User;
}