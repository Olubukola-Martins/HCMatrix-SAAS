export type TSalaryComponent =
  | {
      id: number;
      schemeId: number;
      name: string;
      label: string;
      mode: "fixed" | "percentage";
      isDefault?: boolean;
      isActive?: boolean;
      amount: number;
      createdAt: string;
      updatedAt: string;
    }
  | {
      id: number;
      schemeId: number;
      name: string;
      label: string;
      mode: "formula";
      isDefault?: boolean;
      isActive?: boolean;
      amount: string;
      createdAt: string;
      updatedAt: string;
    };
