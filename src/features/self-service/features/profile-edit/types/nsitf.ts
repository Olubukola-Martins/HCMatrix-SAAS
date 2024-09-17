export interface NSITFData {
  category: "nsitf";
  content: Content;
}

interface Content {
  nsitfAuthorityId: number;
  nsitfAuthorityName: string;
  employeeNsitfId: string;
}
