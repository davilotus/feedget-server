import { MailAdapter, SendMailData } from '../mailAdapter'
import nodemailer from 'nodemailer'


const transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "dfa9d82f403470",
    pass: "c3c1ae02221b10"
  }
})

export class NodemailermailAdapter implements MailAdapter {
  async sendMail({ subject, body }: SendMailData) {

    await transport.sendMail({
      from: 'Equipe Feedget <hello@feedget.com>',
      to: 'Davidson Silva <contato@davidsonsilva.com.br>',
      subject,
      html: body
    })
  }
}