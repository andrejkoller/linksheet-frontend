import { User } from "./user";

export interface Link {
    id?: number;
    title: string;
    url: string;
    description: string;
    isActive: boolean;
    user?: User;
    userId?: number;
}