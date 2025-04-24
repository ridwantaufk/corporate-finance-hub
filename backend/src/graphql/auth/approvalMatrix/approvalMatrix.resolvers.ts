import { IResolvers } from "@graphql-tools/utils";
import { Context } from "@/types/context";
import {
  getApprovalMatrix,
  createApprovalMatrix,
} from "./approvalMatrix.services";
import { ApprovalMatrix } from "./approvalMatrix.types";
import GraphQLJSON from "graphql-type-json";

export const approvalMatrixResolvers: IResolvers<any, Context> = {
  JSON: GraphQLJSON,

  Query: {
    getApprovalMatrix: async (_: any, __: any, { db }: Context) => {
      const client = await db.connect();
      try {
        return await getApprovalMatrix(client);
      } finally {
        client.release();
      }
    },
  },

  Mutation: {
    createApprovalMatrix: async (
      _: any,
      { input }: { input: ApprovalMatrix },
      { db }: Context
    ): Promise<ApprovalMatrix> => {
      const client = await db.connect();
      try {
        return await createApprovalMatrix(input, client);
      } finally {
        client.release();
      }
    },
  },
};
