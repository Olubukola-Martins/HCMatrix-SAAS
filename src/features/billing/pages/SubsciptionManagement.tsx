import { PageIntro } from "components/layout/PageIntro";
import { appRoutes } from "config/router/paths";
import { useNavigate } from "react-router-dom";
import { QUERY_KEY_FOR_ACTIVE_COMPANY_SUBSCRITION, useGetCompanyActiveSubscription } from "../hooks/company/useGetCompanyActiveSubscription";
import { ErrorBoundary } from "components/errorHandlers/ErrorBoundary";
import { Form, Segmented, Skeleton } from "antd";
import { CreateCompanySubscriptionContextProvider, ECreateCompanySubscriptionOps, useCreateCompanySubscriptionStateAndDispatch } from "../stateManagers";
import { ErrorWrapper } from "components/errorHandlers/ErrorWrapper";
import { useLayoutEffect, useState } from "react";
import Capsule from "../components/ui/Capsule";
import { AppButton } from "components/button/AppButton";
import BillingContainer from "../components/billing/containers/BillingContainer";
import BillingHistoryContainer from "../components/billing/containers/BillingHistoryContainer";
import PlansContainer from "../components/billing/containers/PlansContainer";
import ModuleContainer from "../components/subscription/modules/ModuleContainer";
import { SubscriptionPaymentModal } from "../components/subscription/payment/SubscriptionPaymentModal";
import { openNotification } from "utils/notifications";
import { TCreateCompanySubscriptionProps, useCreateCompanySubscription } from "../hooks/company/useCreateCompanySubscription";
import { useGetSubsciptionBillingDetails } from "../hooks/company/billingDetail/useGetSubsciptionBillingDetails";
import { useGetAllSubscriptions } from "../hooks/useGetAllSubscriptions";
import { parsePhoneNumber } from "utils/dataHelpers/parsePhoneNumber";
import { useQueryClient } from "react-query";
import BillingInfo from "../components/billing/billingInfo/BillingInfo";

// : React.FC<{
//   type?: TSubscriptionType;
// }> = ({  type = "module" })
const SubsciptionManagement = () => {
  const { data: billingDetails, isFetching: isFetchingDetails } = useGetSubsciptionBillingDetails();
  const { data: subscriptions, isFetching: isFetchingSubscriptions } = useGetAllSubscriptions({
    type: "module",
  });
  const {
    state: { billingCycle: selectedBillingCycle, priceType: selectedPriceType, autoRenew: autoRenewal },
    dispatch,
  } = useCreateCompanySubscriptionStateAndDispatch();

  const headingCapsules: { text: "Billing" | "Plans" | "Modules Purchased" | "Billing History" | "Billing Addrerss"; tab: React.ReactNode }[] = [
    { text: "Billing", tab: <BillingContainer /> },
    { text: "Plans", tab: <PlansContainer /> },
    { text: "Modules Purchased", tab: <ModuleContainer Form={Form} subscriptions={subscriptions?.data} isLoading={isFetchingSubscriptions} selectedPriceType={selectedPriceType} selectedBillingCycle={selectedBillingCycle} /> },
    { text: "Billing History", tab: <BillingHistoryContainer /> },
    { text: "Billing Addrerss", tab: <BillingInfo /> },
  ] as const;
  const [currentContentCapsule, setCurrentContentCapsule] = useState<THeadingCapsule>(headingCapsules[0]);
  type THeadingCapsule = (typeof headingCapsules)[number];

  const navigate = useNavigate();
  const { data: subscription, isLoading, isError, error } = useGetCompanyActiveSubscription();
  const [form] = Form.useForm<TCreateCompanySubscriptionProps>();
  const [showD, setShowD] = useState(false);
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
  const { mutate, isLoading: isPaying } = useCreateCompanySubscription();
  const queryClient = useQueryClient();
  const [url, setUrl] = useState<string>();
  const renderButton = () => {
    if (currentContentCapsule.text === "Billing") {
      return (
        <AppButton
          label="Purchase Extra License"
          variant="default"
          type="button"
          handleClick={() => {
            navigate(appRoutes.purchaseExtraLiense);
          }}
        />
      );
    }
    return null;
  };
  const renderSegmentedControl = () => {
    if (currentContentCapsule.text === "Plans" || currentContentCapsule.text === "Modules Purchased") {
      return (
        <Form.Item name={"priceType"}>
          {/* TODO: Implement Geo Restriction to default to remove ngn from options when user is not from Nigeria */}
          <Segmented
            options={["usd", "ngn"].map((item) => ({
              label: <span className="uppercase">{item}</span>,
              value: item,
            }))}
            size="large"
          />
        </Form.Item>
      );
    }
    return null;
  };
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

  return (
    <>
      <SubscriptionPaymentModal open={showD} handleClose={() => onClose()} url={url} onPaymentCompletion={() => navigate(appRoutes.purchaseUserLicense)} />

      <ErrorBoundary>
        <Skeleton loading={isLoading} active paragraph={{ rows: 45 }}>
          <ErrorWrapper isError={isError} message={error?.response?.data?.message ?? error?.response?.data?.error?.message}>
            <CreateCompanySubscriptionContextProvider>
              <Form requiredMark={false} form={form} labelCol={{ span: 24 }} onFinish={handleSubmit}>
                <div className="Container space-y-4 lg:space-y-8 flex flex-col">
                  {/* heading area */}
                  <div className="flex flex-col gap-3">
                    <PageIntro title="Subscription" />
                    <h2 className="text-accent text-base">Modify your billing and payments information.</h2>
                    <div className="flex flex-col lg:flex-row  justify-between gap-4">
                      <div className="flex flex-wrap gap-x-3 gap-y-2 sm:justify-between lg:w-[790px] 2xl:w-2/3">
                        {headingCapsules.map((heading) => (
                          <Capsule
                            name={heading.text}
                            isActive={currentContentCapsule.text === heading.text}
                            onClick={() => {
                              setCurrentContentCapsule(heading);
                            }}
                          />
                        ))}
                      </div>
                      {renderButton()}
                      {renderSegmentedControl()}
                    </div>
                  </div>

                  {/* body area */}
                  {currentContentCapsule.tab}
                </div>
              </Form>
            </CreateCompanySubscriptionContextProvider>
          </ErrorWrapper>
        </Skeleton>
      </ErrorBoundary>
    </>
  );
};

export default SubsciptionManagement;
