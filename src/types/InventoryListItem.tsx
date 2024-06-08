import { Asset } from "./Asset";
import { Employee } from "./Employee";
import { Location } from "./Location";

export interface InventoryListItem {
  id?: number;
  inventory_list_id: number;
  asset_id: number;
  current_employee_id: number;
  new_employee_id: number;
  current_location_id: number;
  new_location_id: number;
}

export interface InventoryListItemDetails {
  id?: number;
  inventory_list_id: number;
  asset: Asset;
  current_employee: Employee;
  new_employee: Employee;
  current_location: Location;
  new_location: Location;
}
