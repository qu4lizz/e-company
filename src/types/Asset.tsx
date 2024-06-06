import { Employee } from "./Employee";
import { Location } from "./Location";

export interface Asset {
  id?: number;
  name: string;
  description: string;
  barcode: string;
  price: number;
  created_at?: string;
  location_id: number;
  employee_id: number;
  image: string;
}

export interface AssetWithLocationAndEmployee {
  id?: number;
  name: string;
  description: string;
  barcode: string;
  price: number;
  created_at?: string;
  location: Location;
  employee: Employee;
  image: string;
}
