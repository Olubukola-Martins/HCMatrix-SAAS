import { Form, Input, Modal, Select, Skeleton } from "antd";
import { AppButton } from "components/button/AppButton";
import React, { useEffect, useState } from "react";
import { IModalProps } from "types";
import {
  generalValidationRules,
  textInputValidationRules,
} from "utils/formHelpers/validation";
import { SelectCountry } from "components/selectEntity/SelectCountry";
import { SelectState } from "components/selectEntity/SelectState";
import { TBranch, TCreateBranchProps } from "../types";
import { SelectLGA } from "components/selectEntity/SelectLGA";
import { TIME_ZONES } from "constants/timeZones";

interface IProps extends IModalProps {
  branch?: TBranch;
  action?: "add" | "edit" | "view";
  title?: string;
  onSubmit?: {
    fn: (data: TCreateBranchProps) => void;
    isLoading?: boolean;
    isSuccess?: boolean;
  };
  loading?: boolean;
}

export const SaveBranch: React.FC<IProps> = ({
  open,
  handleClose,
  action = "add",
  branch,
  title = "Add Branch",
  onSubmit,
  loading,
}) => {
  const [form] = Form.useForm<TCreateBranchProps>();
  const [errors, setErrors] = useState<{
    [key: string]: string | undefined;
  }>({});
  const [countryId, setCountryId] = useState<number>();
  const [stateId, setStateId] = useState<number>();
  const [lgaId, setLgaId] = useState<number>();
  const [doesStateHaveLGAS, setDoesStateHaveLGAS] = useState(false);

  const handleSubmit = (data: TCreateBranchProps) => {
    setErrors((prev) => ({
      ...prev,
      country:
        typeof countryId === "undefined" ? "Please fill country!" : undefined,
      state:
        typeof stateId === "undefined" && typeof countryId === "number"
          ? "Please fill state!"
          : undefined,
      lga:
        typeof lgaId === "undefined" &&
        typeof countryId === "number" &&
        typeof stateId === "number" &&
        doesStateHaveLGAS
          ? "Please fill LGA!"
          : undefined,
    }));

    if (!countryId) return;
    if (!stateId) return;
    if (!lgaId && doesStateHaveLGAS) return;

    onSubmit?.fn({
      ...data,
      address: { ...data.address, countryId, stateId, lgaId },
    });
  };

  useEffect(() => {
    if (onSubmit?.isSuccess) {
      form.resetFields();
      setCountryId(undefined);
      setStateId(undefined);
      setLgaId(undefined);
    }
  }, [form, onSubmit?.isSuccess]);

  useEffect(() => {
    if (branch) {
      form.setFieldsValue({ ...branch });
      setCountryId(branch?.address.countryId);
      setStateId(branch?.address.stateId);
      setLgaId(branch?.address.lgaId);
    }
  }, [branch, form]);

  return (
    <Modal
      open={open}
      onCancel={() => handleClose()}
      footer={null}
      title={title}
      style={{ top: 20 }}
    >
      <Skeleton loading={loading} active paragraph={{ rows: 12 }}>
        <Form
          layout="vertical"
          form={form}
          onFinish={handleSubmit}
          requiredMark={false}
          disabled={action === "view"}
        >
          <Form.Item rules={textInputValidationRules} name="name" label="Name">
            <Input placeholder="Name" />
          </Form.Item>
          <Form.Item
            rules={textInputValidationRules}
            name="description"
            label="Description"
          >
            <Input.TextArea placeholder="Description" />
          </Form.Item>

          <Form.Item name="address" label="Address">
            <Input.Group className="grid grid-cols-2 gap-4">
              <div className="col-span-2">
                <Form.Item
                  noStyle
                  rules={textInputValidationRules}
                  name={["address", "streetAddress"]}
                >
                  <Input.TextArea placeholder="Street Address" />
                </Form.Item>
              </div>
              <Form.Item noStyle>
                <SelectCountry
                  handleSelect={(val) => {
                    setCountryId(val);
                    setErrors((prev) => ({ ...prev, country: undefined }));
                  }}
                  onClear={() => {
                    setCountryId(undefined);
                    setStateId(undefined);
                    setLgaId(undefined);
                  }}
                  value={countryId}
                />
              </Form.Item>
              <Form.Item noStyle>
                <SelectState
                  countryId={countryId}
                  handleSelect={(val) => {
                    setStateId(val);
                    setErrors((prev) => ({ ...prev, state: undefined }));
                  }}
                  onClear={() => {
                    setStateId(undefined);
                    setLgaId(undefined);
                  }}
                  value={stateId}
                />
              </Form.Item>
              <Form.Item noStyle>
                <SelectLGA
                  stateId={stateId}
                  handleSelect={(val) => {
                    setLgaId(val);
                    setErrors((prev) => ({ ...prev, lga: undefined }));
                  }}
                  onClear={() => {
                    setLgaId(undefined);
                  }}
                  onFetchSuccess={(dataIsEmpty) =>
                    setDoesStateHaveLGAS(!dataIsEmpty)
                  }
                  value={lgaId}
                />
              </Form.Item>
              <Form.Item
                noStyle
                name={["address", "timezone"]}
                rules={generalValidationRules}
              >
                <Select options={TIME_ZONES} placeholder="Select Timezone" />
              </Form.Item>
            </Input.Group>
          </Form.Item>
          {/* errors */}
          <div className="flex flex-col gap-1">
            {Object.values(errors)
              .filter((item) => typeof item != "undefined")
              .map((item, i) => (
                <span key={i} className="text-sm text-red-500">
                  {item}
                </span>
              ))}
          </div>

          {action !== "view" ? (
            <div className="flex justify-end">
              <AppButton type="submit" isLoading={onSubmit?.isLoading} />
            </div>
          ) : null}
        </Form>
      </Skeleton>
    </Modal>
  );
};
