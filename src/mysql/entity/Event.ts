import { Entity, Column, Unique, ManyToOne } from 'typeorm';
import { IsString, IsDate, IsInt, Max, Min, Length } from 'class-validator';
import { Model } from './Model';
import { User } from './User';

@Entity()
@Unique(['slug'])
export class Event extends Model {
    @IsString()
    @Length(0, 100)
    @Column({ type: 'varchar', length: '100' })
    name!: string;

    @IsString()
    @Length(0, 30)
    @Column({ type: 'varchar', length: '30' })
    heroImg!: string;

    @IsDate()
    @Column({ type: 'datetime' })
    dateTime!: Date;

    @Max(720)
    @Min(-720)
    @IsInt()
    @Column({ type: 'smallint' })
    utcOffset!: number;

    @IsString()
    @Length(0, 50)
    @Column({ type: 'varchar', length: '50' })
    address!: string;

    @IsString()
    @Length(0, 30)
    @Column({ type: 'varchar', length: '30' })
    city!: string;

    @IsString()
    @Length(0, 20)
    @Column({ type: 'varchar', length: '20' })
    state!: string;

    @IsString()
    @Length(0, 10000)
    @Column({ type: 'varchar', length: '10000' })
    eventDetails!: string;

    @IsString()
    @Length(0, 100)
    @Column({ type: 'varchar', length: '100' })
    slug!: string;

    @ManyToOne((_type) => User, (user) => user.events)
    user!: User;
}
