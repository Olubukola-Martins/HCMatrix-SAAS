import { useQueryClient } from "react-query";
import { Form, Input, Skeleton } from "antd";
import { openNotification } from "utils/notifications";
import { textInputValidationRules } from "utils/formHelpers/validation";
import { AppButton } from "components/button/AppButton";
import { useEffect } from "react";

import { TBvnCompliance } from "features/payroll/types/compliance";
import { useSaveBvnCompliance } from "features/payroll/hooks/compliance/bvn/useSaveBvnCompliance";
import {
  QUERY_KEY_FOR_WALLET_BVN_COMPLIANCE,
  useGetBvnCompliance,
} from "features/payroll/hooks/compliance/bvn/useGetBvnCompliance";

type TFormData = Pick<TBvnCompliance, "bvn">;
export const SaveComplianceBvn: React.FC = () => {
  const queryClient = useQueryClient();

  const [form] = Form.useForm<TFormData>();
  const { data, isFetching } = useGetBvnCompliance();
  const { mutate, isLoading } = useSaveBvnCompliance();
  const bvn = data?.bvn;
  useEffect(() => {
    if (bvn) {
      form.setFieldsValue({
        bvn,
      });
    }
  }, [bvn, form]);

  const handleSubmit = (data: TFormData) => {
    mutate(
      {
        bvn: data.bvn,
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
          form.resetFields();

          queryClient.invalidateQueries({
            queryKey: [QUERY_KEY_FOR_WALLET_BVN_COMPLIANCE],
          });
        },
      }
    );
  };
  return (
    <Skeleton loading={isFetching} active paragraph={{ rows: 8 }}>
      <Form
        layout="vertical"
        form={form}
        onFinish={handleSubmit}
        requiredMark={false}
      >
        <Form.Item<TFormData> rules={textInputValidationRules} name="bvn">
          <Input placeholder="Enter Bank Verfification Number" />
        </Form.Item>

        <div className="flex justify-end">
          <AppButton type="submit" isLoading={isLoading} label="Save" />
        </div>
      </Form>
    </Skeleton>
  );
};
