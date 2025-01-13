import nodemailer from 'nodemailer';

export const transporter = nodemailer.createTransport({
  host: 'http://localhost:3333',
  secure: false,
  auth: {
    user: process.env.CODE_SENDING_EMAIL,
    pass: process.env.CODE_SENDING_PASSWORD
  },
});