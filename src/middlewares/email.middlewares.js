import nodemailer from 'nodemailer';

export const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.CODE_SENDING_EMAIL,
    pass: process.env.CODE_SENDING_PASSWORD
  },
});