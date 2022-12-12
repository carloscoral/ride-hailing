import { IsNumber, IsLatitude, IsLongitude } from 'class-validator';

export class RideRequestDto {
    @IsNumber()
    riderId: number;

    @IsLatitude()
    @IsNumber()
    lat: number;

    @IsLongitude()
    @IsNumber()
    lng: number;
}