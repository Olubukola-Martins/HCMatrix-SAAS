import { DatePicker, Form, Modal, Select } from "antd";
import { AppButton } from "components/button/AppButton";
import { FormEmployeeInput } from "features/core/employees/components/FormEmployeeInput";
import { IDrawerProps } from "types";
import { generalValidationRules } from "utils/formHelpers/validation";
import { useAddEmployeeShift } from "../hooks/useAddEmployeeShift";
import { EGlobalOps, GlobalContext } from "stateManagers/GlobalContextProvider";
import { useContext, useEffect, useState } from "react";
import { openNotification } from "utils/notifications";
import { useQueryClient } from "react-query";
import { QUERY_KEY_FOR_SCHEDULE_EMPLOYEE_SHIFT } from "../hooks/useGetScheduleEmployeeShift";
import { useGetSingleShiftSchedule } from "../hooks/useGetSingleShiftSchedule";
import dayjs from "dayjs";

export const AddEmployeeShift = ({ handleClose, open, id }: IDrawerProps) => {
  const globalCtx = useContext(GlobalContext);
  const { dispatch } = globalCtx;
  const [form] = Form.useForm();
  const queryClient = useQueryClient();
  const [methodSwitch, setMethodSwitch] = useState<boolean>(true);
  const { mutate, isLoading } = useAddEmployeeShift();
  const {
    data,
    isLoading: loadShift,
    isSuccess,
  } = useGetSingleShiftSchedule(id as unknown as number);

  const onClose = () => {
    handleClose();
    form.resetFields();
  };

  useEffect(() => {
    if (data && isSuccess) {
      const startDate = dayjs(data.startDate);
      const endDate = dayjs(data.endDate);
      setMethodSwitch(data.isPermanent);
      form.setFieldsValue({
        shiftType: data.shiftType,
        employeeIds: data.employee?.id,
        isPermanent: data.isPermanent,
        duration: [startDate, endDate],
      });
    }
  }, [form, id, data, isSuccess]);

  const handleSubmit = (values: any) => {
    const startDate = values.duration
      ? values.duration[0].format("YYYY-MM-DD")
      : null;
    const endDate = values.duration
      ? values.duration[1].format("YYYY-MM-DD")
      : null;
    mutate(
      {
        data: {
          employeeIds: values.employeeIds,
          shiftType: values.shiftType,
          id: id ? id : undefined,
          startDate: values.duration ? startDate : undefined,
          endDate: values.duration ? endDate : undefined,
          isPermanent: values.isPermanent,
        },
      },
      {
        onError: (err: any) => {
          openNotification({
            state: "error",
            title: "Error Occurred",
            description:
              err?.response.data.message ?? err?.response.data.error.message,
            duration: 6.0,
          });
        },
        onSuccess: (res: any) => {
          openNotification({
            state: "success",
            title: "Success",
            description: res.data.message,
          });
          form.resetFields();
          dispatch({ type: EGlobalOps.setShowInitialSetup, payload: true });
          queryClient.invalidateQueries([
            QUERY_KEY_FOR_SCHEDULE_EMPLOYEE_SHIFT,
          ]);
          handleClose();
        },
      }
    );
  };

  return (
    <Modal
      footer={false}
      title="Assign & Update Employee Shift"
      open={open}
      onCancel={() => onClose()}
      style={{ top: 10 }}
    >
      <Form
        requiredMark={false}
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        disabled={loadShift}
      >
        <FormEmployeeInput
          Form={Form}
          optional={true}
          mode="multiple"
          control={{ label: "Employee", name: "employeeIds" }}
        />
        <Form.Item
          name="shiftType"
          label="Shift Type"
          rules={generalValidationRules}
        >
          <Select
            className="w-full"
            placeholder="Select"
            options={[
              { value: "morning", label: "Morning" },
              { value: "afternoon", label: "Afternoon" },
              { value: "night", label: "Night" },
            ]}
            allowClear
          />
        </Form.Item>
        <Form.Item
          name="isPermanent"
          label="Shift Method"
          rules={generalValidationRules}
        >
          <Select
            className="w-full"
            placeholder="Select"
            options={[
              { value: true, label: "Permanent" },
              { value: false, label: "Temporary" },
            ]}
            allowClear
            onChange={(val) => setMethodSwitch(val)}
          />
        </Form.Item>
        {!methodSwitch && (
          <Form.Item
            name="duration"
            label="Duration"
            rules={generalValidationRules}
          >
            <DatePicker.RangePicker className="w-full" format="YYYY/MM/DD" />
          </Form.Item>
        )}

        <AppButton type="submit" isLoading={isLoading} />
      </Form>
    </Modal>
  );
};
