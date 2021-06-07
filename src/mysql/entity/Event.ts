import { Entity, Column, Unique, ManyToOne, OneToMany } from 'typeorm';
import {
    IsString,
    IsDate,
    IsInt,
    Max,
    Min,
    Length,
    IsDefined,
	IsOptional,
} from 'class-validator';
import { Race, User } from './';
import { Model } from './Model';

@Entity()
@Unique(['slug'])
export class Event extends Model {
    @IsString({ message: 'Event must have a name' })
    @Length(1, 100, { message: 'Name cannot be over 100 characters long' })
    @Column({ type: 'varchar', length: '100' })
    name!: string;

    @IsString()
    @Length(0, 30)
    @Column({ type: 'varchar', length: '30' })
    heroImg!: string;

    @IsDate()
    @Column({ type: 'datetime' })
    dateTime!: Date;

    // @Max(720)
    // @Min(-720)
    // @IsInt()
    // @Column({ type: 'smallint', default: 0 })
    // utcOffset!: number;

    @IsString()
    @Length(0, 50)
    @Column({ type: 'varchar', length: '50', default: '' })
    address!: string;

    @IsString()
    @Length(0, 30)
    @Column({ type: 'varchar', length: '30', default: '' })
    city!: string;

    @IsString()
    @Length(0, 20)
    @Column({ type: 'varchar', length: '20', default: '' })
    state!: string;

    @IsString()
    @Length(0, 10000)
    @Column({ type: 'varchar', length: '10000', default: '' })
    eventDetails!: string;

    @IsString()
    @Length(0, 100)
    @IsOptional()
    @Column({ type: 'varchar', length: '100', nullable: true })
    slug!: string;

    @IsDefined()
    @ManyToOne((_type) => User, (user) => user.events)
    user!: User;

    @OneToMany((_type) => Race, (race) => race.event)
    races!: Race[];
}
