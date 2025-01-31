export interface UserSignupAuthentication {
    id: number;
    name: string;
    email: string;
    password: string;
    active: boolean;
    profiles: string[];
    permissions: string[];
}