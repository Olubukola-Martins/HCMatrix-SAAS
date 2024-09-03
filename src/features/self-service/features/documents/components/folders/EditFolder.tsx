import { Form, Input, Modal } from "antd";
import { AppButton } from "components/button/AppButton";
import React, { useEffect } from "react";
import { IModalProps } from "types";
import { textInputValidationRules } from "utils/formHelpers/validation";
import { openNotification } from "utils/notifications";
import { useQueryClient } from "react-query";
import { QUERY_KEY_FOR_FOLDERS } from "../../hooks/useGetFolders";
import { useUpdateFolder } from "../../hooks/useUpdateFolder";
import { useGetSingleFolder } from "../../hooks/useGetSingleFolder";

export const EditFolder: React.FC<IModalProps> = ({
  open,
  handleClose,
  id,
}) => {
  const queryClient = useQueryClient();
  const folderId = id as unknown as number;
  const [form] = Form.useForm();
  const { mutate, isLoading } = useUpdateFolder();
  const { data, isSuccess, isFetching } = useGetSingleFolder({
    id: folderId,
  });

  const handleSubmit = (data: any) => {
    mutate(
      {
        id: folderId,
        body: { name: data.name },
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
            // duration: 0.4,
          });
          form.resetFields();
          handleClose();

          queryClient.invalidateQueries({
            queryKey: [QUERY_KEY_FOR_FOLDERS],
          });
        },
      }
    );
  };

  useEffect(() => {
    if (data && id) {
      form.setFieldsValue({
        name: data.name,
      });
    } else {
      form.resetFields();
    }
  }, [form, data, isSuccess, id]);

  return (
    <Modal
      open={open}
      onCancel={() => handleClose()}
      footer={null}
      title={"Edit Folder"}
      style={{ top: 20 }}
    >
      <Form
        layout="vertical"
        form={form}
        onFinish={handleSubmit}
        requiredMark={false}
        disabled={isFetching}
      >
        <Form.Item
          rules={textInputValidationRules}
          name="name"
          label="Folder Name"
        >
          <Input placeholder="Folder Name" />
        </Form.Item>

        <div className="flex justify-end">
          <AppButton type="submit" isLoading={isLoading} />
        </div>
      </Form>
    </Modal>
  );
};
