import {
  getCashPositionById,
  getAllCashPositions,
  createCashPosition,
  updateCashPosition,
  deleteCashPosition,
} from "./cash_positions.services";

const CashPositionResolver = {
  Query: {
    getCashPosition: (_: any, args: { id: number }) =>
      getCashPositionById(args.id),
    getAllCashPositions: () => getAllCashPositions(),
  },
  Mutation: {
    createCashPosition: (
      _: any,
      args: {
        account_id: number;
        amount: number;
        currency: string;
        position_date: string;
      }
    ) =>
      createCashPosition(
        args.account_id,
        args.amount,
        args.currency,
        args.position_date
      ),
    updateCashPosition: (
      _: any,
      args: {
        id: number;
        account_id?: number;
        amount?: number;
        currency?: string;
        position_date?: string;
      }
    ) =>
      updateCashPosition(
        args.id,
        args.account_id,
        args.amount,
        args.currency,
        args.position_date
      ),
    deleteCashPosition: (_: any, args: { id: number }) =>
      deleteCashPosition(args.id),
  },
};

export default CashPositionResolver;
