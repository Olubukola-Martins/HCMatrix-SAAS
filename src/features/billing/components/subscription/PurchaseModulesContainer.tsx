import React, { useLayoutEffect, useState } from "react";
import { Form, Steps } from "antd";
import AddOnContainer from "./addOns/AddOnContainer";
import { TCompanySubscription } from "features/billing/types/company/companySubscription";
import { TCreateCompanySubscriptionProps } from "features/billing/hooks/company/useCreateCompanySubscription";
import { useQueryClient } from "react-query";
import { TSubscriptionPriceType } from "features/billing/types/priceType";
import { TBillingCycle } from "features/billing/types/billingCycle";
import PaymentsContainer from "./payment/PaymentsContainer";
import { openNotification } from "utils/notifications";
import { QUERY_KEY_FOR_ACTIVE_COMPANY_SUBSCRITION } from "features/billing/hooks/company/useGetCompanyActiveSubscription";
import { SubscriptionPaymentModal } from "./payment/SubscriptionPaymentModal";
import { appRoutes } from "config/router/paths";
import { Navigate, useNavigate } from "react-router-dom";
import { useGetSubsciptionBillingDetails } from "features/billing/hooks/company/billingDetail/useGetSubsciptionBillingDetails";
import { parsePhoneNumber } from "utils/dataHelpers/parsePhoneNumber";
import { TSubscriptionType } from "features/billing/types/subscription";
import { usePurchaseSubscriptionPlanOrModule } from "features/billing/hooks/subscription/usePurchaseSubscriptionPlanOrModule";
import { formatPhoneNumber } from "utils/dataHelpers/formatPhoneNumber";

const STEPS = ["Select Plan/Add Ons", "Payment", "Select Users"];
const PurchaseModulesContainer: React.FC<{
  subscription?: TCompanySubscription;
  type?: TSubscriptionType;
  cycle?: TBillingCycle;
  currency?: TSubscriptionPriceType;
  planId?: number;
}> = ({ subscription, type = "module", cycle, currency, planId }) => {
  const [form] = Form.useForm<TCreateCompanySubscriptionProps>();
  const { data: billingDetails } = useGetSubsciptionBillingDetails();

  useLayoutEffect(() => {
    if (subscription) {
      const address = billingDetails?.address;

      form.setFieldsValue({
        priceType: subscription?.currency,
        purchased:
          subscription?.type === "module"
            ? subscription?.modules?.map((item) => item.id)
            : subscription?.plan.modules?.map((item) => item.id),
        billingCycle: subscription?.billingCycle,
        licensedEmployeeCount: subscription?.licensedEmployeeCount,
        unlicensedEmployeeCount: subscription?.unlicensedEmployeeCount,
        address: address
          ? {
              countryId: address?.countryId,
              latitude: address?.latitude,
              longitude: address?.longitude,
              lgaId: address?.lgaId ?? undefined,
              stateId: address?.stateId,
              streetAddress: address?.streetAddress,
              timezone: address?.timezone ?? undefined,
            }
          : undefined,
        billingName: billingDetails?.name,
        phoneNumber: parsePhoneNumber(billingDetails?.phone),
      });
    } else {
      form.setFieldsValue({
        priceType: "USD",
        purchased: [],
        billingCycle: "yearly",
      });
    }
  }, [form, subscription, billingDetails]);

  const [activeStep, setActiveStep] = useState(0);
  const [showD, setShowD] = useState(false);

  const handlePrev = () => setActiveStep((prev) => prev - 1);
  const handleNext = () => setActiveStep((prev) => prev + 1);

  const { mutate, isLoading: isPaying } = usePurchaseSubscriptionPlanOrModule();
  const queryClient = useQueryClient();
  const [url, setUrl] = useState<string>();

  const handleSubmit = (data: TCreateCompanySubscriptionProps) => {
    if (!cycle || !currency) return;
    mutate(
      type === "module"
        ? {
            billingCycle: cycle,
            billingInfo: {
              address: data.address,
              name: data.billingName,
              phone: formatPhoneNumber(data.phoneNumber),
            },
            autoRenewal: !!data.autoRenew,
            currency,
            licensedEmployeeCount: data.licensedEmployeeCount,
            moduleIds: data.purchased,
            type,
            unlicensedEmployeeCount: data.unlicensedEmployeeCount,
            addonIds: [
              data?.addOns?.extraStorageId,
              data?.addOns?.supportCaseId,
              data?.addOns?.trainingSessionId,
            ].filter((r) => !!r),
          }
        : {
            billingCycle: cycle,
            billingInfo: {
              address: data.address,
              name: data.billingName,
              phone: formatPhoneNumber(data.phoneNumber),
            },
            autoRenewal: !!data.autoRenew,
            currency,
            licensedEmployeeCount: data.licensedEmployeeCount,
            type,
            planId: data?.planId as number,
            unlicensedEmployeeCount: data.unlicensedEmployeeCount,
            addonIds: [
              data?.addOns?.extraStorageId,
              data?.addOns?.supportCaseId,
              data?.addOns?.trainingSessionId,
            ].filter((r) => !!r),
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
        <>
          <Form
            requiredMark={false}
            form={form}
            labelCol={{ span: 24 }}
            onFinish={handleSubmit}
          >
            <span className="cursor-pointer" onClick={handlePrev}>
              Go Back
            </span>
            <div className={activeStep === 0 ? "block" : "hidden"}>
              <AddOnContainer
                Form={Form}
                selectedPriceType={currency}
                selectedBillingCycle={cycle}
                showPlans={type === "plan"}
                planId={planId}
                onProceed={() => {
                  handleNext();
                }}
              />
            </div>
            <div className={activeStep === 1 ? "block" : "hidden"}>
              <PaymentsContainer
                Form={Form}
                onProceed={() => handleNext()}
                form={form}
                isPayingForSubscription={isPaying}
              />
            </div>
            {activeStep === 2 && (
              <Navigate to={appRoutes.purchaseUserLicense} replace={true} />
            )}
          </Form>
        </>
      </div>
    </>
  );
};

export default PurchaseModulesContainer;
