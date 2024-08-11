import React, { useLayoutEffect, useState } from "react";
import { Form, Segmented, Steps } from "antd";
import ModuleContainer from "./modules/ModuleContainer";
import AddOnContainer from "./addOns/AddOnContainer";
import { AppButton } from "components/button/AppButton";
import { TCompanySubscription } from "features/billing/types/company/companySubscription";
import { TCreateCompanySubscriptionProps, useCreateCompanySubscription } from "features/billing/hooks/company/useCreateCompanySubscription";
import { useQueryClient } from "react-query";
import { TSubscriptionPriceType } from "features/billing/types/priceType";
import { TBillingCycle } from "features/billing/types/billingCycle";
import { ECreateCompanySubscriptionOps, useCreateCompanySubscriptionStateAndDispatch } from "features/billing/stateManagers";
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

const STEPS = ["Select Plan/Add Ons", "Payment", "Select Users"];
const PurchaseExtraLicenseContainer: React.FC<{
  subscription?: TCompanySubscription;
  type?: TSubscriptionType;
}> = ({ subscription, type = "module" }) => {
  const [form] = Form.useForm<TCreateCompanySubscriptionProps>();
  const { data: billingDetails, isFetching: isFetchingDetails } = useGetSubsciptionBillingDetails();
  const { data: subscriptions, isFetching: isFetchingSubscriptions } = useGetAllSubscriptions({
    type,
  });
  const {
    state: { billingCycle: selectedBillingCycle, priceType: selectedPriceType, autoRenew: autoRenewal },
    dispatch,
  } = useCreateCompanySubscriptionStateAndDispatch();
  useLayoutEffect(() => {
    const ASSUMED_EMPLOYEE_SUBSCRIPTION_ID = 1;
    const EMPLOYEMENT_SUBSCRIPTION_ID = subscriptions?.data.find((item) => item.label === "employee-management")?.id ?? ASSUMED_EMPLOYEE_SUBSCRIPTION_ID;
    if (subscription) {
      const address = billingDetails?.address;

      form.setFieldsValue({
        priceType: subscription?.priceType,
        purchased: subscription?.purchased === undefined || subscription?.purchased?.length > 0 ? subscription?.purchased?.map((item) => item.subscriptionId) : [EMPLOYEMENT_SUBSCRIPTION_ID],
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
        billingName: billingDetails?.billingName,
        phoneNumber: parsePhoneNumber(billingDetails?.phoneNumber),
      });
      dispatch({
        type: ECreateCompanySubscriptionOps.update,
        payload: {
          licensedEmployeeCount: subscription?.licensedEmployeeCount,
          unlicensedEmployeeCount: subscription?.unlicensedEmployeeCount,
          autoRenew: subscription?.autoRenew,
          purchased: subscription?.purchased === undefined || subscription?.purchased?.length > 0 ? subscription?.purchased?.map((item) => item.subscriptionId) : [EMPLOYEMENT_SUBSCRIPTION_ID],
          priceType: subscription?.priceType,
          billingCycle: subscription?.billingCycle,
        },
      });
    } else {
      form.setFieldsValue({
        priceType: "usd",
        purchased: [EMPLOYEMENT_SUBSCRIPTION_ID],
        billingCycle: "yearly",
      });
    }
  }, [dispatch, form, subscription, billingDetails, subscriptions?.data]);

  const [activeStep, setActiveStep] = useState(0);
  const [showD, setShowD] = useState(false);

  const handlePrev = () => setActiveStep((prev) => prev - 1);
  const handleNext = () => setActiveStep((prev) => prev + 1);

  const { mutate, isLoading: isPaying } = useCreateCompanySubscription();
  const queryClient = useQueryClient();
  const [url, setUrl] = useState<string>();

  const handleSubmit = (data: TCreateCompanySubscriptionProps) => {
    mutate(
      {
        ...data,
        autoRenew: !!autoRenewal,
      },
      {
        onError: (err: any) => {
          openNotification({
            state: "error",
            title: "Error Occurred",
            duration: 2,
            description: err?.response.data.message ?? err?.response.data.error.message,
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
      <SubscriptionPaymentModal open={showD} handleClose={() => onClose()} url={url} onPaymentCompletion={() => navigate(appRoutes.purchaseUserLicense)} />
      <div className="w-full flex flex-col  gap-12 ">
        <div className="self-center">
          <Steps progressDot current={activeStep}>
            {STEPS.map((item) => (
              <Steps.Step key={item} title={<span className="text-sm">{item}</span>} />
            ))}
          </Steps>
        </div>
        <>
          <Form requiredMark={false} form={form} labelCol={{ span: 24 }} onFinish={handleSubmit}>
            
            
            
            <div className={activeStep === 0 ? "block" : "hidden"}>
              <AddOnContainer
                subscriptions={subscriptions?.data}
                isLoading={isFetchingSubscriptions}
                Form={Form}
                selectedPriceType={selectedPriceType}
                selectedBillingCycle={selectedBillingCycle}
                autoRenewal={!!autoRenewal}
                handleAutoRenewal={(autoRenew) =>
                  dispatch({
                    payload: { autoRenew },
                    type: ECreateCompanySubscriptionOps.update,
                  })
                }
                onProceed={() => {
                  handleNext()
                  // setActiveStep(2);
                }}
              />
            </div>
            <div className={activeStep === 1 ? "block" : "hidden"}>
              <PaymentsContainer Form={Form} onProceed= {()=> handleNext()} subscriptions={subscriptions?.data} isLoading={isFetchingSubscriptions || isFetchingDetails} form={form} isPayingForSubscription={isPaying} />
            </div>
            {activeStep === 2 && <Navigate to={appRoutes.purchaseUserLicense} replace={true} />}
          </Form>
        </>
      </div>
    </>
  );
};

export default PurchaseExtraLicenseContainer;
