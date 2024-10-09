import { DatePicker, Form, Modal } from "antd";
import { AppButton } from "components/button/AppButton";
import { FormBranchInput } from "features/core/branches/components/FormBranchInput";
import { FormDepartmentInput } from "features/core/departments/components/FormDepartmentInput";
import React, { useState } from "react";
import { IModalProps } from "types";
import { dateHasToBeLesserThanOrEqualToCurrentDayRule } from "utils/formHelpers/validation";

export type TFilterAttendanceDBFormProps = {
  branchId?: number;
  departmentId?: number;
  date?: string;
};
export type TFilterAttendanceDBBtnProps = {
  handleSubmit: (props: TFilterAttendanceDBFormProps) => void;
  formData: TFilterAttendanceDBFormProps;
  isLoading?: boolean;
};
const FilterDBBtn: React.FC<TFilterAttendanceDBBtnProps> = ({
  handleSubmit,
  formData,
  isLoading,
}) => {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <>
      <button
        className="border rounded px-3 py-2 flex items-center gap-x-3 font-medium"
        onClick={() => setOpen(true)}
      >
        <span>Filter</span>
        <i className="ri-arrow-down-s-line" />
      </button>
      <FilterDBModal
        {...{
          isLoading,
          handleSubmit,
          open,
          handleClose: () => setOpen(false),
          formData,
        }}
      />
    </>
  );
};

const FilterDBModal: React.FC<IModalProps & TFilterAttendanceDBBtnProps> = ({
  handleSubmit,
  open,
  handleClose,
  isLoading,
}) => {
  const [form] = Form.useForm<TFilterAttendanceDBFormProps>();
  const onFinish = (values: TFilterAttendanceDBFormProps) => {
    handleSubmit(values);
    form.resetFields();
    handleClose();
  };
  return (
    <Modal
      open={open}
      onCancel={() => handleClose()}
      footer={null}
      title={"Filter"}
      style={{ top: 20 }}
    >
      <Form
        layout="vertical"
        form={form}
        onFinish={onFinish}
        requiredMark={false}
      >
        <FormBranchInput
          optional
          Form={Form}
          control={{ label: "Branch", name: "branchId" }}
        />
        <FormDepartmentInput
          optional
          Form={Form}
          control={{ label: "Department", name: "departmentId" }}
        />
        <Form.Item
          name="date"
          label="Select Date"
          rules={[dateHasToBeLesserThanOrEqualToCurrentDayRule]}
        >
          <DatePicker className="w-full" />
        </Form.Item>
        <div className="flex justify-end">
          <AppButton type="submit" isLoading={isLoading} />
        </div>
      </Form>
    </Modal>
  );
};

export default FilterDBBtn;
