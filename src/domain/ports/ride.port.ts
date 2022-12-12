import { RideModel } from "../model/ride.model";

export abstract class RidePort {
    abstract request(riderId: number, lat: number, lng: number): Promise<RideModel>;
}