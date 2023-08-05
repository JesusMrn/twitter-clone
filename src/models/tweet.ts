import { Account } from "./";

export interface Tweet {
  id?: number;
  user: Account;
  content: string;
  date: number;
  comment?: number;
  comments: number[];
}
