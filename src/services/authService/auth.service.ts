import crypto, { randomUUID } from "crypto";
import bcrypt from "bcrypt";
import dbConnect from "@/db/db";
import User from "@/models/user.model";
import Token from "@/models/token.model";
import MailService from "@/services/mailService/mail.service";
import { UserDocumentI, UserI, UserModelI } from "@/interfaces/user.interface";
import { TemplatesE } from "@/utils/htmlTemplates/templates";
import { TRecoverPasswordTemplate } from "@/utils/htmlTemplates/recoverPassword";
import { AuthServiceI, RecoverEmailContextT } from "@/interfaces/authService.interface";
import userService from "@/services/userService/user.service";



class AuthService implements AuthServiceI {
   constructor() {
      dbConnect();
   }

   async requestPasswordReset(email: string): Promise<string | void> {
      const user = await this.validateUserExists(email);

      try {
         await this.validateTokenExists(user);

         let resetToken = crypto.randomBytes(32).toString("hex");

         const hash = await bcrypt.hash(
            resetToken,
            Number(process.env.BCRYPT_SALT)
         );

         await Token.create({
            userId: user.id,
            token: hash,
            createdAt: new Date(),
         });

         const link = `${process.env.HOST}/auth/reset/password?token=${resetToken}&id=${user.id}`;

         if (user.name) {
            this.sendEmail(user.email, { name: user.name, link: link });
         }

         return link;
      } catch (error) {
         if (error instanceof Error) {
            throw new Error(error.message);
         }
      }
   }

   async resetPassword(userId: string, token: string, password: string): Promise<boolean> {
      let passwordResetToken = await Token.findOne({ userId });

      if (!passwordResetToken) {
         throw new Error("Invalid or expired password reset token");
      }

      const isValid = await bcrypt.compare(token, passwordResetToken.token);

      if (!isValid) {
         throw new Error("Invalid or expired password reset token");
      }

      const hashedPassword = await bcrypt.hash(
         password,
         Number(process.env.BCRYPT_SALT)
      );

      await User.updateOne({ _id: userId }, { password: hashedPassword });

      const user = await User.findOne({ _id: userId });

      MailService.sendMail({
         to: user?.email || "user",
         subject: "Password reset",
         context: {
            name: user?.name || "user",
         },
         template: TemplatesE.PASSWORD_RESET,
      });

      await Token.deleteOne({ userId });

      return true;
   }

   private async validateUserExists(email: string) {
      const user = await User.findOne({ email });

      if (!user) throw new Error("User does not exist");

      return user;
   }

   private async validateTokenExists(user: UserDocumentI) {
      let token = await Token.findOne({ userId: user.id });

      if (token) await Token.deleteOne({ userId: user.id });
   }

   async sendEmail(email: string, context: RecoverEmailContextT) {
      const user = await this.validateUserExists(email);

      if (!user) {
         throw new Error("User not found");
      }

      try {
         await MailService.sendMail({
            to: email as string,
            subject: "Recover password",
            context: {
               link: context.link,
               email: email,
            } as TRecoverPasswordTemplate,
            template: TemplatesE.RECOVER_PASSWORD,
         });

         console.log("Email has been sent to " + email);
      } catch (error) {
         console.log(error);
      }
   }

   async createUserIfNotExists(credentials: any, user: any) {
      if (credentials === null || credentials === undefined) {
         const foundUser = await userService.getUser(user.email);

         if(!foundUser){
            await userService.createUser({
               name: user.name,
               email: user.email,
               password: randomUUID(),
               picture: user.image,
            } as any);
         }
      }
      return true;
   }
}

const authService = new AuthService();

export default authService as AuthService;
