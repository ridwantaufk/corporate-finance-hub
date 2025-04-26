// backend/src/graphql/types/index.ts
import { User } from "../modules/auth/users/user.types";
import { TwoFactorAuth } from "../modules/auth/two_factor_auth/two_factor_auth.types";
import { ApprovalMatrix } from "../modules/auth/approval_matrix/approval_matrix.types";
import { CashPosition } from "../modules/cash_management/cash_positions/cash_positions.types";
import { VirtualAccount } from "../modules/cash_management/virtual_accounts/virtual_accounts.types";
import { ScheduledPayment } from "../modules/cash_management/scheduled_payments/scheduled_payments.types";
import { BulkPayment } from "../modules/payments_collections/bulk_payments/bulk_payments.types";
import { Invoice } from "../modules/payments_collections/invoices/invoices.types";
import { Reconciliation } from "../modules/payments_collections/reconciliations/reconciliations.types";
import {
  LetterOfCredit,
  LetterOfCreditInput,
  LetterOfCreditUpdateInput,
} from "../modules/trade_finance/letter_of_credit/letter_of_credit.types";
import {
  InvoiceFinancing,
  InvoiceFinancingInput,
  InvoiceFinancingUpdateInput,
} from "../modules/trade_finance/invoice_financing/invoice_financing.types";
import {
  ImportExportTracking,
  ImportExportTrackingInput,
  ImportExportTrackingUpdateInput,
} from "../modules/trade_finance/import_export_tracking/import_export_tracking.types";
import {
  FxTransaction,
  FxTransactionInput,
  FxTransactionUpdateInput,
} from "../modules/treasury_fx/fx_transactions/fx_transactions.types";
import {
  IntercompanySettlement,
  IntercompanySettlementInput,
  IntercompanySettlementUpdateInput,
} from "../modules/treasury_fx/intercompany_settlements/intercompany_settlements.types";
import {
  EFaktur,
  EFakturInput,
} from "../modules/tax_compliance/e_faktur/e_faktur.types";
import {
  RegulatoryReport,
  RegulatoryReportInput,
} from "../modules/tax_compliance/regulatory_reports/regulatory_reports.types";
import {
  AmlCheck,
  AmlCheckInput,
} from "../modules/tax_compliance/aml_checks/aml_checks.types";
import { CashFlowForecast } from "../modules/analytics/cash_flow_forecasts/cash_flow_forecasts.types";
import { TransactionRiskScore } from "../modules/analytics/transaction_risk_scores/transaction_risk_scores.types";
import { TransactionHeatmap } from "../modules/analytics/transaction_heatmap/transaction_heatmap.types";

// Hanya ekspor tipe dan input tanpa mencoba mengelompokkannya dalam objek
export {
  User,
  TwoFactorAuth,
  ApprovalMatrix,
  CashPosition,
  VirtualAccount,
  ScheduledPayment,
  BulkPayment,
  Invoice,
  Reconciliation,
  LetterOfCredit,
  LetterOfCreditInput,
  LetterOfCreditUpdateInput,
  InvoiceFinancing,
  InvoiceFinancingInput,
  InvoiceFinancingUpdateInput,
  ImportExportTracking,
  ImportExportTrackingInput,
  ImportExportTrackingUpdateInput,
  FxTransaction,
  FxTransactionInput,
  FxTransactionUpdateInput,
  IntercompanySettlement,
  IntercompanySettlementInput,
  IntercompanySettlementUpdateInput,
  EFaktur,
  EFakturInput,
  RegulatoryReport,
  RegulatoryReportInput,
  AmlCheck,
  AmlCheckInput,
  CashFlowForecast,
  TransactionRiskScore,
  TransactionHeatmap,
};
