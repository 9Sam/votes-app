// ** GET NOTION PROPERTIES

export const getRelations = (
   notionProperty: NotionPropertiesAttributes<string>
) => {
   const relations = notionProperty?.relation || [];
   return relations.map((property: any) => property.id);
};

export const getText = (
   notionProperties: NotionPropertiesAttributes<string>
) => {
   const textArray = notionProperties?.rich_text || [];
   const text = textArray.map((text: any) => text.plain_text).join("");

   return text;
};

export const getTitle = (
   notionProperties: NotionPropertiesAttributes<string>
) => {
   const textArray = notionProperties?.title || [];
   const text = textArray.map((text: any) => text.plain_text).join("");
   return text;
};

export const getDate = (
   notionProperties: NotionPropertiesAttributes<string>
): Date => {
   const date = notionProperties?.created_time || new Date();
   return date;
};

// * CREATE NOTION PROPERTIES

export const createTextField = (text: string) => {
   return {
      rich_text: [
         {
            text: {
               content: text,
            },
         },
      ],
   };
};

export const createTitleField = (title: string) => {
   return {
      title: [
         {
            text: {
               content: title,
            },
         },
      ],
   };
};

export const createEmailField = (email: string) => {
   return {
      email: email,
   };
};

export const createDateField = (date: Date) => {
   return {
      created_time: {
         date: {
            start: date.toISOString(),
         },
      },
   };
};
