export interface Coordinate {
    latitude: number;
    longitude: number;
}

export abstract class GeoAdapter {
    abstract getDistanceInKm(initialLocation: Coordinate, finalLocation: Coordinate): number;
}