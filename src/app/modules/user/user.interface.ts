import { USER_ROLE } from './user.constant';


export type UserRole = 'student' | 'tutor'

export interface Tuser {
  name: string;
  isComplete:boolean;
  email: string;
  password: string;
  image?:string;
  role: UserRole;
  passwordChangeAt: Date;
}


export type TUserRole = keyof typeof USER_ROLE;
