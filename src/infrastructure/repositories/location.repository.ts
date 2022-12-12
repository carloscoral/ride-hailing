import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LocationRepository } from "src/domain/repositories/location.repository";
import { Location } from '../entities/location.entity';
import { LocationModel } from 'src/domain/model/location.model';

export class LocationRepositoryImp extends LocationRepository {
    constructor(
        @InjectRepository(Location)
        private readonly locationRepository: Repository<Location>
    ) {
        super();
    }

    async insertOne(lat: number, lng: number): Promise<LocationModel> {
        const result = await this.locationRepository
            .createQueryBuilder()
            .insert()
            .into('location')
            .values(
                { lat, lng }
            )
            .returning(['id', 'lat', 'lng'])
            .execute();
        return result.raw[0];
    }
}