import React, { useLayoutEffect, useState } from "react";
import { Form, Skeleton, Steps } from "antd";

import { useQueryClient } from "react-query";

import { openNotification } from "utils/notifications";
import { QUERY_KEY_FOR_ACTIVE_COMPANY_SUBSCRITION } from "features/billing/hooks/company/useGetCompanyActiveSubscription";
import { appRoutes } from "config/router/paths";
import { Navigate, useNavigate } from "react-router-dom";
import { useGetSubsciptionBillingDetails } from "features/billing/hooks/company/billingDetail/useGetSubsciptionBillingDetails";
import { TSubscriptionType } from "features/billing/types/subscription";
import { TSubscriptionPlan } from "features/billing/hooks/plan/useGetGetSubscriptionPlanById";
import {
  TPurchasePlanOrModulesSubscriptionInputProps,
  usePurchaseSubscriptionPlanOrModule,
} from "features/billing/hooks/subscription/usePurchaseSubscriptionPlanOrModule";
import SelectPlanOrAddOns from "./SelectPlanOrAddOns";
import PlanPaymentsContainer from "./PlanPaymentsContainer";
import { SubscriptionPaymentModal } from "../subscription/payment/SubscriptionPaymentModal";

const STEPS = ["Select Plan/Add Ons", "Payment", "Select Users"];
export type PurchaseSubscriptionPlanFormFields =
  TPurchasePlanOrModulesSubscriptionInputProps & {
    storageId?: number;
    trainingSessionId?: number;
    supportCaseId?: number;
    unlicensedEmployeeAddOnId?: number;
  };
const PurchaseSubscriptionPlan: React.FC<{
  plan?: TSubscriptionPlan;
  type?: TSubscriptionType;
}> = ({ plan, type = "module" }) => {
  const [form] = Form.useForm<PurchaseSubscriptionPlanFormFields>();
  const { data: billingDetails, isFetching: isFetchingDetails } =
    useGetSubsciptionBillingDetails();

  useLayoutEffect(() => {
    if (billingDetails)
      form.setFieldsValue({
        billingInfo: {
          address: {
            countryId: billingDetails?.address.countryId,
            latitude: billingDetails?.address.latitude,
            lgaId: billingDetails?.address.lgaId,
            longitude: billingDetails?.address.longitude,
            stateId: billingDetails?.address.stateId,
            streetAddress: billingDetails?.address.streetAddress,
            timezone: billingDetails?.address.timezone,
          },
          name: billingDetails?.name,
          phone: billingDetails?.phone,
        },
      });
  }, [billingDetails, form]);

  const [activeStep, setActiveStep] = useState(0);
  const [showD, setShowD] = useState(false);

  const handlePrev = () => setActiveStep((prev) => prev - 1);
  const handleNext = () => setActiveStep((prev) => prev + 1);

  const { mutate, isLoading: isPaying } = usePurchaseSubscriptionPlanOrModule();
  const queryClient = useQueryClient();
  const [url, setUrl] = useState<string>();

  const handleSubmit = (data: PurchaseSubscriptionPlanFormFields) => {
    const addonIds: number[] = [];
    if (data.storageId) {
      addonIds.push(data.storageId);
    }
    if (data.supportCaseId) {
      addonIds.push(data.supportCaseId);
    }
    if (data.trainingSessionId) {
      addonIds.push(data.trainingSessionId);
    }
    if (data.unlicensedEmployeeAddOnId) {
      addonIds.push(data.unlicensedEmployeeAddOnId);
    }
    if (!plan) return;
    mutate(
      {
        autoRenewal: data.autoRenewal,
        billingCycle: data.billingCycle,
        billingInfo: data.billingInfo,
        currency: data.currency,
        licensedEmployeeCount: data.licensedEmployeeCount,
        planId: plan?.id,
        type: "plan",
        unlicensedEmployeeCount: data.unlicensedEmployeeCount,
        addonIds,
      },
      {
        onError: (err: any) => {
          openNotification({
            state: "error",
            title: "Error Occurred",
            duration: 2,
            description:
              err?.response.data.message ?? err?.response.data.error.message,
          });
        },
        onSuccess: (res) => {
          openNotification({
            state: "success",

            title: "Success",
            description: res.message,
            // duration: 0.4,
          });
          setShowD(true);
          res.data?.paymentUrl && setUrl(res.data?.paymentUrl);
          queryClient.invalidateQueries({
            queryKey: [QUERY_KEY_FOR_ACTIVE_COMPANY_SUBSCRITION],
            // exact: true,
          });
        },
      }
    );
  };
  const onClose = () => {
    setShowD(false);
    setUrl(undefined);
  };
  const navigate = useNavigate();
  return (
    <>
      <SubscriptionPaymentModal
        open={showD}
        handleClose={() => onClose()}
        url={url}
        onPaymentCompletion={() => navigate(appRoutes.purchaseUserLicense)}
      />
      <div className="w-full flex flex-col  gap-12 ">
        <div className="self-center">
          <Steps progressDot current={activeStep}>
            {STEPS.map((item) => (
              <Steps.Step
                key={item}
                title={<span className="text-sm">{item}</span>}
              />
            ))}
          </Steps>
        </div>
        <Skeleton active loading={isFetchingDetails} paragraph={{ rows: 17 }}>
          <Form
            requiredMark={false}
            form={form}
            labelCol={{ span: 24 }}
            onFinish={handleSubmit}
          >
            <div className={activeStep === 0 ? "block" : "hidden"}>
              <SelectPlanOrAddOns
                plan={plan}
                Form={Form}
                onProceed={() => {
                  handleNext();
                  // setActiveStep(2);
                }}
              />
            </div>
            <div className={activeStep === 1 ? "block" : "hidden"}>
              <PlanPaymentsContainer
                Form={Form}
                onProceed={() => handleNext()}
                form={form}
              />
            </div>
            {activeStep === 2 && (
              <Navigate to={appRoutes.purchaseUserLicense} replace={true} />
            )}
          </Form>
        </Skeleton>
      </div>
    </>
  );
};

export default PurchaseSubscriptionPlan;
