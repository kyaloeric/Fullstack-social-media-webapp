import nodemailer from "nodemailer";
import dotenv from "dotenv";
import { mail_configs } from "../interface/mailconfig";

dotenv.config();

function createTransport(config: mail_configs) {
  const transporter = nodemailer.createTransport(config);

  return transporter;
}

let configuration: mail_configs = {
  service: "gmail",
  host: "smtp.gmail.com",
  port: 587,
  requireTLS: true,
  auth: {
    user: process.env.EMAIL as string,
    pass: process.env.PASSWORD as string,
  },
};

export const sendMail = async (messageOption: any) => {
  const transporter = await createTransport(configuration);

  await transporter.verify(); //checks if email & password exist and match as passed in .env

  await transporter.sendMail(messageOption, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log(info.response);
    }
  });
};