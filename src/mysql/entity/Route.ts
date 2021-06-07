import { Entity, Column, OneToOne } from 'typeorm';
import { IsJSON } from 'class-validator';
import { Point, FeatureCollection, LineString, Feature } from 'geojson';
import { Model, Race } from './';

@Entity()
export class Route extends Model {
    @IsJSON()
    @Column({ type: 'simple-json' })
    points: FeatureCollection<Point> | undefined;

    @IsJSON()
    @Column({ type: 'simple-json' })
    route: FeatureCollection<LineString> | undefined;

    @IsJSON()
    @Column({ type: 'simple-json', nullable: true })
    routeStartMarker: Feature<Point> | undefined;

    @IsJSON()
    @Column({ type: 'simple-json', nullable: true })
    routeEndMarker: Feature<Point> | undefined;

    @OneToOne((_type) => Race, (race) => race.route)
    race!: Race;
}
