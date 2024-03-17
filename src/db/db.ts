import mongoose from "mongoose";

const MONGO_DB_URL = process.env.DB_URL;

if (!MONGO_DB_URL) {
   throw new Error(
      "Please define the MONGO_DB_URL environment variable inside .env.local"
   );
}

const connect = async () => {
   try {
      const { connection } = await mongoose.connect(MONGO_DB_URL);

      if (connection.readyState === 1) {
         console.log("Database connected");
         return Promise.resolve(true);
      }
   } catch (error) {
      throw new Error("Connection failed!");
   }
};

export default connect;
