export interface EventInterface {
    name: string;
    heroImg: {
        image: { name: string; size: number; src: string; file: File } | null;
        error: string | null;
    };
    date: string;
    address: string;
    city: string;
    state: string;
    time: string;
    eventDetails: string;
}

export interface UserDataInterface {
    email: string;
    email_verified: string;
    sub: string;
}

export interface EventActionInterface {
    type: string;
    payload?: any;
}
