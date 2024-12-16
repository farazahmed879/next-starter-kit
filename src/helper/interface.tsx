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
