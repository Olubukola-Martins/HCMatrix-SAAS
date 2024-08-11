import { BillingData } from "../components/billing/BillingHistoryTable";

export const mockDataBillingHistory: BillingData[] = [
  {
    key: "1",
    billings: "Receipt #01 - Nov 2024",
    date: "Nov 2, 2024",
    status: "Paid",
    type: "Basic Plan",
    amount: "$40",
    billingCycle: "Yearly",
  },
  {
    key: "2",
    billings: "Receipt #02 - Dec 2024",
    date: "Dec 1, 2024",
    status: "Unpaid",
    type: "Premium Plan",
    amount: "$100",
    billingCycle: "Monthly",
  },
  {
    key: "3",
    billings: "Receipt #03 - Jan 2025",
    date: "Jan 15, 2025",
    status: "Paid",
    type: "Standard Plan",
    amount: "$60",
    billingCycle: "Yearly",
  },
  {
    key: "4",
    billings: "Receipt #04 - Feb 2025",
    date: "Feb 10, 2025",
    status: "Unpaid",
    type: "Basic Plan",
    amount: "$40",
    billingCycle: "Monthly",
  },
  {
    key: "5",
    billings: "Receipt #05 - Mar 2025",
    date: "Mar 5, 2025",
    status: "Paid",
    type: "Premium Plan",
    amount: "$100",
    billingCycle: "Yearly",
  },
  {
    key: "6",
    billings: "Receipt #06 - Apr 2025",
    date: "Apr 20, 2025",
    status: "Paid",
    type: "Standard Plan",
    amount: "$60",
    billingCycle: "Monthly",
  },
  {
    key: "7",
    billings: "Receipt #07 - May 2025",
    date: "May 25, 2025",
    status: "Unpaid",
    type: "Basic Plan",
    amount: "$40",
    billingCycle: "Yearly",
  },
  {
    key: "8",
    billings: "Receipt #08 - Jun 2025",
    date: "Jun 10, 2025",
    status: "Paid",
    type: "Premium Plan",
    amount: "$100",
    billingCycle: "Monthly",
  },
  {
    key: "9",
    billings: "Receipt #09 - Jul 2025",
    date: "Jul 1, 2025",
    status: "Paid",
    type: "Standard Plan",
    amount: "$60",
    billingCycle: "Yearly",
  },
  {
    key: "10",
    billings: "Receipt #10 - Aug 2025",
    date: "Aug 15, 2025",
    status: "Unpaid",
    type: "Basic Plan",
    amount: "$40",
    billingCycle: "Monthly",
  },
  {
    key: "11",
    billings: "Receipt #11 - Sep 2025",
    date: "Sep 5, 2025",
    status: "Paid",
    type: "Premium Plan",
    amount: "$100",
    billingCycle: "Yearly",
  },
  {
    key: "12",
    billings: "Receipt #12 - Oct 2025",
    date: "Oct 25, 2025",
    status: "Paid",
    type: "Standard Plan",
    amount: "$60",
    billingCycle: "Monthly",
  },
];
export const freePlanModulesMockData = ["Employee Management", "Core HR", "Payroll (pay-per-use)"];
export const premiumPlanModulesMockData = ["Employee Management", "Core HR", "Payroll (pay-per-use)", "Time and Attendnace", "Recruitment", "Performance Management", "Learning and Development"];
export const basicPlanModulesMockData = ["Core HR", "Employee Management", "Payroll (pay-per-use)", "Time and Attendnace"];

export const rateDetails = [
  ["₦1080/Licensed user/month (billed annually)", "Monthly: ₦1200/user/month"],
  ["₦1000/Unlicensed user/month (billed annually)", "Monthly: ₦2000/user/month"],
];

export const basicPlanFeatures: { name: string; sub_cat?: string[] }[] = [
  { name: "Employee Onboarding" },
  { name: "Employee Database Management." },
  { name: "HR Files Management" },
  {
    name: "Employee Self Service",
    sub_cat: ["Loan", "Vehicle", "Booking", "Leave", "requests", "Health access", "Requisitions", "Handover", "Tasks"],
  },
  { name: "Multi-level Approvals" },
  { name: "Module-based Reports" },
  { name: "Workflow Management" },
  { name: "Payroll Managment" },
];

export const premiumPlanFeatures: { name: string; sub_cat?: string[] }[] = [{ name: "Performance Management" }, { name: "Recruitment" }, { name: "HCMatrix Ai chat bot" }, { name: "Learning and development" }];
