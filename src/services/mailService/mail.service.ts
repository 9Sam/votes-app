import nodemailer from "nodemailer";
import getTemplate, { TemplatesE } from "@/utils/htmlTemplates/templates";

type TNodemailerMessage = {
   to: string;
   subject?: string;
   context?: any;
   template: TemplatesE;
};

const transporter = nodemailer.createTransport({
   host: "smtp.gmail.com",
   auth: {
      user: process.env.NODEMAILER_USER,
      pass: process.env.NODEMAILER_PASSWORD,
   },
   secure: true,
});

class MailService {
   constructor() {}

   async sendMail(data: TNodemailerMessage) {
      const mail = {
         from: process.env.NODEMAILER_USER,
         to: data.to,
         subject: data.subject,
         html: getTemplate(data.template, data.context),
      };

      return await transporter.sendMail(mail);
   }
}

const mailService = new MailService();

export default mailService as MailService;
