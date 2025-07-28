import { Session, User } from "next-auth"
export interface ExtendedUser extends User {
    // Add additional properties here
    first_name: string;
    last_name: string;
    email: string;
    img: string;
    role: string;
    id: string;
  }
  export interface ExtendedSession extends Session {
    user_id: string;
    user_first_name: string;
    user_last_name: string;
    user_email: string;
    user_img: string;
    user_role: string;
  }

  