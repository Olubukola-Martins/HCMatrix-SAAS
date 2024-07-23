import { useQueryClient } from "react-query";
import { Form, Modal, Select } from "antd";
import { IModalProps } from "types";
import { openNotification } from "utils/notifications";
import { QUERY_KEY_FOR_WALLET_DIRECTORS_COMPLIANCE } from "features/payroll/hooks/compliance/director/useGetDirectorsCompliance";
import { textInputValidationRules } from "utils/formHelpers/validation";
import { FormFileInput } from "components/generalFormInputs/FormFileInput";
import { AppButton } from "components/button/AppButton";
import { useEffect, useState } from "react";
import {
  TComplianceDocument,
  TComplianceDocumentType,
} from "features/payroll/types/compliance";
import { useSaveDocumentsCompliance } from "features/payroll/hooks/compliance/document/useSaveDocumentsCompliance";
import { TFormFileInput } from "types/files";
import { WALLET_COMPLIANCE_DOCUMENT_TYPES } from "features/payroll/constants";

type TFormData = { document: TFormFileInput; type: TComplianceDocumentType };
export const SaveComplianceDocument: React.FC<
  IModalProps & {
    data:
      | {
          action: "edit";
          document?: TComplianceDocument;
        }
      | {
          action: "add";
        };
  }
> = ({ open, handleClose, data }) => {
  const queryClient = useQueryClient();

  const [form] = Form.useForm<TFormData>();
  const { mutate, isLoading } = useSaveDocumentsCompliance();
  useEffect(() => {
    if (data.action === "edit" && data.document) {
      form.setFieldsValue({
        type: data.document.type,
      });
    }
  }, [data, form]);

  const handleSubmit = (values: TFormData) => {
    mutate(
      {
        document: values?.document,
        type: values?.type,
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
      title={
        <span>
          {data.action === "edit"
            ? `Update ${data.document?.type.split("_").join(" ")}`
            : "Add New Document"}
        </span>
      }
      style={{ top: 20 }}
    >
      <Form
        layout="vertical"
        form={form}
        onFinish={handleSubmit}
        requiredMark={false}
      >
        {data.action === "add" ? (
          <Form.Item<TFormData>
            rules={textInputValidationRules}
            name="type"
            label="Name"
          >
            <Select
              placeholder="Select Type"
              options={WALLET_COMPLIANCE_DOCUMENT_TYPES.map((x) => ({
                label: (
                  <span className="capitalize">{x.split("_").join(" ")}</span>
                ),
                value: x,
              }))}
            />
          </Form.Item>
        ) : null}

        <FormFileInput
          Form={Form}
          label={`Upload Document`}
          name="document"
          ruleOptions={{
            allowedFileTypes: [
              "image/jpeg",
              "image/jpg",
              "image/png",
              "application/pdf",
            ],
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

export const SaveComplianceDocumentBtn: React.FC = () => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <SaveComplianceDocument
        data={{ action: "add" }}
        open={open}
        handleClose={() => setOpen(false)}
      />
      <AppButton
        handleClick={() => {
          setOpen(true);
        }}
        label="Add Document"
      />
    </>
  );
};
