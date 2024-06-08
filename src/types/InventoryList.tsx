import { InventoryListItemDetails } from "./InventoryListItem";

export interface InventoryList {
  id?: number;
  name: string;
  created_at: string;
}

export interface InventoryListDetails {
  id: number;
  name: string;
  created_at: string;
  assets: InventoryListItemDetails[];
}
