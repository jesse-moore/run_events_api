import { Entity, Column, ManyToOne } from 'typeorm';
import {
    IsString,
    IsDate,
    IsInt,
    Min,
    Length,
    IsDefined,
} from 'class-validator';
import { Event, Model, User } from './';

@Entity()
export class Race extends Model {
    @IsString({ message: 'Event must have a name' })
    @Length(1, 20, { message: 'Race type cannot be over 20 characters long' })
    @Column({ type: 'varchar', length: '20' })
    type!: string;

    @IsDate()
    @Column({ type: 'datetime' })
    dateTime!: Date;

    @Min(0)
    @IsInt()
    @Column({ type: 'mediumint' })
    distance!: number;

    @Column('varchar', { default: '' })
    route: string | undefined;

    @IsDefined()
    @ManyToOne((_type) => Event, (event) => event.races)
    event!: Event;

    @IsDefined()
    @ManyToOne((_type) => User, (user) => user.events)
    user!: User;
}
