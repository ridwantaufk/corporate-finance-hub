import GraphQLJSON from "graphql-type-json";
import {
  getLetterOfCredits,
  getLetterOfCreditById,
  createLetterOfCredit,
  updateLetterOfCredit,
  deleteLetterOfCredit,
} from "./letterOfCredit.services";

export const letterOfCreditResolvers = {
  JSON: GraphQLJSON,

  Query: {
    getLetterOfCredits: async (_: any, __: any, { db }: any) => {
      return getLetterOfCredits(db);
    },
    getLetterOfCreditById: async (_: any, { id }: any, { db }: any) => {
      return getLetterOfCreditById(Number(id), db);
    },
  },
  Mutation: {
    createLetterOfCredit: async (_: any, { input }: any, { db }: any) => {
      return createLetterOfCredit(input, db);
    },
    updateLetterOfCredit: async (_: any, { id, input }: any, { db }: any) => {
      return updateLetterOfCredit(Number(id), input, db);
    },
    deleteLetterOfCredit: async (_: any, { id }: any, { db }: any) => {
      return deleteLetterOfCredit(Number(id), db);
    },
  },
};
