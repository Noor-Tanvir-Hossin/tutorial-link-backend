export type TLoginUser = {
   email : string, 
   password : string
} 

export interface TChangePassword {
   oldPassword : string,
   newPassword : string;
}