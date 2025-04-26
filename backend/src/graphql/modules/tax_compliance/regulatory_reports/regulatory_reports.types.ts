export interface RegulatoryReport {
  report_id: number;
  client_id: number;
  report_type: string;
  report_date: string;
  report_file_url: string;
  status: "pending" | "approved" | "rejected";
  created_at: string;
  updated_at: string;
}

export interface RegulatoryReportInput {
  client_id: number;
  report_type: string;
  report_date: string;
  report_file_url: string;
  status: "pending" | "approved" | "rejected";
}
