import UserTypeDefs from "@/graphql/modules/auth/users/user.schema";
import BiodataTypeDefs from "@/graphql/modules/auth/biodata/biodata.schema";
import TwoFactorAuthTypeDefs from "@/graphql/modules/auth/two_factor_auth/two_factor_auth.schema";
import ApprovalMatrixTypeDefs from "@/graphql/modules/auth/approval_matrix/approval_matrix.schema";

// import VirtualAccountTypeDefs from "@/graphql/modules/cash_management/virtual_accounts/virtual_accounts.schema";
// import CashPositionTypeDefs from "@/graphql/modules/cash_management/cash_positions/cash_positions.schema";
// import ScheduledPaymentTypeDefs from "@/graphql/modules/cash_management/scheduled_payments/scheduled_payments.schema";

// import BulkPaymentTypeDefs from "@/graphql/modules/payments_collections/bulk_payments/bulk_payments.schema";
// import InvoiceTypeDefs from "@/graphql/modules/payments_collections/invoices/invoices.schema";
// import ReconciliationTypeDefs from "@/graphql/modules/payments_collections/reconciliations/reconciliations.schema";

// import LetterOfCreditTypeDefs from "@/graphql/modules/trade_finance/letter_of_credit/letter_of_credit.schema";
// import InvoiceFinancingTypeDefs from "@/graphql/modules/trade_finance/invoice_financing/invoice_financing.schema";
// import ImportExportTrackingTypeDefs from "@/graphql/modules/trade_finance/import_export_tracking/import_export_tracking.schema";

// import FxTransactionsTypeDefs from "@/graphql/modules/treasury_fx/fx_transactions/fx_transactions.schema";
// import IntercompanySettlementsTypeDefs from "@/graphql/modules/treasury_fx/intercompany_settlements/intercompany_settlements.schema";

// import EFakturTypeDefs from "@/graphql/modules/tax_compliance/e_faktur/e_faktur.schema";
// import RegulatoryReportsTypeDefs from "@/graphql/modules/tax_compliance/regulatory_reports/regulatory_reports.schema";
// import AmlChecksTypeDefs from "@/graphql/modules/tax_compliance/aml_checks/aml_checks.schema";

// import CashFlowForecastsTypeDefs from "@/graphql/modules/analytics/cash_flow_forecasts/cash_flow_forecasts.schema";
// import TransactionRiskScoresTypeDefs from "@/graphql/modules/analytics/transaction_risk_scores/transaction_risk_scores.schema";
// import TransactionHeatmapTypeDefs from "@/graphql/modules/analytics/transaction_heatmap/transaction_heatmap.schema";

const typeDefs = [
  UserTypeDefs,
  BiodataTypeDefs,
  TwoFactorAuthTypeDefs,
  ApprovalMatrixTypeDefs,

  // VirtualAccountTypeDefs,
  // CashPositionTypeDefs,
  // ScheduledPaymentTypeDefs,

  // BulkPaymentTypeDefs,
  // InvoiceTypeDefs,
  // ReconciliationTypeDefs,

  // LetterOfCreditTypeDefs,
  // InvoiceFinancingTypeDefs,
  // ImportExportTrackingTypeDefs,

  // FxTransactionsTypeDefs,
  // IntercompanySettlementsTypeDefs,

  // EFakturTypeDefs,
  // RegulatoryReportsTypeDefs,
  // AmlChecksTypeDefs,

  // CashFlowForecastsTypeDefs,
  // TransactionRiskScoresTypeDefs,
  // TransactionHeatmapTypeDefs,
];

export default typeDefs;
