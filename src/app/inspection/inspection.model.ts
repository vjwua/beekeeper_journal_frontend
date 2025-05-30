export interface Inspection {
  id?: string;
  hiveId: string;
  date: string; // ISO string format
  notes?: string;
  actions?: string;
}