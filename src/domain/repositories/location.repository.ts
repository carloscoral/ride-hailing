import { LocationModel } from "../model/location.model";

export abstract class LocationRepository {
    abstract insertOne(lat: number, lng: number): Promise<LocationModel>;
}