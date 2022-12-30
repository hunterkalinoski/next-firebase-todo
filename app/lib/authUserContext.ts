import { createContext } from "react";
import { User } from "firebase/auth";

export const AuthUserContext = createContext<User | null>(null);
