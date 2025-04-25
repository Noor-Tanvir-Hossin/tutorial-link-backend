import { StatusCodes } from 'http-status-codes';
import QueryBuilder from '../../builder/queryBuilder';
import AppError from '../../error/AppError';
import { User } from '../user/user.model';
import { tutorSearchableFields } from './tutor.constants';
import { ITutor } from './tutor.interface'
import { Tutor } from './tutor.model' 


const createTutorProfileIntoDb = async (payload: ITutor) => {
  // console.log(payload);

//  const user = await User.findOne({email:payload.email})
// const user= await User.findById(payload.user)


// const tutor = await Tutor.findOne({email: payload.email})

// if (tutor){
//   throw new AppError(StatusCodes.NOT_ACCEPTABLE, 'Tutor Already Created')
// }
// if (user?.email !== payload.email){
//   throw new AppError(StatusCodes.NOT_ACCEPTABLE, 'This is not a valid email')
// }

  
// console.log(payload);
  const result = await Tutor.create(payload)
  if(result){
    console.log(payload);
    const updateUser  = await User.findByIdAndUpdate(payload?.user, {isComplete: true, image: payload?.image })
    console.log(updateUser);
  }
  return result
}

//  const getAllTutorFromDB = async () => {
//   return Tutor.find().populate('user').populate('subjects')
// }

export const getAllTutorFromDB = async (filters: Record<string, unknown>) => {
  const tutorsQuery = Tutor.find().populate('user').populate('subjects');

  const queryBuilder = new QueryBuilder<ITutor>(tutorsQuery, filters)
    .search(tutorSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const tutors = await queryBuilder.modelQuery;
  console.log(JSON.stringify(tutors, null, 2));
  return tutors;
};


 const getSingleTutorFromDb = async (id: string) => {
  // console.log(id);
  // const objId = isValidObjectId(id)

  const tutor = await Tutor.findById(id)
  // console.log(tutor);
return tutor
}
 const getSingleTutorByTutorIdFromDb = async (id: string) => {
  // console.log(id);
  // const objId = isValidObjectId(id)
console.log(id);
  const tutor = await Tutor.findOne({user: id})
  // console.log(tutor);
return tutor
}

const updateTutorIntoDb = async (id: string, payload: Partial<ITutor>) => {
const result =   await Tutor.findOneAndUpdate({user:id}, payload, { new: true });
console.log(result);
  return result
};

const deleteTutorFromDb = async (id: string) => {
  return await Tutor.findByIdAndDelete(id);
};

export const tutorService = {
    createTutorProfileIntoDb,
    getSingleTutorByTutorIdFromDb,
    getAllTutorFromDB,
    getSingleTutorFromDb,
    updateTutorIntoDb,
    deleteTutorFromDb

  }
