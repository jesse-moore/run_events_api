import { FileUpload } from 'graphql-upload';
import { User, Event } from '../mysql/entity';

export interface EventInput {
    name: string;
    heroImg: string;
    dateTime: Date;
    utcOffset?: number | null;
    address?: string | null;
    city?: string | null;
    state?: string | null;
    eventDetails?: string | null;
}

export interface EventInterface {
    name: string;
    heroImg: string;
    dateTime: Date;
    utcOffset: number;
    address: string;
    city: string;
    state: string;
    eventDetails: string;
}

export interface RaceInterface {
    type: string;
    distance: number;
    dateTime: Date;
    event: Event;
    user: User;
}

export interface UserDataInterface {
    email: string;
    email_verified: string;
    sub: string;
}

export interface UserInterface {
    email: string;
    id: string;
}

export interface EventActionInterface {
    type: string;
    payload?: any;
}

export interface ModelValidationErrors {
    [key: string]: { [key: string]: string };
}
