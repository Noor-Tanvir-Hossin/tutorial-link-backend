import { Schema, model } from "mongoose";
import config from "../../config";
import bcrypt from 'bcrypt';
import { Tuser } from "./user.interface";


const userSchema = new Schema<Tuser>({
    name: {
        type: String,
        required: true,       
    },
    isComplete: {
        type: Boolean,
        required: true,   
        default: false    
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
    image:{
        type:String,
        required:false
    },
    passwordChangeAt: {
        type: Date,
      },
    
    role:{
        type: String,
        enum: ['tutor','student'],
        default:'student'
    },  
       
},
    {
        timestamps:true,
    }
)


userSchema.pre('save', async function(next){
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const user= this
    user.password= await bcrypt.hash(user.password, Number(config.bcrypt_salt_rounds))
    next()
  
  })

  export const User= model<Tuser>('User', userSchema)

