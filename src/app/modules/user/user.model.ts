import { Schema, model } from "mongoose";
import { Tuser } from "./user.interface";
import config from "../../config";
import bcrypt from 'bcrypt';


const userSchema = new Schema<Tuser>({
    name: {
        type: String,
        required: true,       
    },
    email: {
        type: String,
        required: true,
        unique:true
    },
    password: {
        type: String,
        required: true,
        select:0
    },
    
    role:{
        type: String,
        enum: ['admin','user'],
        default:'user'
    },
    
       
},
    {
        timestamps:true,
    }
)


userSchema.pre('save', async function(next){
    const user= this
    user.password= await bcrypt.hash(user.password, Number(config.bcrypt_salt_rounds))
    next()
  
  })
//   userSchema.post('save', function(doc, next){

//     doc.password="";
//     // console.log('we saved our data');
  
//     next()
//   })

  export const User= model<Tuser>('User', userSchema)

/* name: string – The full name of the user.
email: string – The email address of the user, used for authentication and communication.
password: string – The password for the user, securely stored.
role: "admin" | "user" – The role of the user, determining their access level. Default is "user".
isBlocked: boolean – A flag indicating whether the user is blocked or not. Default is false.
createdAt: Date – The timestamp when the user was created.
updatedAt: Date – The timestamp of the last update to the user. */