import { IsLatitude, IsLongitude, IsNumber } from 'class-validator';

export class FinishRideRequestDto {
    @IsLatitude()
    @IsNumber()
    lat: number;

    @IsLongitude()
    @IsNumber()
    lng: number;
}