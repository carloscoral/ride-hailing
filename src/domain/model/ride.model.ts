import { LocationModel } from "./location.model";
import { UserModel } from "./user.model";

export interface RideModel {
    id: number;
    rider: UserModel;
    driver: UserModel;
    initialLocation: LocationModel;
    finalLocation: LocationModel;
    startTime: Date;
    endTime: Date;
}