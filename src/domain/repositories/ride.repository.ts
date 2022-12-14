import { RideModel } from "../model/ride.model";

export abstract class RideRepository {
    abstract insertOne(ride: Partial<RideModel>): Promise<RideModel>;
    abstract getActiveRide(riderId: number): Promise<RideModel|undefined>;
    abstract getOne(rideId): Promise<RideModel>;
    abstract update(ride: RideModel): Promise<RideModel>;
}