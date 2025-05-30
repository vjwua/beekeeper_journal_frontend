export interface Apiary {
  id?: string; // Assuming NestJS returns this as "_id" or "id"
  name: string;
  location?: string;
  description?: string;
}