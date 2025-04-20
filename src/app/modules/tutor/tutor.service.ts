import QueryBuilder from '../../builder/queryBuilder';
import { tutorSearchableFields } from './tutor.constants';
import { ITutor } from './tutor.interface'
import { Tutor } from './tutor.model'

const createTutorProfileIntoDb = async (payload: ITutor) => {
  console.log(payload);
  
  const tutor = await Tutor.create(payload)
  return tutor
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
  return tutors;
};


 const getSingleTutorFromDb = async (id: string) => {
  return Tutor.findById(id).populate('user')
}

const updateTutorIntoDb = async (id: string, payload: Partial<ITutor>) => {
  return await Tutor.findByIdAndUpdate(id, payload, { new: true });
};

const deleteTutorFromDb = async (id: string) => {
  return await Tutor.findByIdAndDelete(id);
};

export const tutorService = {
    createTutorProfileIntoDb,
    getAllTutorFromDB,
    getSingleTutorFromDb,
    updateTutorIntoDb,
    deleteTutorFromDb

  }
