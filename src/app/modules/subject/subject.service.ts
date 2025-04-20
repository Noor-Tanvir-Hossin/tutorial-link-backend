import { SubjectModel } from './subject.model'
import { ISubject } from './subject.interface'


  const createSubjectIntoDb = async (payload: ISubject) => {
    return await SubjectModel.create(payload)
  };

  const getAllSubjectsFromDb= async () => {
    return await SubjectModel.find()
  };

  const getSingleSubjectFromDb= async (id: string) => {
    return await SubjectModel.findById(id)
  };

  const updateSubjectIntoDB = async (id: string, payload: Partial<ISubject>) => {
    return await SubjectModel.findByIdAndUpdate(id, payload, { new: true })
  };

  const deleteSubjectFromDb= async (id: string) => {
    return await SubjectModel.findByIdAndDelete(id)
  };


export const subjectService={
    createSubjectIntoDb,
    getAllSubjectsFromDb,
    getSingleSubjectFromDb,
    updateSubjectIntoDB,
    deleteSubjectFromDb
}