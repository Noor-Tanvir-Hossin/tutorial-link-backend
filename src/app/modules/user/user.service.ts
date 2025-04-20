import { Tuser } from "./user.interface";
import { User } from "./user.model";

const createStudentIntoDB = async (payload: Tuser): Promise<Tuser> => {
    // payload.role = 'tutor';
    const result = await User.create(payload)
  
    return result
  }
  
  const getUserFromDB = async () => {
    const result = await User.find()
    return result
  }
  
  const getSingleUserFromDB = async (id: string) => {
    const result = await User.findById(id)
    return result
  }

  const getUserByEmailFromDB = async (email : string) => {
    const result = await User.findOne({email})
    return result;
}
  
  const updateUserIntoDB = async (id: string, data: Tuser) => {
    const result = await User.findByIdAndUpdate(id, data, {
      new: true,
    })
    return result
  }
  const blockUserFromDB = async (id: string, data: Tuser) => {
    const result = await User.findByIdAndUpdate(id, data, {
      new: true,
    })
    return result
  }

  const updateUserRoleFromDB = async (id: string, role: "admin" | "user") => {
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { role },
      { new: true }
    );
    if (!updatedUser) throw new Error("User not found");
    return updatedUser;
  };

  const updateUserStatusFromDB = async (id: string, isActive: boolean) => {
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { isActive },
      { new: true }
    );
    if (!updatedUser) throw new Error("User not found");
    return updatedUser;
  };
  
//   const deleteUser = async (id: string) => {
//     const result = await User.findByIdAndDelete(id)
//     return result
//   }

  export const userService = {
    createStudentIntoDB,
    getUserFromDB,
    getSingleUserFromDB,
    getUserByEmailFromDB,
    updateUserIntoDB,
    blockUserFromDB,
    updateUserRoleFromDB,
    updateUserStatusFromDB
    // deleteUser,
  }