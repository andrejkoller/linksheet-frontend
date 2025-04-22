import { User } from "./User";

export interface LinkSpace {
    id: number;
    linkPageBackgroundColor: string;
    linkButtonColor: string;
    linkButtonFontColor: string;
    linkPageFontColor: string;
    user?: User;
    userId?: number;
}