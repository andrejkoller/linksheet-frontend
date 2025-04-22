import { User } from "./User";

export interface LinkSpace {
    id: number;
    linkPageBackgroundColor: string;
    linkButtonColor: string;
    linkButtonFontColor: string;
    linkPageFontColor: string;
    linkBorderRadius: LinkBorderRadiusType;
    user?: User;
    userId?: number;
}

export enum LinkBorderRadiusType {
    NotRounded = "NotRounded",
    SlightlyRounded = "SlightlyRounded",
    Rounded = "Rounded",
}