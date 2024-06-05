import dbConnect from "@/db/db";

class VotationService {
   constructor() {
      dbConnect();
   }

   async getVotationPools() {
      return Votation
   }
}

const votationService = new VotationService();

export default votationService as VotationService;
