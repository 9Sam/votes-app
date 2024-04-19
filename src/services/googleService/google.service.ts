import fs from "fs";
import { google } from "googleapis";
import apikeys from "../../../apiKeys.json";

const SCOPES = [process.env.GOOGLE_SCOPES?.split(",")] && [
   "https://www.googleapis.com/auth/drive",
];

async function authorize() {
   const jwtClient = new google.auth.JWT(
      apikeys.client_email,
      undefined,
      apikeys.private_key,
      SCOPES
   );
   await jwtClient.authorize();
   return jwtClient;
}

const driveInstance = async () => {
   const authClient = await authorize();
   const drive = google.drive({ version: "v3", auth: authClient });
   return drive;
};

const GoogleService = {
   async listFilesByFolderId(
      folderId: string
   ): Promise<DriveFile[] | [] | null> {
      const drive = await driveInstance();

      try {
         const response = await drive.files.list({
            q: `'${folderId}' in parents`,
            fields: "files(id, name)",
         });

         return (response.data.files as DriveFile[]) || [];
      } catch (err) {
         console.error(err);
         return null;
      }
   },

   async uploadFile({
      file,
      fileName,
      mimeType,
   }: DriveUploadFile): Promise<string | null> {
      const drive = await driveInstance();

      var fileMetaData = {
         name: fileName,
         parents: [process.env.GOOGLE_FOLDER_ID],
      };

      try {
         const res = await drive.files.create({
            resource: fileMetaData,
            media: {
               body: fs.createReadStream("./mydrivetext.txt"),
               mimeType: mimeType,
            },
            fields: "id",
         } as any);

         return res.data.id || null;
      } catch (err) {
         console.error(err);
         return null;
      }
   },

   async getFileById(fileId: string) {
      const drive = await driveInstance();

      try {
         const file = await drive.files.get({ fileId: fileId, alt: "media" });

         return file.data;
      } catch (err) {
         console.error(err);
         return null;
      }
   },

   async deleteFileById(fileId: string): Promise<boolean | null> {
      const drive = await driveInstance();

      try {
         await drive.files.delete({
            fileId: fileId,
         });

         return true;
      } catch (err) {
         console.error(err);
         return null;
      }
   },
};

export default Object.freeze(GoogleService);
