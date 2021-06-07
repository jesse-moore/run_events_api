import { Entity, Column, ManyToOne, OneToOne, JoinColumn } from 'typeorm';
import {
    IsString,
    IsDate,
    IsInt,
    Min,
    Length,
    IsDefined,
} from 'class-validator';
import { Event, Model, User } from './';
import { Route } from './Route';

@Entity()
export class Race extends Model {
    @IsString({ message: 'Event must have a name' })
    @Length(1, 20, { message: 'Race type cannot be over 20 characters long' })
    @Column({ type: 'varchar', length: '20' })
    name!: string;

    @Min(0)
    @IsInt()
    @Column({ type: 'mediumint' })
    distance!: number;

    @OneToOne((_type) => Route, { cascade: true, eager: true })
    @JoinColumn()
    route!: Route;

    @IsDefined()
    @ManyToOne((_type) => Event, (event) => event.races)
    event!: Event;

    @IsDefined()
    @ManyToOne((_type) => User, (user) => user.events)
    user!: User;
}
