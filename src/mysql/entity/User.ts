import { Entity, Column, Unique, OneToMany } from 'typeorm';
import { Model } from './Model';
import { Event } from './Event';

@Entity()
@Unique(['id', 'email'])
export class User extends Model {
    constructor(email: string, id: string) {
        super();
        this.email = email;
        this.id = id;
    }

    @Column({ type: 'varchar', length: '50' })
    email!: string;

    @Column({ type: 'varchar', length: '50' })
    id!: string;

    @OneToMany((_type) => Event, (event) => event.user)
    events!: Event[];
}
