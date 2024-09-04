import { useQueryClient } from "react-query";
import { Form, Input, InputNumber, Modal } from "antd";
import { IModalProps } from "types";
import { openNotification } from "utils/notifications";
import {
  numberHasToBeGreaterThanValueRule,
  textInputValidationRules,
} from "utils/formHelpers/validation";
import { FormFileInput } from "components/generalFormInputs/FormFileInput";
import { AppButton } from "components/button/AppButton";
import { useEffect, useState } from "react";
import {
  TAddShareholderComplianceData,
  useSaveShareholdersCompliance,
} from "features/payroll/hooks/compliance/shareholder/useSaveShareholdersCompliance";
import { QUERY_KEY_FOR_WALLET_SHAREHOLDERS_COMPLIANCE } from "features/payroll/hooks/compliance/shareholder/useGetShareholdersCompliance";
import { TShareholdersCompliance } from "features/payroll/types/compliance";

type TFormData = TAddShareholderComplianceData["shareholders"][number];
export const SaveComplianceShareholder: React.FC<
  IModalProps & {
    shareholders?: TShareholdersCompliance["shareholders"];
    data:
      | {
          action: "edit";
          shareholder?: Pick<TFormData, "name" | "sharesHeld"> & {
            id: number;
          };
        }
      | {
          action: "add";
        };
  }
> = ({ open, handleClose, data, shareholders = [] }) => {
  const queryClient = useQueryClient();

  const [form] = Form.useForm<TFormData>();
  const { mutate, isLoading } = useSaveShareholdersCompliance();
  useEffect(() => {
    if (data.action === "edit" && data.shareholder) {
      form.setFieldsValue(data.shareholder);
    }
  }, [data, form]);

  const handleSubmit = (values: TFormData) => {
    const updatedShareholders =
      data.action === "edit"
        ? shareholders.map((item, i) =>
            data.shareholder?.id === i ? values : item
          )
        : [...shareholders, values];
    mutate(
      {
        shareholders: updatedShareholders,
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
          handleClose();

          queryClient.invalidateQueries({
            queryKey: [QUERY_KEY_FOR_WALLET_SHAREHOLDERS_COMPLIANCE],
          });
        },
      }
    );
  };
  return (
    <Modal
      open={open}
      onCancel={() => handleClose()}
      footer={null}
      title={"Add New shareholder"}
      style={{ top: 20 }}
    >
      <Form
        layout="vertical"
        form={form}
        onFinish={handleSubmit}
        requiredMark={false}
      >
        <Form.Item<TFormData>
          rules={textInputValidationRules}
          name="name"
          label="Name"
        >
          <Input placeholder="Name" />
        </Form.Item>
        <Form.Item<TFormData>
          rules={[numberHasToBeGreaterThanValueRule(0)]}
          name="sharesHeld"
          label="Shares Held"
        >
          <InputNumber placeholder="Shares Held" className="w-full" />
        </Form.Item>

        <FormFileInput
          Form={Form}
          label={`Upload Picture`}
          name="image"
          ruleOptions={{
            allowedFileTypes: ["image/jpeg", "image/jpg", "image/png"],
            required: false,
          }}
        />

        <div className="flex justify-end">
          <AppButton type="submit" isLoading={isLoading} />
        </div>
      </Form>
    </Modal>
  );
};

export const SaveComplianceShareholderBtn: React.FC<{
  shareholders?: TShareholdersCompliance["shareholders"];
}> = ({ shareholders }) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <SaveComplianceShareholder
        shareholders={shareholders}
        data={{ action: "add" }}
        open={open}
        handleClose={() => setOpen(false)}
      />
      <AppButton
        handleClick={() => {
          setOpen(true);
        }}
        label="Add New Shareholder"
      />
    </>
  );
};
