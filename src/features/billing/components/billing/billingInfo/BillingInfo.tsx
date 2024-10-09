import React, { useLayoutEffect } from "react";
import BillingDetailsSection from "../../subscription/payment/BillingDetailsSection";
import { Form, Skeleton } from "antd";
import {
  TUpdateBillingDetailsProps,
  useUpdateSubscriptionBillingDetails,
} from "features/billing/hooks/company/billingDetail/useUpdateSubscriptionBillingDetails";
import { AppButton } from "components/button/AppButton";
import { openNotification } from "utils/notifications";
import { useQueryClient } from "react-query";
import {
  QUERY_KEY_FOR_SUBSCRIPTION_BILLING_DETAILS,
  useGetSubsciptionBillingDetails,
} from "features/billing/hooks/company/billingDetail/useGetSubsciptionBillingDetails";
import { formatPhoneNumber } from "utils/dataHelpers/formatPhoneNumber";
import { parsePhoneNumber } from "utils/dataHelpers/parsePhoneNumber";

type FormProps = Omit<TUpdateBillingDetailsProps, "phoneNumber"> & {
  phoneNumber: { code: string; number: string };
  billingName: string;
};
const BillingInfo = () => {
  const { data, isFetching: isFetchingDetails } =
    useGetSubsciptionBillingDetails();
  const { mutate, isLoading } = useUpdateSubscriptionBillingDetails();
  const [form] = Form.useForm<FormProps>();
  const queryClient = useQueryClient();
  useLayoutEffect(() => {
    if (!data) return;
    const address = data.address;
    form.setFieldsValue({
      address: {
        countryId: address?.countryId,
        latitude: address?.latitude,
        longitude: address?.longitude,
        lgaId: address?.lgaId ?? undefined,
        stateId: address?.stateId,
        streetAddress: address?.streetAddress,
        timezone: address?.timezone ?? undefined,
      },
      billingName: data.name,
      phoneNumber: parsePhoneNumber(data?.phone),
    });
  }, [data, form]);
  const handleSubmit = (data: FormProps) => {
    mutate(
      {
        name: data.billingName,
        address: data.address,

        phone: formatPhoneNumber(data?.phoneNumber),
      },
      {
        onError: (err: any) => {
          openNotification({
            state: "error",
            title: "Error Occurred",
            description:
              err?.response.data.message ?? err?.response.data.error.message,
          });
        },
        onSuccess: (res: any) => {
          openNotification({
            state: "success",

            title: "Success",
            description: res.data.message,
          });

          queryClient.invalidateQueries({
            queryKey: [QUERY_KEY_FOR_SUBSCRIPTION_BILLING_DETAILS],
          });
        },
      }
    );
  };

  return (
    <Skeleton loading={isFetchingDetails} active paragraph={{ rows: 10 }}>
      <Form
        form={form}
        onFinish={handleSubmit}
        requiredMark={false}
        labelCol={{ span: 24 }}
        className="space-y-4"
      >
        <BillingDetailsSection Form={Form} form={form} size="sm" />
        <div className="flex justify-end">
          <AppButton label="Save" type="submit" isLoading={isLoading} />
        </div>
      </Form>
    </Skeleton>
  );
};

export default BillingInfo;
