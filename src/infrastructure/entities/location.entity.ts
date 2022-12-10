import { LocationModel } from "src/domain/model/location.model";
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Location implements LocationModel {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('decimal')
    lat: number;

    @Column('decimal')
    lng: number;
}