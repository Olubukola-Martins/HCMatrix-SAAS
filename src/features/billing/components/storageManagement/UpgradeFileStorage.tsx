import { Form, Input, Modal, Select } from "antd";
import { AppButton } from "components/button/AppButton";
import React from "react";
import { IModalProps } from "types";
import {
  generalValidationRules,
  numberHasToBeGreaterThanValueRule,
  textInputValidationRules,
} from "utils/formHelpers/validation";
import { openNotification } from "utils/notifications";
import { useQueryClient } from "react-query";
import { QUERY_KEY_FOR_FILE_STORAGE_SETTING } from "features/core/company/hooks/fileStorage/setting/useGetFileStorageSetting";
import { useUpgradeCompanyStorage } from "features/billing/hooks/addOns/extraStorage/useUpgradeCompanyStorage";
import { TSubscriptionPriceType } from "features/billing/types/priceType";
import { useGetAllExtraStorages } from "features/billing/hooks/addOns/extraStorage/useGetAllExtraStorages";

type FormProps = {
  extraStorage: { id: number; priceType: TSubscriptionPriceType };
};
export const UpgradeFileStorage: React.FC<IModalProps> = ({
  open,
  handleClose,
}) => {
  const queryClient = useQueryClient();

  const [form] = Form.useForm<FormProps>();
  const { mutate, isLoading } = useUpgradeCompanyStorage();
  const { data: storages, isFetching: isFetchingStorages } =
    useGetAllExtraStorages();

  const handleSubmit = (data: FormProps) => {
    mutate(
      {
        extraStorageId: data.extraStorage.id,
        priceType: data.extraStorage.priceType,
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
      title={"Upgrade File Storage"}
      style={{ top: 20 }}
    >
      <Form
        layout="vertical"
        form={form}
        onFinish={handleSubmit}
        requiredMark={false}
      >
        <Form.Item name="extraStorage" label="Extra Storage">
          <Input.Group compact>
            <Form.Item
              noStyle
              rules={generalValidationRules}
              name={["extraStorage", "id"]}
            >
              <Select
                loading={isFetchingStorages}
                placeholder="Size"
                style={{ width: "75%" }}
                options={storages?.data.map((item) => ({
                  label: item.name,
                  value: item.id,
                }))}
              />
            </Form.Item>
            <Form.Item
              noStyle
              rules={generalValidationRules}
              name={["extraStorage", "priceType"]}
            >
              <Select
                placeholder="Currency"
                style={{ width: "25%" }}
                options={["ngn", "usd"].map((item) => ({
                  label: item,
                  value: item,
                }))}
              />
            </Form.Item>
          </Input.Group>
        </Form.Item>

        <div className="flex justify-end">
          <AppButton type="submit" isLoading={isLoading} />
        </div>
      </Form>
    </Modal>
  );
};
