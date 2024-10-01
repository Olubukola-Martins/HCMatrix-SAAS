export interface CreateBankDetail {
  category: "bank-detail";
  content: Content;
}

interface Content {
  accountNumber: string;
  bankName: string;
  bankCode: string;
  bvn: string;
}
