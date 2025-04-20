import express from 'express'
import { SubjectController } from './subject.controller'

const router = express.Router()

router.post('/', SubjectController.createSubject)
router.get('/', SubjectController.getAllSubjects)
router.get('/:id', SubjectController.getSingleSubject)
router.patch('/:id', SubjectController.updateSubject)
router.delete('/:id', SubjectController.deleteSubject)

export const SubjectRoutes = router
