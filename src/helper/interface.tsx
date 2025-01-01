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
  createdAt: string | null;
  email: string | null;
  name: string | null;
  role: string | null;
  updatedAt: string | null;
  _id: string | null;
}

export interface Chat {
  members: string[];
  reatedAt: "";
  updatedAt: "";
  _id: "";
}

export interface UseFetchRecipientUserReturn {
  receipientUser: User | null;
  error: any | null;
}

export interface Notifications {
  senderId: string;
  isRead: boolean;
  date: string;
  senderName?: string;
  message?: string
}

export interface Message {
  chatId: string;
  createdAt: string;
  senderId: string;
  text: string;
  updatedAt: string;
  _id: string;
}

export interface OnlineUser {
  userId: string,
  socketId: string
}
