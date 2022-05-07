import { MailAdapter } from '../adapters/mailAdapter'
import { FeedbacksRepository } from '../repositories/FeedbacksRepository'

interface SubmitFeedbackUseCaseRequest {
  type: string
  comment: string
  screenshot?: string
}

export class SubmitFeedbackUsecase {
  constructor(
    private feedbacksRepositoriy: FeedbacksRepository,
    private mailAdapter: MailAdapter
  ){}

  async execute(request: SubmitFeedbackUseCaseRequest ){
    const { type, comment, screenshot } = request

    if (screenshot && !screenshot.startsWith('data:image/png;base64')) {
      throw new Error('Invalid screenshot format.')
    }

    if (!type) {
      throw new Error('Type is required')
    }

    if (!comment) {
      throw new Error('Comment is required')
    }

    await this.feedbacksRepositoriy.create({
      type,
      comment,
      screenshot
    })

    await this.mailAdapter.sendMail({
      subject: 'Novo feedback',
      body:[
        `<div style="font-family: sans-serif; font-sie: 16px color: #111">`,
        `<p>Tipo do feedback: ${type}</p>`,
        `<p>Comentário: ${comment}</p>`,
        screenshot ? `<img src="${screenshot}"` : ``,
        `</div>`
      ].join('\n')
    })
  }
}