import React, { useLayoutEffect, useState } from "react";
import { Form, Steps } from "antd";
import AddOnContainer from "./addOns/AddOnContainer";
import { TCompanySubscription } from "features/billing/types/company/companySubscription";
import {
  TCreateCompanySubscriptionProps,
  useCreateCompanySubscription,
} from "features/billing/hooks/company/useCreateCompanySubscription";
import { useQueryClient } from "react-query";
import {
  ECreateCompanySubscriptionOps,
  useCreateCompanySubscriptionStateAndDispatch,
} from "features/billing/stateManagers";
import PaymentsContainer from "./payment/PaymentsContainer";
import { useGetAllSubscriptions } from "features/billing/hooks/useGetAllSubscriptions";
import { openNotification } from "utils/notifications";
import { QUERY_KEY_FOR_ACTIVE_COMPANY_SUBSCRITION } from "features/billing/hooks/company/useGetCompanyActiveSubscription";
import { SubscriptionPaymentModal } from "./payment/SubscriptionPaymentModal";
import { appRoutes } from "config/router/paths";
import { Navigate, useNavigate } from "react-router-dom";
import { useGetSubsciptionBillingDetails } from "features/billing/hooks/company/billingDetail/useGetSubsciptionBillingDetails";
import { parsePhoneNumber } from "utils/dataHelpers/parsePhoneNumber";
import { TSubscriptionType } from "features/billing/types/subscription";
import PurchaseModulesContainer from "./PurchaseModulesContainer";
import { TBillingCycle } from "features/billing/types/billingCycle";
import { TSubscriptionPriceType } from "features/billing/types/priceType";

const PurchaseExtraLicenseContainer: React.FC<{
  subscription?: TCompanySubscription;
  type?: TSubscriptionType;
  cycle?: TBillingCycle;
  currency?: TSubscriptionPriceType;
}> = ({ subscription, type = "module", cycle, currency }) => {
  return (
    <PurchaseModulesContainer
      subscription={subscription}
      currency={currency}
      cycle={cycle}
      type={type}
    />
  );
};

export default PurchaseExtraLicenseContainer;
