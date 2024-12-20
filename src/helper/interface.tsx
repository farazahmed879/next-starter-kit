import { ReactNode } from "react";

export interface Column {
  id:
    | "name"
    | "image"
    | "contact"
    | "action"
    | "department"
    | "description"
    | "file"
    | "duration"
    | "email"
    | "message"
    | "location"
    | "role";
  label: string;
  minWidth?: number;
  align?: "right";
  format?: (value: number) => string;
  renderCell?: any;
}

export interface Data {
  name: string;
  image: string;
  contact: number;
  department: string;
  description: string;
  file: File;
  duration: number;
  email: string;
}

export interface Session {
  user?: {
    id?: string | null;
    name?: string | null;
    image?: string | null;
    email?: string | null;
  };
}


export interface AuthContextType {
  user: DecodedToken | null;
  registerInfo: RegisterInfo;
  updateregisterInfo: (info: RegisterInfo) => Promise<void>;
  isLoading: boolean;
}

export interface RegisterInfo {
  name: string;
  email: string;
  password: string;
}

export interface DecodedToken {
  // Define the structure of the decoded token here, e.g.
  email: string;
  name: string;
  // You can add more properties as per your decoded JWT structure
}

export interface AuthContextProviderProps {
  children: ReactNode;
}


export interface User {
  _id: string;
  name: string;
  email: string;
}

export interface Chat {
  members: string[];
}

export interface UseFetchRecipientUserReturn {
  receipientUser: any | null;
  error: any | null;
}

