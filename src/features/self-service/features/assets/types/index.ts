export interface TAssetType {
  id: number;
  name: string;
  label: string;
  companyId: number;
  createdAt: string;
  updatedAt: string;
}

export interface TAsset {
  id: number;
  name: string;
  typeId: number;
  status: string;
  imageUrl: string;
  uid: string;
  serialNumber: string;
  brand: string;
  model: string;
  cost: string;
  vendor: string;
  purchaseDate: string;
  color: string;
  description: string;
  assigneeId?: any;
  dateAssigned?: any;
  documentUrls?: any;
  companyId: number;
  createdAt: string;
  updatedAt: string;
  type: Type;
  assignee?: any;
  assigneeHistory: any[];
}

interface Type {
  id: number;
  name: string;
  label: string;
  companyId: number;
  createdAt: string;
  updatedAt: string;
}
