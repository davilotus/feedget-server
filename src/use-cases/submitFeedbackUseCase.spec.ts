import { SubmitFeedbackUsecase } from './submitFeedbackUseCase'

const createFeedbackSpy = jest.fn()
const sendmailSpy = jest.fn()

const submitFeedback = new SubmitFeedbackUsecase(
  { create: createFeedbackSpy },
  { sendMail: sendmailSpy }
)

describe('Submit feedback', () => {
  it('sould be able to sumbimt a feedback', async () => {
    await expect(submitFeedback.execute({
      type: 'BUG',
      comment: 'sample comment',
      screenshot: 'data:image/png;base64,dfuysdasdasdfa7sd98f7'
    })).resolves.not.toThrow()

    expect(createFeedbackSpy).toHaveBeenCalled()
    expect(sendmailSpy).toHaveBeenCalled()
  })

  it('sould not be able to submit feedback without type', async () => {
    await expect(submitFeedback.execute({
      type: '',
      comment: 'sample comment',
      screenshot: 'data:image/png;base64,dfuysdasdasdfa7sd98f7'
    })).rejects.toThrow()
  })

  it('sould not be able to submit feedback without comment', async () => {
    await expect(submitFeedback.execute({
      type: 'BUG',
      comment: '',
      screenshot: 'data:image/png;base64,dfuysdasdasdfa7sd98f7'
    })).rejects.toThrow()
  })


  it('sould not be able to submit feedback with an invalid screenshot', async () => {
    await expect(submitFeedback.execute({
      type: 'BUG',
      comment: 'sample comment',
      screenshot: 'teste.png'
    })).rejects.toThrow()
  })

})