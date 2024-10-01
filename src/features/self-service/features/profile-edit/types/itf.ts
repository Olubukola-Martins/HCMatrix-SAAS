export interface ITFData {
  category: "itf";
  content: Content;
}

interface Content {
  employeeItfId: string;
  itfAuthorityId: number;
  itfAuthorityName: string;
}
