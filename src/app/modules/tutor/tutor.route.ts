import express from 'express'
import {  tutorControlller } from './tutor.controller'

const router = express.Router()

router.post('/', tutorControlller.createTutorProfile)
router.get('/', tutorControlller.getAllTutor)
router.get('/:id', tutorControlller.getSingleTutor)
router.get('/tutorid/:id', tutorControlller.getSingleTutorByTutorId)
router.patch('/:id', tutorControlller.updateTutor)
router.delete('/:id', tutorControlller.deleteTutor)

export const TutorRoutes = router
