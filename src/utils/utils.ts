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
