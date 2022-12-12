import { DateAdapter } from "src/domain/adapters/date.adapter";
import { GeoAdapter } from "src/domain/adapters/geo.adapter";
import { LocationModel } from "src/domain/model/location.model";
import { RideModel } from "src/domain/model/ride.model";
import { RidePort } from "src/domain/ports/ride.port";
import { LocationRepository } from "src/domain/repositories/location.repository";
import { RideRepository } from "src/domain/repositories/ride.repository";
import { UserRepository } from "src/domain/repositories/user.repository";
import { ErrorCode } from "src/infrastructure/constants/error-code.constant";
import { BasicHttpException } from "src/infrastructure/controllers/exceptions/basic-http.exception";

export class RideUsecase extends RidePort {

    BASE_FEED = 3500;
    COST_BY_MINUTE = 200;
    COST_BY_KM = 1000;
    
    constructor(
        private rideRepository: RideRepository,
        private locationRepository: LocationRepository,
        private userRepository: UserRepository,
        private dateAdapter: DateAdapter,
        private geoAdapter: GeoAdapter
    ) {
        super();
    }

    async request(riderId: number, lat: number, lng: number): Promise<RideModel> {
        const currentRide = await this.rideRepository.getActiveRide(riderId);
        if (currentRide) {
            throw new BasicHttpException(ErrorCode.CURRENT_RIDE);
        }
        const initialLocation = await this.locationRepository.insertOne(lat, lng);
        const rider = await this.userRepository.getById(riderId);
        if (!rider || rider.role.code !== 'RIDER') {
            throw new BasicHttpException(ErrorCode.RESOURCE_NOT_FOUND, { field: 'riderId', value: riderId });
        }
        const driver = await this.userRepository.getDriver();
        const startTime = new Date();
        return this.rideRepository.insertOne({
            rider,
            initialLocation,
            driver,
            startTime
        });
    }

    async finish(rideId: number, lat: number, lng: number): Promise<RideModel & { total: number }> {
        const ride = await this.rideRepository.getOne(rideId);
        if (!ride) {
            throw new BasicHttpException(ErrorCode.RESOURCE_NOT_FOUND, { field: 'rideId', value: rideId });
        }
        if (ride.finalLocation) {
            throw new BasicHttpException(ErrorCode.BAD_PARAMETERS, 'Ride finished previously');
        }
        const finalLocation = await this.locationRepository.insertOne(lat, lng);
        const endTime = new Date();
        const result = await this.rideRepository.update({
            ...ride,
            finalLocation,
            endTime
        });
        const total = this.getTotalPayment(result);
        return {
            ...result,
            total
        }
    }

    getTotalPayment(ride: RideModel): number {
        const minutes = this.dateAdapter.getDifferenceInMinutes(ride.startTime, ride.endTime);
        const distance = this.getDistanceInKm(ride.initialLocation, ride.finalLocation);
        return this.BASE_FEED + (this.COST_BY_MINUTE * minutes) + (this.COST_BY_KM * distance);
    }

    getDistanceInKm(initialLocation: LocationModel, finalLocation: LocationModel): number {
        return this.geoAdapter.getDistanceInKm(
            { latitude: initialLocation.lat, longitude: initialLocation.lng },
            { latitude: finalLocation.lat, longitude: finalLocation.lng }
        );
    }
}