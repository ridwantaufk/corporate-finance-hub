export interface ImportExportTracking {
  tracking_id: number;
  shipment_id: string;
  shipment_date: string;
  origin: string;
  destination: string;
  current_status: string;
}

export interface ImportExportTrackingInput {
  shipment_id: string;
  shipment_date: string;
  origin: string;
  destination: string;
  current_status: string;
}

export interface ImportExportTrackingUpdateInput {
  shipment_id?: string;
  shipment_date?: string;
  origin?: string;
  destination?: string;
  current_status?: string;
}
