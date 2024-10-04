import axios from "axios";
import { MICROSERVICE_ENDPOINTS } from "config/enviroment";
import { TBillingCycle } from "features/billing/types/billingCycle";
import { TSubscriptionPriceType } from "features/billing/types/priceType";
import { useApiAuth } from "hooks/useApiAuth";
import { useMutation } from "react-query";
import { ApiResponse, ICurrentCompany } from "types";
import { TAddress } from "types/address";

type TBillingInfo = {
  name: string;
  phone: string;
  address: TAddress;
};

export type TPurchasePlanOrModulesSubscriptionInputProps =
  | {
      type: "plan"; // enum: module, plan
      billingCycle: TBillingCycle;
      currency: TSubscriptionPriceType;
      autoRenewal: boolean;
      licensedEmployeeCount: number; // min 1
      unlicensedEmployeeCount: number; // min: 0, optional
      planId: number; // required when type is plan, else remove from request
      addonIds?: number[]; // optional
      billingInfo: TBillingInfo;
    }
  | {
      type: "module";
      billingCycle: TBillingCycle;
      currency: TSubscriptionPriceType;
      autoRenewal: boolean;
      licensedEmployeeCount: number; // min 1
      unlicensedEmployeeCount: number; // min: 0, optional
      moduleIds: number[]; // required when type is module, else remove from request
      addonIds?: number[]; // optional

      billingInfo: TBillingInfo;
    };

const createData = async (props: {
  data: TPurchasePlanOrModulesSubscriptionInputProps;
  auth: ICurrentCompany;
}): Promise<ApiResponse<ResponseData>> => {
  const url = `${MICROSERVICE_ENDPOINTS.UTILITY}/subscription/purchase`;
  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${props.auth.token}`,
      "x-company-id": props.auth.companyId,
    },
  };

  const data: TPurchasePlanOrModulesSubscriptionInputProps = {
    ...props.data,
  };

  const response = await axios.post(url, data, config);
  const item: ApiResponse<ResponseData> = response.data;
  return item;
};
export const usePurchaseSubscriptionPlanOrModule = () => {
  const { token, companyId } = useApiAuth();
  return useMutation((props: TPurchasePlanOrModulesSubscriptionInputProps) =>
    createData({
      data: props,
      auth: { token, companyId },
    })
  );
};

type ResponseData = {
  companySubscription: CompanySubscription;
  billingHistory: BillingHistory;
  paymentUrl: string;
};

interface BillingHistory {
  id: number;
  companyId: number;
  companySubscriptionId: number;
  billingDate: string;
  totalSubscriptionAmount: number;
  totalAddonAmount: number;
  totalDiscountAmount: number;
  totalVatAmount: number;
  totalAmount: number;
  amountPaid: number;
  currency: string;
  status: string;
  name: string;
  phone: string;
  addressId: number;
  updatedAt: string;
  createdAt: string;
  paymentReference: string;
}

interface CompanySubscription {
  id: number;
  companyId: number;
  type: string;
  startDate: string;
  endDate: string;
  billingCycle: string;
  currency: string;
  autoRenewal: boolean;
  status: string;
  licensedEmployeeCount: number;
  unlicensedEmployeeCount: number;
  vatId: number;
  planId: number;
  pricingId: number;
  updatedAt: string;
  createdAt: string;
}
