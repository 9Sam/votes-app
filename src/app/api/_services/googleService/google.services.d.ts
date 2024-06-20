interface DriveFile {
   kind?: string;
   id?: string;
   name?: string;
   mimeType?: string;
}

interface DriveGeneralResponse {
   status: number;
   statusText: string;
   request: {
      responseURL: string;
   };
   config: {
      url: string;
   };
}

interface DriveGetFileResponse extends DriveGeneralResponse {
   data: DriveFile;
}

interface DriveUploadFileResponse extends DriveGeneralResponse {
   data: {
      id: string;
   };
}

type DriveUploadFile = {
   file?: File;
   fileName: string;
   mimeType: DriveMimeTypeE;
};
