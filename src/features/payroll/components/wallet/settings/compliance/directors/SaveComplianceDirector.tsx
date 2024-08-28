import {
  TAddDirectorComplianceData,
  useSaveDirectorsCompliance,
} from "features/payroll/hooks/compliance/director/useSaveDirectorsCompliance";
import { useQueryClient } from "react-query";
import { Form, Input, Modal } from "antd";
import { IModalProps } from "types";
import { openNotification } from "utils/notifications";
import { QUERY_KEY_FOR_WALLET_DIRECTORS_COMPLIANCE } from "features/payroll/hooks/compliance/director/useGetDirectorsCompliance";
import { textInputValidationRules } from "utils/formHelpers/validation";
import { FormFileInput } from "components/generalFormInputs/FormFileInput";
import { AppButton } from "components/button/AppButton";
import { useEffect, useState } from "react";
import { TDirectorsCompliance } from "features/payroll/types/compliance";

type TFormData = TAddDirectorComplianceData["directors"][number];
export const SaveComplianceDirector: React.FC<
  IModalProps & {
    directors?: TDirectorsCompliance["directors"];
    data:
      | {
          action: "edit";
          director?: Pick<TFormData, "name" | "position"> & {
            id: number;
          };
        }
      | {
          action: "add";
        };
  }
> = ({ open, handleClose, data, directors = [] }) => {
  const queryClient = useQueryClient();

  const [form] = Form.useForm<TFormData>();
  const { mutate, isLoading } = useSaveDirectorsCompliance();
  useEffect(() => {
    if (data.action === "edit" && data.director) {
      form.setFieldsValue(data.director);
    }
  }, [data, form]);

  const handleSubmit = (values: TFormData) => {
    const updatedDirectors =
      data.action === "edit"
        ? directors.map((item, i) => (data.director?.id === i ? values : item))
        : [...directors, values];
    mutate(
      {
        directors: updatedDirectors,
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
            queryKey: [QUERY_KEY_FOR_WALLET_DIRECTORS_COMPLIANCE],
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
      title={"Add New Director"}
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
          rules={textInputValidationRules}
          name="position"
          label="Position"
        >
          <Input placeholder="Position" />
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

export const SaveComplianceDirectorBtn: React.FC<{
  directors?: TDirectorsCompliance["directors"];
}> = ({ directors }) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <SaveComplianceDirector
        directors={directors}
        data={{ action: "add" }}
        open={open}
        handleClose={() => setOpen(false)}
      />
      <AppButton
        handleClick={() => {
          setOpen(true);
        }}
        label="Add New Director"
      />
    </>
  );
};
