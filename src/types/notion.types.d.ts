type NotionTypesT =
   | "checkbox"
   | "created_by"
   | "created_time"
   | "date"
   | "email"
   | "files"
   | "formula"
   | "last_edited_by"
   | "last_edited_time"
   | "multi_select"
   | "number"
   | "people"
   | "phone_number"
   | "relation"
   | "rollup"
   | "rich_text"
   | "select"
   | "status"
   | "title"
   | "url"
   | "unique_id"
   | "verification";

type NotionSelectOptions = {
   id: string;
   name: string;
   color: string;
};

type NotionStatusGroup = NotionSelectOptions & {
   option_ids: string[];
};

type NotionTextObjectT = {
   type: "text";
   text: {
      content: string;
      link: string | null;
   };
   annotations: {
      bold: boolean;
      italic: boolean;
      strikethrough: boolean;
      underline: boolean;
      code: boolean;
      color: string;
   };
   plain_text: string;
   href: string | null;
};

type NotionPropertiesAttributes<T> = {
   id: string;
   name: string;
   type: NotionTypesT;
   checkbox?: {};
   created_by?: {};
   created_time?: Date;
   date?: {};
   email?: {};
   files?: {};
   multi_select?: {
      options: NotionSelectOptions[];
   };
   number?: {
      format: string;
   };
   people?: {};
   phone_number?: {};
   relation?: [];
   title?: NotionTextObjectT[];
   rich_text?: NotionTextObjectT[];
   rollup?: {
      rollup_property_name: string;
      relation_property_name: string;
      rollup_property_id: string;
      relation_property_id: string;
      function: string;
   };
   select?: {
      options: NotionSelectOptions[];
   };
   status?: {
      options: NotionSelectOptions[];
      groups: NotionStatusGroup[];
   };
   url?: {};
};

type NotionObjectT = {
   id: string;
   object: string;
};

type NotionResultT = {
   object: "page";
   id: string;
   created_time: Date;
   last_edited_time: Date;
   created_by: NotionObjectT;
   last_edited_by: NotionObjectT;
   cover: {
      type: "external";
      external: {
         url: string;
      };
   } | null;
   icon?: {
      type: "emoji";
      emoji: string;
   } | null;
   parent: {
      type: "database_id";
      database_id: string;
   };
   properties: {
      [key: string]: NotionPropertiesAttributes<string>;
   };
   archived: boolean;
};
