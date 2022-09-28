import nodeMailer from 'nodemailer';
import { config } from '../../../utils/config';

interface Options {
  email: string;
  subject: string;
  message: string;
}

export async function sendMail(options: Options) {
  const transporter = nodeMailer.createTransport({
    host: config.SMPT_HOST,
    port: config.SMPT_PORT,
    service: config.SMPT_SERVICE,
    auth: {
      user: config.SMPT_MAIL,
      pass: config.SMPT_PASSWORD,
    },
  });

  const mailOptions = {
    from: config.SMPT_MAIL,
    to: options.email,
    subject: options.subject,
    text: options.message,
  };

  await transporter.sendMail(mailOptions);
}
