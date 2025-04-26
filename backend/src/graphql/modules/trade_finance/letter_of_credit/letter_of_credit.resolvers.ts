import {
  createLetterOfCredit,
  getAllLetterOfCredits,
  getLetterOfCreditById,
  updateLetterOfCredit,
  deleteLetterOfCredit,
} from "./letter_of_credit.services";

const LetterOfCreditResolvers = {
  Query: {
    getAllLetterOfCredits: async () => await getAllLetterOfCredits(),
    getLetterOfCreditById: async (_: any, { lc_id }: { lc_id: number }) =>
      await getLetterOfCreditById(lc_id),
  },
  Mutation: {
    createLetterOfCredit: async (_: any, { input }: any) =>
      await createLetterOfCredit(input),
    updateLetterOfCredit: async (_: any, { lc_id, input }: any) =>
      await updateLetterOfCredit(lc_id, input),
    deleteLetterOfCredit: async (_: any, { lc_id }: any) =>
      await deleteLetterOfCredit(lc_id),
  },
};

export default LetterOfCreditResolvers;
