import { LocationModel } from 'src/domain/model/location.model';
import { RideModel } from 'src/domain/model/ride.model';
import { UserModel } from 'src/domain/model/user.model';
import { Entity, PrimaryGeneratedColumn, ManyToOne, OneToOne, Column, JoinColumn } from 'typeorm';
import { Location } from './location.entity';
import { User } from './user.entity';

@Entity()
export class Ride implements RideModel {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User, user => user.id)
    @JoinColumn()
    rider: UserModel;

    @ManyToOne(() => User, user => user.id)
    @JoinColumn()
    driver: UserModel;

    @OneToOne(() => Location, location => location.id, { onDelete: 'CASCADE' })
    @JoinColumn()
    initialLocation: LocationModel;

    @OneToOne(() => Location, location => location.id, { nullable: true, onDelete: 'CASCADE' })
    @JoinColumn()
    finalLocation: LocationModel;

    @Column('timestamp')
    startTime: Date;

    @Column('timestamp', { nullable: true })
    endTime: Date;
}
