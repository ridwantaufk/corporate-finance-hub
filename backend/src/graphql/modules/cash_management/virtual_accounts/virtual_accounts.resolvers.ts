import {
  getVirtualAccountById,
  getAllVirtualAccounts,
  createVirtualAccount,
  updateVirtualAccount,
  deleteVirtualAccount,
} from "./virtual_accounts.services";

const VirtualAccountResolver = {
  Query: {
    getVirtualAccount: (_: any, args: { id: number }) =>
      getVirtualAccountById(args.id),
    getAllVirtualAccounts: () => getAllVirtualAccounts(),
  },
  Mutation: {
    createVirtualAccount: (
      _: any,
      args: { account_number: string; balance: number; currency: string }
    ) => createVirtualAccount(args.account_number, args.balance, args.currency),
    updateVirtualAccount: (
      _: any,
      args: {
        id: number;
        account_number?: string;
        balance?: number;
        currency?: string;
      }
    ) =>
      updateVirtualAccount(
        args.id,
        args.account_number,
        args.balance,
        args.currency
      ),
    deleteVirtualAccount: (_: any, args: { id: number }) =>
      deleteVirtualAccount(args.id),
  },
};

export default VirtualAccountResolver;
