import { createContext } from "vm";
import { Message } from "../components/Chat";

export class User {
  constructor(public userName: string, public id: string) {}
}

export type DashboardState = {
  loggedIn: boolean;
  userName?: string;
  userId?: string;
  user?: User;
  handleUserNameUpdate(v: string): void;
  termsAccept(): void;
};
