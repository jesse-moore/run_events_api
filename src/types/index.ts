import { Feature, FeatureCollection, LineString, Point } from 'geojson';
import { FileUpload } from 'graphql-upload';
import { User, Event } from '../mysql/entity';

export interface EventInput {
    name: string;
    heroImg: string;
    dateTime: Date;
    address?: string | null;
    city?: string | null;
    state?: string | null;
    eventDetails?: string | null;
}

export interface EventInterface {
    name: string;
    heroImg: string;
    dateTime: Date;
    address: string;
    city: string;
    state: string;
    eventDetails: string;
}

export interface EventDetails {
    name: string;
    dateTime: Date;
    address: string;
    city: string;
    state: string;
    id: string;
}

export interface Race extends RaceDetails {
    route: Route;
}

export type Route = {
    points: FeatureCollection<Point>;
    route: FeatureCollection<LineString>;
    routeStartMarker?: Feature<Point>;
    routeEndMarker?: Feature<Point>;
};

export type RaceDetails = {
    name: string;
    distance: number;
};

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
