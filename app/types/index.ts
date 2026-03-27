export interface Option {
  id: string;
  name: string;
}

export interface CommonData {
  id: string;
  name: string;
  code: string;
}

export enum AccessType {
  ADMIN = "ADMIN",
  MEMBER = "TEAM_MEMBER",
}

export interface Usermini {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
}

export interface CurrencyType {
  id: string;
  name: string;
  symbol: string;
}

export type DateRangeKeyword =
  | "this_month"
  | "last_month"
  | "this_quarter"
  | "last_quarter"
  | "this_year"
  | "last_year";

  export interface DateRange {
  startDate: string;
  endDate: string;
} 
