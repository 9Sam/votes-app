import recoverPassword from "./recoverPassword";

export enum TemplatesE {
   RECOVER_PASSWORD = "recoverPassword",
   PASSWORD_RESET = "passwordReset",
}

const EmailTemplates = {
   recoverPassword: (context: any) => recoverPassword(context),
   passwordReset: (context: any) => recoverPassword(context),
};

const getTemplate = (template: TemplatesE, context: any) => {
   return EmailTemplates[template](context);
};

export default getTemplate;
