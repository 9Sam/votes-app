import { UserI } from "../interfaces/user.interface";
import { getText, getTitle } from "../utils/notion.utils";

export const mapToUser = ({ properties, id }: any): UserI => {
   const user: UserI = {
      _id: id,
      name: getTitle(properties.name),
      email: getText(properties.email),
      password: getText(properties.password),
      picture: getText(properties.picture),
   };

   return user;
};
