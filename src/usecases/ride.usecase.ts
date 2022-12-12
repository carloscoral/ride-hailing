import { RideModel } from "src/domain/model/ride.model";
import { RidePort } from "src/domain/ports/ride.port";
import { LocationRepository } from "src/domain/repositories/location.repository";
import { RideRepository } from "src/domain/repositories/ride.repository";
import { UserRepository } from "src/domain/repositories/user.repository";
import { ErrorCode } from "src/infrastructure/constants/error-code.constant";
import { BasicHttpException } from "src/infrastructure/controllers/exceptions/basic-http.exception";

export class RideUsecase extends RidePort {
    
    constructor(
        private rideRepository: RideRepository,
        private locationRepository: LocationRepository,
        private userRepository: UserRepository
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
        console.log(rider);
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
}