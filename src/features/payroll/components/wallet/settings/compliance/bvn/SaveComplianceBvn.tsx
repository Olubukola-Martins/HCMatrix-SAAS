import { useQueryClient } from "react-query";
import { DatePicker, Form, Input, Skeleton } from "antd";
import { openNotification } from "utils/notifications";
import {
  generalValidationRulesOp,
  textInputValidationRules,
} from "utils/formHelpers/validation";
import { AppButton } from "components/button/AppButton";
import { useEffect } from "react";

import { TBvnCompliance } from "features/payroll/types/compliance";
import { useSaveBvnCompliance } from "features/payroll/hooks/compliance/bvn/useSaveBvnCompliance";
import {
  QUERY_KEY_FOR_WALLET_BVN_COMPLIANCE,
  useGetBvnCompliance,
} from "features/payroll/hooks/compliance/bvn/useGetBvnCompliance";
import dayjs, { Dayjs } from "dayjs";

type TFormData = Pick<TBvnCompliance, "bvn"> & {
  bvnDateOfBirth?: Dayjs | null;
};
export const SaveComplianceBvn: React.FC = () => {
  const queryClient = useQueryClient();

  const [form] = Form.useForm<TFormData>();
  const { data, isFetching } = useGetBvnCompliance();
  const { mutate, isLoading } = useSaveBvnCompliance();
  const bvn = data?.bvn;
  const bvnDateOfBirth = data?.bvnDateOfBirth;
  useEffect(() => {
    form.setFieldsValue({
      bvn,
      bvnDateOfBirth: bvnDateOfBirth ? dayjs(bvnDateOfBirth) : null,
    });
  }, [bvn, bvnDateOfBirth, form]);

  const handleSubmit = (data: TFormData) => {
    mutate(
      {
        bvn: data.bvn,
        bvnDateOfBirth: data.bvnDateOfBirth?.toString(),
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
        <div className="grid lg:gap-x-24 md:gap-x-12 lg:grid-cols-3 grid-cols-1">
          <Form.Item<TFormData> rules={textInputValidationRules} name="bvn">
            <Input placeholder="Enter Bank Verfification Number" />
          </Form.Item>
          <Form.Item<TFormData>
            rules={generalValidationRulesOp}
            name="bvnDateOfBirth"
          >
            <DatePicker placeholder="Enter BVN DOB" className="w-full" />
          </Form.Item>
        </div>

        <div className="flex justify-end">
          <AppButton type="submit" isLoading={isLoading} label="Save" />
        </div>
      </Form>
    </Skeleton>
  );
};
