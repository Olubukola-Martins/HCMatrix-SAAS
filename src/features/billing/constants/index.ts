import { TAddOn } from "../types";
import { TTrainingSessionBookingStatus } from "../types/addOns/trainingSession";

export const INVOICE_QUOTATION_BOTTOM_INFO =
  "This quote does not include integrations or development-related customizations for HCMATRIX, which is a subscription-based cloud SaaS. This quote does not include travel arrangements (if the need be) - Invoicing: The next payment date will be 12 months following the subscription.The quote includes VAT. - Annual Renewal includes the following benefits: - Technical Support & Bug Fixes: Standard technical support, system troubleshooting, and so forth. - System Upgrades: Receive full access to all new system enhancements, UI/UX improvements, and security updates atleast twice a year. - Configuration Support: Virtual assistance with any necessary configuration modifications.";

export const SUBSCRIPTION_ADD_ONS: TAddOn[] = [
  {
    name: "supportCase",
    title: "Support Case",
    options: [
      { label: "Support Case 1", value: "Support Case 1" },
      { label: "Support Case 2", value: "Support Case 2" },
    ],
  },
  {
    name: "extraStorage",
    title: "Extra Storage",
    options: [
      { label: "Support Case 1", value: "Support Case 1" },
      { label: "Support Case 2", value: "Support Case 2" },
    ],
  },
  {
    name: "trainingSession",
    title: "Training Session",
    options: [
      { label: "Support Case 1", value: "Support Case 1" },
      { label: "Support Case 2", value: "Support Case 2" },
    ],
  },
];

export const PRICE_TYPE_CURRENCY = {
  ngn: "₦",
  usd: "$",
};

export const TRAINING_BOOKING_STATUSES: TTrainingSessionBookingStatus[] = [
  "accepted",
  "completed",
  "pending",
  "rejected",
];
