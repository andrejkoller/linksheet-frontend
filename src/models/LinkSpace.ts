import { User } from "./User";

export interface LinkSpace {
  id: number;
  description: string;
  linkPageBackgroundColor: string;
  linkButtonColor: string;
  linkButtonFontColor: string;
  linkPageFontColor: string;
  linkBorderRadius: LinkBorderRadiusType;
  linkBorderStyle: LinkBorderStyleType;
  user?: User;
  userId?: number;
}

export enum LinkBorderRadiusType {
  NotRounded = "NotRounded",
  SlightlyRounded = "SlightlyRounded",
  Rounded = "Rounded",
}

export enum LinkBorderStyleType {
  Solid = "Solid",
  Dashed = "Dashed",
  Dotted = "Dotted",
}
