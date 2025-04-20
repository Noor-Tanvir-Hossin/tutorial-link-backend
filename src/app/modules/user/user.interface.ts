import { USER_ROLE } from "./user.constant";

// export type Tuser= {
//     name:string;
//     email:string;
//     password: string;
//     role?: "admin" | "user" ;
//     isActive: boolean;
//     passwordChangeAt: Date;
    
// }

export type UserRole = 'student' | 'tutor'

export interface Tuser {
  name: string
  email: string
  password: string
  image:string
  role: UserRole
  passwordChangeAt: Date;
}


export type TUserRole = keyof typeof USER_ROLE;