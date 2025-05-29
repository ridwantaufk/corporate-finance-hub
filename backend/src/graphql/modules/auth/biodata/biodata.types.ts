export interface Biodata {
  first_name: string;
  last_name: string;
  date_of_birth: Date;
  gender: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  postal_code: string;
  country: string;
  nationality: string;
  marital_status: string;
  occupation: string;
  updated_at: Date;
  created_at: Date;
}

export interface getBiodataWithId extends Partial<Biodata> {
  biodata_id: number;
}

// properti yang ingin diambil dan required
type RequiredFields = Pick<Biodata, "first_name" | "last_name">;

// properti Biodata yang dikecualikan dan Biodata bersifat opsional
type OptionalFields = Partial<Omit<Biodata, "first_name" | "last_name">>;

// menggbaungkan menjadi tipe baru
export type CreateBiodata = RequiredFields &
  OptionalFields & { biodata_id?: number };

// UpdateBiodata tetap semua opsional kecuali biodata_id wajib
export interface UpdateBiodata extends Partial<Biodata> {
  biodata_id: number;
}
