import { LocationModel } from 'src/domain/model/location.model';
import { RideModel } from 'src/domain/model/ride.model';
import { UserModel } from 'src/domain/model/user.model';
import { Entity, PrimaryGeneratedColumn, ManyToOne, OneToOne, Column } from 'typeorm';
import { Location } from './location.entity';
import { User } from './user.entity';

@Entity()
export class Ride implements RideModel {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User, user => user.id)
    rider: UserModel;

    @ManyToOne(() => User, user => user.id)
    driver: UserModel;

    @OneToOne(() => Location)
    initialLocation: LocationModel;

    @OneToOne(() => Location)
    finalLocation: LocationModel;

    @Column('timestamp')
    startTime: Date;

    @Column('timestamp')
    endTime: Date;
}
