import UserTypeDefs from "../modules/auth/users/user.schema";
import TwoFactorAuthTypeDefs from "../modules/auth/two_factor_auth/two_factor_auth.schema";
import ApprovalMatrixTypeDefs from "../modules/auth/approval_matrix/approval_matrix.schema";

import VirtualAccountTypeDefs from "../modules/cash_management/virtual_accounts/virtual_accounts.schema";
import CashPositionTypeDefs from "../modules/cash_management/cash_positions/cash_positions.schema";
import ScheduledPaymentTypeDefs from "../modules/cash_management/scheduled_payments/scheduled_payments.schema";

import BulkPaymentTypeDefs from "../modules/payments_collections/bulk_payments/bulk_payments.schema";
import InvoiceTypeDefs from "../modules/payments_collections/invoices/invoices.schema";
import ReconciliationTypeDefs from "../modules/payments_collections/reconciliations/reconciliations.schema";

import LetterOfCreditTypeDefs from "../modules/trade_finance/letter_of_credit/letter_of_credit.schema";
import InvoiceFinancingTypeDefs from "../modules/trade_finance/invoice_financing/invoice_financing.schema";
import ImportExportTrackingTypeDefs from "../modules/trade_finance/import_export_tracking/import_export_tracking.schema";

import FxTransactionsTypeDefs from "../modules/treasury_fx/fx_transactions/fx_transactions.schema";
import IntercompanySettlementsTypeDefs from "../modules/treasury_fx/intercompany_settlements/intercompany_settlements.schema";

import EFakturTypeDefs from "../modules/tax_compliance/e_faktur/e_faktur.schema";
import RegulatoryReportsTypeDefs from "../modules/tax_compliance/regulatory_reports/regulatory_reports.schema";
import AmlChecksTypeDefs from "../modules/tax_compliance/aml_checks/aml_checks.schema";

import CashFlowForecastsTypeDefs from "../modules/analytics/cash_flow_forecasts/cash_flow_forecasts.schema";
import TransactionRiskScoresTypeDefs from "../modules/analytics/transaction_risk_scores/transaction_risk_scores.schema";
import TransactionHeatmapTypeDefs from "../modules/analytics/transaction_heatmap/transaction_heatmap.schema";

const typeDefs = [
  UserTypeDefs,
  TwoFactorAuthTypeDefs,
  ApprovalMatrixTypeDefs,

  VirtualAccountTypeDefs,
  CashPositionTypeDefs,
  ScheduledPaymentTypeDefs,

  BulkPaymentTypeDefs,
  InvoiceTypeDefs,
  ReconciliationTypeDefs,

  LetterOfCreditTypeDefs,
  InvoiceFinancingTypeDefs,
  ImportExportTrackingTypeDefs,

  FxTransactionsTypeDefs,
  IntercompanySettlementsTypeDefs,

  EFakturTypeDefs,
  RegulatoryReportsTypeDefs,
  AmlChecksTypeDefs,

  CashFlowForecastsTypeDefs,
  TransactionRiskScoresTypeDefs,
  TransactionHeatmapTypeDefs,
];

export default typeDefs;
