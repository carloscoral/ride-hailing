import { Injectable } from '@nestjs/common';
import { Coordinate, GeoAdapter } from 'src/domain/adapters/geo.adapter';
import { getDistance } from 'geolib';

@Injectable()
export class GeoService extends GeoAdapter {
    getDistanceInKm(initialLocation: Coordinate, finalLocation: Coordinate): number {
        return getDistance(initialLocation, finalLocation, 0.01) / 1000;
    }
    
}
