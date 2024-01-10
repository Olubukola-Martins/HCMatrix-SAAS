import { Form, Input, InputNumber, Modal, Select } from "antd";
import { AppButton } from "components/button/AppButton";
import React, { useEffect, useLayoutEffect } from "react";
import { IModalProps } from "types";
import {
  generalValidationRules,
  numberHasToBeGreaterThanValueRule,
} from "utils/formHelpers/validation";
import { openNotification } from "utils/notifications";
import { useQueryClient } from "react-query";
import { useSetMaxSizeFilePerUpload } from "features/core/company/hooks/fileStorage/setting/useSetMaxSizeFilePerUpload";
import { QUERY_KEY_FOR_FILE_STORAGE_SETTING } from "features/core/company/hooks/fileStorage/setting/useGetFileStorageSetting";
import { TFileStorageSetting } from "features/core/company/types/fileStorage/fileStorageSetting";

type FormProps = {
  maxFileSizePerUpload: { size: number; unit: "MB" | "KB" | "GB" };
};
export const FileStorageSetting: React.FC<
  IModalProps & { setting?: TFileStorageSetting }
> = ({ open, handleClose, setting }) => {
  const queryClient = useQueryClient();

  const [form] = Form.useForm<FormProps>();
  const { mutate, isLoading } = useSetMaxSizeFilePerUpload();
  useEffect(() => {
    if (!setting) return;
    const maxFileSize = setting?.formattedMaxFileSizePerUpload;
    const size = +maxFileSize.substring(0, maxFileSize.length - 2);
    const unit = maxFileSize.substring(maxFileSize.length - 2) as
      | "KB"
      | "MB"
      | "GB";
    form.setFieldsValue({
      maxFileSizePerUpload: {
        size,
        unit,
      },
    });
  }, [form, setting]);
  const handleSubmit = (data: FormProps) => {
    mutate(
      {
        ...data.maxFileSizePerUpload,
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
            queryKey: [QUERY_KEY_FOR_FILE_STORAGE_SETTING],
            // exact: true,
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
      title={"Settings"}
      style={{ top: 20 }}
    >
      <Form
        layout="vertical"
        form={form}
        onFinish={handleSubmit}
        requiredMark={false}
      >
        <Form.Item name="maxFileSizePerUpload" label="Max file size per upload">
          <Input.Group compact>
            <Form.Item
              noStyle
              rules={[numberHasToBeGreaterThanValueRule(0)]}
              name={["maxFileSizePerUpload", "size"]}
            >
              <InputNumber placeholder="Size " style={{ width: "75%" }} />
            </Form.Item>
            <Form.Item
              noStyle
              rules={generalValidationRules}
              name={["maxFileSizePerUpload", "unit"]}
            >
              <Select
                placeholder="Unit"
                style={{ width: "25%" }}
                options={["MB", "KB", "GB"].map((item) => ({
                  label: item,
                  value: item,
                }))}
              />
            </Form.Item>
          </Input.Group>
        </Form.Item>

        <div className="flex justify-between">
          <AppButton
            type="button"
            label="Cancel"
            variant="transparent"
            disabled={isLoading}
            handleClick={() => handleClose()}
          />
          <AppButton type="submit" label="Save" isLoading={isLoading} />
        </div>
      </Form>
    </Modal>
  );
};
