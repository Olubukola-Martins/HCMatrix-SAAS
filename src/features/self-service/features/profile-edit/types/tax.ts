export interface TaxData {
  category: `tax`;
  content: Content;
}

interface Content {
  taxAuthorityId: number;
  taxAuthorityName: string;
  employeeTaxId: string;
}
