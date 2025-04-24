export interface ImportExportTracking {
  tracking_id: number;
  shipment_id: string;
  shipment_date: string;
  origin: string;
  destination: string;
  current_status: string;
}

export interface CreateImportExportTrackingInput {
  shipment_id: string;
  shipment_date: string;
  origin: string;
  destination: string;
  current_status: string;
}
