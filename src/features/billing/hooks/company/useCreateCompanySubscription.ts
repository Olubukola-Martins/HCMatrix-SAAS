import axios from "axios";
import { MICROSERVICE_ENDPOINTS } from "config/enviroment";
import { TBillingCycle } from "features/billing/types/billingCycle";
import { TCreateCompSubscriptionResponse } from "features/billing/types/company/createCompanySubscriptionResponse";
import { TSubscriptionPriceType } from "features/billing/types/priceType";
import { useApiAuth } from "hooks/useApiAuth";
import { useMutation } from "react-query";
import { ICurrentCompany } from "types";
import { TAddress } from "types/address";
import { formatPhoneNumber } from "utils/dataHelpers/formatPhoneNumber";

type TCreateCompanySubscriptionApiProps = {
  autoRenew: boolean;
  billingCycle: TBillingCycle;
  priceType: TSubscriptionPriceType;
  licensedEmployeeCount: number;
  unlicensedEmployeeCount: number;
  purchased: Purchased[];
  addOns: AddOns;
  billingDetail: BillingDetail;
};

interface BillingDetail {
  billingName: string;
  phoneNumber: string;
  address: Address;
}

interface Address extends TAddress {}

interface AddOns {
  extraStorageId: number;
  supportCaseId: number;
  trainingSessionId?: any;
}

interface Purchased {
  subscriptionId: number;
}
export type TCreateCompanySubscriptionProps = Omit<
  TCreateCompanySubscriptionApiProps,
  "purchased" | "billingDetail"
> & {
  purchased: number[];
  address: TAddress;
  phoneNumber: {
    code: string;
    number: string;
  };
  billingName: string;
};
const createData = async (props: {
  data: TCreateCompanySubscriptionApiProps;
  auth: ICurrentCompany;
}): Promise<TCreateCompSubscriptionResponse> => {
  const url = `${MICROSERVICE_ENDPOINTS.UTILITY}/subscription/company`;
  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${props.auth.token}`,
      "x-company-id": props.auth.companyId,
    },
  };

  const data: TCreateCompanySubscriptionApiProps = {
    ...props.data,
  };

  const response = await axios.post(url, data, config);
  const item: TCreateCompSubscriptionResponse = response.data;
  return item;
};
export const useCreateCompanySubscription = () => {
  const { token, companyId } = useApiAuth();
  return useMutation((props: TCreateCompanySubscriptionProps) =>
    createData({
      data: {
        autoRenew: props.autoRenew,
        addOns: props.addOns,
        billingCycle: props.billingCycle,
        licensedEmployeeCount: props.licensedEmployeeCount,
        unlicensedEmployeeCount: props.unlicensedEmployeeCount,
        priceType: props.priceType,
        purchased: props.purchased.map((id) => ({ subscriptionId: id })),
        billingDetail: {
          address: props.address,
          billingName: props.billingName,
          phoneNumber: formatPhoneNumber(props?.phoneNumber),
        },
      },
      auth: { token, companyId },
    })
  );
};
