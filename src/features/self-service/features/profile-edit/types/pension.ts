export interface PensioData {
  category: "pension";
  content: Content;
}

interface Content {
  pensionType: string;
  employeePensionId: string;
  pensionAdministratorId: number;
  pensionAdministratorName: string;
}
