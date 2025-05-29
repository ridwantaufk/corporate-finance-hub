import UserResolver from "@/graphql/modules/auth/users/user.resolvers";
import biodataResolver from "@/graphql/modules/auth/biodata/biodata.resolvers";
import TwoFactorAuthResolver from "@/graphql/modules/auth/two_factor_auth/two_factor_auth.resolvers";
import ApprovalMatrixResolver from "@/graphql/modules/auth/approval_matrix/approval_matrix.resolvers";

// import VirtualAccountResolver from "@/graphql/modules/cash_management/virtual_accounts/virtual_accounts.resolvers";
// import CashPositionResolver from "@/graphql/modules/cash_management/cash_positions/cash_positions.resolvers";
// import ScheduledPaymentResolver from "@/graphql/modules/cash_management/scheduled_payments/scheduled_payments.resolvers";

// import BulkPaymentResolver from "@/graphql/modules/payments_collections/bulk_payments/bulk_payments.resolvers";
// import InvoiceResolver from "@/graphql/modules/payments_collections/invoices/invoices.resolvers";
// import ReconciliationResolver from "@/graphql/modules/payments_collections/reconciliations/reconciliations.resolvers";

// import LetterOfCreditResolvers from "@/graphql/modules/trade_finance/letter_of_credit/letter_of_credit.resolvers";
// import InvoiceFinancingResolver from "@/graphql/modules/trade_finance/invoice_financing/invoice_financing.resolvers";
// import ImportExportTrackingResolver from "@/graphql/modules/trade_finance/import_export_tracking/import_export_tracking.resolvers";

// import FxTransactionsResolver from "@/graphql/modules/treasury_fx/fx_transactions/fx_transactions.resolvers";
// import IntercompanySettlementsResolver from "@/graphql/modules/treasury_fx/intercompany_settlements/intercompany_settlements.resolvers";

// import EFakturResolver from "@/graphql/modules/tax_compliance/e_faktur/e_faktur.resolvers";
// import RegulatoryReportsResolvers from "@/graphql/modules/tax_compliance/regulatory_reports/regulatory_reports.resolvers";
// import AmlChecksResolvers from "@/graphql/modules/tax_compliance/aml_checks/aml_checks.resolvers";

// import CashFlowForecastsResolver from "@/graphql/modules/analytics/cash_flow_forecasts/cash_flow_forecasts.resolvers";
// import TransactionRiskScoresResolver from "@/graphql/modules/analytics/transaction_risk_scores/transaction_risk_scores.resolvers";
// import TransactionHeatmapResolver from "@/graphql/modules/analytics/transaction_heatmap/transaction_heatmap.resolvers";

const resolvers = [
  UserResolver,
  biodataResolver,
  TwoFactorAuthResolver,
  ApprovalMatrixResolver,

  // VirtualAccountResolver,
  // CashPositionResolver,
  // ScheduledPaymentResolver,

  // BulkPaymentResolver,
  // InvoiceResolver,
  // ReconciliationResolver,

  // LetterOfCreditResolvers,
  // InvoiceFinancingResolver,
  // ImportExportTrackingResolver,

  // FxTransactionsResolver,
  // IntercompanySettlementsResolver,

  // EFakturResolver,
  // RegulatoryReportsResolvers,
  // AmlChecksResolvers,

  // CashFlowForecastsResolver,
  // TransactionRiskScoresResolver,
  // TransactionHeatmapResolver,
];

export default resolvers;
