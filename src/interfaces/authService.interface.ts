export type RecoverEmailContextT = {
   name: string;
   link: string;
};

export interface AuthServiceI {
   requestPasswordReset(email: string): Promise<string | void>;
   resetPassword(userId: string, token: string, password: string) : Promise<boolean>;
   sendEmail(email: string, context: RecoverEmailContextT): Promise<void>;
}