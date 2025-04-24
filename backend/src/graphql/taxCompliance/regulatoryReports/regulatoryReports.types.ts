export interface RegulatoryReport {
  report_id: number;
  report_type: string;
  client_id: number;
  report_data: any;
  report_date: string;
  submission_status: string;
}

export interface CreateRegulatoryReportInput {
  report_type: string;
  client_id: number;
  report_data: any;
  report_date: string;
  submission_status: string;
}

export interface UpdateRegulatoryReportInput {
  report_type: string;
  client_id: number;
  report_data: any;
  report_date: string;
  submission_status: string;
}
