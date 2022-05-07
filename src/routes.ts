import express from 'express'
import { NodemailermailAdapter } from './adapters/nodemailer/nodmailerMailAdapter'
import { PrismaFeedbacksRepository } from './repositories/prisma/PrismaFeedbacksRepository'
import {SubmitFeedbackUsecase } from './use-cases/submitFeedbackUseCase'

export const routes = express.Router()

routes.post('/feedbacks', async (req, res) => {
  const {type, comment, screenshot} = req.body

  const prismaFeedbacksrepository = new PrismaFeedbacksRepository()
  const nodemailerMailAdapter = new NodemailermailAdapter

  const submitFeedbacksUseCase = new SubmitFeedbackUsecase(
    prismaFeedbacksrepository,
    nodemailerMailAdapter
  )

  await submitFeedbacksUseCase.execute({
    type,
    comment,
    screenshot
  })

  return res.status(201).send()
})