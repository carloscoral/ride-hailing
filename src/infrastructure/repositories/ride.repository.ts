import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RideModel } from 'src/domain/model/ride.model';
import { RideRepository } from 'src/domain/repositories/ride.repository';
import { Repository } from 'typeorm';
import { Ride } from '../entities/ride.entity';

@Injectable()
export class RideRepositoryImp extends RideRepository {

    constructor(
        @InjectRepository(Ride)
        private readonly rideRepository: Repository<Ride>
    ) {
        super();
    }

    async insertOne(ride: Partial<RideModel>): Promise<RideModel> {
        const result = await this.rideRepository.insert(ride);
        return result.raw[0];
    }

    async getActiveRide(riderId: number): Promise<RideModel|undefined> {
        const result = await this.rideRepository.find({
            where: {
                rider: {
                    id: riderId
                }
            },
            relations: {
                rider: true,
                finalLocation: true
            }
        });
        return result.find(ride => !ride.finalLocation);
    }

    getOne(rideId: any): Promise<RideModel> {
        return this.rideRepository.findOne({
            where: {
                id: rideId
            },
            relations: {
                finalLocation: true,
                initialLocation: true,
                rider: true,
                driver: true
            }
        });
    }

    update(ride: RideModel): Promise<RideModel> {
        return this.rideRepository.save(ride);
    }
}