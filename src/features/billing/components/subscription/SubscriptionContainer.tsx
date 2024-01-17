import React, { useLayoutEffect, useState } from "react";
import { Form, Segmented, Steps } from "antd";
import ModuleContainer from "./modules/ModuleContainer";
import AddOnContainer from "./addOns/AddOnContainer";
import { AppButton } from "components/button/AppButton";
import { TCompanySubscription } from "features/billing/types/company/companySubscription";
import {
  TCreateCompanySubscriptionProps,
  useCreateCompanySubscription,
} from "features/billing/hooks/company/useCreateCompanySubscription";
import { useQueryClient } from "react-query";
import { TSubscriptionPriceType } from "features/billing/types/priceType";
import { TBillingCycle } from "features/billing/types/billingCycle";
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

const STEPS = ["Select Module", "Add Ons", "Payment", "Select Users"];
const SubscriptionContainer: React.FC<{
  subscription?: TCompanySubscription;
  type?: "module" | "plan";
}> = ({ subscription, type = "module" }) => {
  const [form] = Form.useForm<TCreateCompanySubscriptionProps>();
  const { data: billingDetails, isFetching: isFetchingDetails } =
    useGetSubsciptionBillingDetails();
  const { data: subscriptions, isFetching: isFetchingSubscriptions } =
    useGetAllSubscriptions({
      type,
    });
  const {
    state: {
      billingCycle: selectedBillingCycle,
      priceType: selectedPriceType,
      autoRenew: autoRenewal,
    },
    dispatch,
  } = useCreateCompanySubscriptionStateAndDispatch();
  useLayoutEffect(() => {
    if (subscription) {
      const address = billingDetails?.address;

      form.setFieldsValue({
        priceType: subscription?.priceType,
        purchased: subscription.purchased.map((item) => item.subscriptionId),
        billingCycle: subscription.billingCycle,
        licensedEmployeeCount: subscription.licensedEmployeeCount,
        unlicensedEmployeeCount: subscription.unlicensedEmployeeCount,
        address: address
          ? {
              countryId: address.countryId,
              latitude: address.latitude,
              longitude: address.longitude,
              lgaId: address?.lgaId ?? undefined,
              stateId: address.stateId,
              streetAddress: address.streetAddress,
              timezone: address?.timezone ?? undefined,
            }
          : undefined,
        billingName: billingDetails?.billingName,
        phoneNumber: parsePhoneNumber(billingDetails?.phoneNumber),
      });
      dispatch({
        type: ECreateCompanySubscriptionOps.update,
        payload: {
          licensedEmployeeCount: subscription.licensedEmployeeCount,
          unlicensedEmployeeCount: subscription.unlicensedEmployeeCount,
          autoRenew: subscription.autoRenew,
          purchased: subscription.purchased.map((item) => item.subscriptionId),
          priceType: subscription.priceType,
          billingCycle: subscription.billingCycle,
        },
      });
    } else {
      form.setFieldsValue({
        priceType: "usd",

        billingCycle: "yearly",
      });
    }
  }, [dispatch, form, subscription, billingDetails]);
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
            <div className="flex justify-between items-center">
              <div className="flex gap-x-4">
                <Form.Item name={"priceType"}>
                  {/* TODO: Implement Geo Restriction to default to remove ngn from options when user is not from Nigeria */}
                  <Segmented
                    options={["usd", "ngn"].map((item) => ({
                      label: <span className="uppercase">{item}</span>,
                      value: item,
                    }))}
                    onChange={(val) =>
                      dispatch({
                        payload: { priceType: val as TSubscriptionPriceType },
                        type: ECreateCompanySubscriptionOps.update,
                      })
                    }
                  />
                </Form.Item>
                <Form.Item name={"billingCycle"}>
                  <Segmented
                    options={["yearly", "monthly"].map((item) => ({
                      label: <span className="capitalize">{item}</span>,
                      value: item,
                    }))}
                    onChange={(val) =>
                      dispatch({
                        payload: { billingCycle: val as TBillingCycle },
                        type: ECreateCompanySubscriptionOps.update,
                      })
                    }
                  />
                </Form.Item>
              </div>
              <div className="flex gap-4">
                {activeStep !== 0 && (
                  <AppButton
                    label="Back"
                    handleClick={handlePrev}
                    variant="transparent"
                  />
                )}
                {STEPS.length - 1 !== activeStep &&
                  [0].includes(activeStep) && (
                    <AppButton label="Next" handleClick={handleNext} />
                  )}
              </div>
            </div>
            <div className={activeStep === 0 ? "block" : "hidden"}>
              <ModuleContainer
                Form={Form}
                subscriptions={subscriptions?.data}
                isLoading={isFetchingSubscriptions}
                selectedPriceType={selectedPriceType}
                selectedBillingCycle={selectedBillingCycle}
              />
            </div>
            <div className={activeStep === 1 ? "block" : "hidden"}>
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
                  setActiveStep(2);
                }}
              />
            </div>
            <div className={activeStep === 2 ? "block" : "hidden"}>
              <PaymentsContainer
                Form={Form}
                subscriptions={subscriptions?.data}
                isLoading={isFetchingSubscriptions || isFetchingDetails}
                form={form}
                isPayingForSubscription={isPaying}
              />
            </div>
            {activeStep === 3 && (
              <Navigate to={appRoutes.purchaseUserLicense} replace={true} />
            )}
          </Form>
        </>
      </div>
    </>
  );
};

export default SubscriptionContainer;
