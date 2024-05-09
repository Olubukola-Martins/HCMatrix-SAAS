export type TPayGrade = {
  id: number;
  name: string;
  label: string;
  categoryId: number;
  grossPay: string;
  companyId: number;
  createdAt: string;
  updatedAt: string;
  category: Category;
};

interface Category {
  id: number;
  name: string;
  label: string;
  minGrossPay: string;
  maxGrossPay: string;
  companyId: number;
  createdAt: string;
  updatedAt: string;
}
