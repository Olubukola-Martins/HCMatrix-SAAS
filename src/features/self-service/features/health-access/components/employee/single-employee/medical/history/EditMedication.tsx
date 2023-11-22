import { DatePicker, Form, Input, Modal } from "antd";
import { AppButton } from "components/button/AppButton";
import { DEFAULT_DATE_FORMAT } from "constants/dateFormats";
import { useUpdateEmployeeMedicalHistory } from "features/self-service/features/health-access/hooks/employee/medical/history/useUpdateEmployeeMedicalHistory";
import { QUERY_KEY_FOR_AUTHENTICATED_EMPLOYEE_HEALTH_ACCESS } from "features/self-service/features/health-access/hooks/employee/useGetAuthenticatedEmployeeHealthAccess";
import { QUERY_KEY_FOR_SINGLE_EMPLOYEE_HEALTH_ACCESS } from "features/self-service/features/health-access/hooks/employee/useGetSingleEmployeeHealthAccess";
import {
  TEmployeeMedicalHistoryType,
  TSingleEmployeeHealthAccess,
} from "features/self-service/features/health-access/types/employee";
import moment from "moment";
import { useEffect } from "react";
import { useQueryClient } from "react-query";
import { IModalProps } from "types";
import {
  textInputValidationRules,
  dateHasToBeLesserThanOrEqualToCurrentDayRule,
} from "utils/formHelpers/validation";
import { openNotification } from "utils/notifications";

interface IProps extends IModalProps {
  employeeId?: number;
  type: TEmployeeMedicalHistoryType;
  data?: TSingleEmployeeHealthAccess["medicalHistory"][0];
}
export const EditMedication = ({
  open,
  handleClose,
  employeeId,
  type,
  data,
}: IProps) => {
  const queryClient = useQueryClient();

  const [form] = Form.useForm();
  useEffect(() => {
    form.setFieldsValue({
      condition: data?.condition,
      dateOfOnset: moment(data?.dateOfOnset),
    });
  }, [form, data]);
  const { mutate, isLoading } = useUpdateEmployeeMedicalHistory();

  const handleSubmit = (values: any) => {
    if (!employeeId || !data) return;

    mutate(
      {
        medicalHistoryId: data?.id,
        body: {
          condition: values.condition,
          dateOfOnset: values.dateOfOnset,
        },
        employeeId,
        type,
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
            queryKey: [QUERY_KEY_FOR_SINGLE_EMPLOYEE_HEALTH_ACCESS, employeeId],
            // exact: true,
          });
          queryClient.invalidateQueries({
            queryKey: [QUERY_KEY_FOR_AUTHENTICATED_EMPLOYEE_HEALTH_ACCESS],
            // exact: true,
          });
        },
      }
    );
  };
  return (
    <Modal
      title="Edit Medication"
      open={open}
      onCancel={() => handleClose(false)}
      footer={null}
    >
      <Form
        layout="vertical"
        onFinish={handleSubmit}
        form={form}
        requiredMark={false}
      >
        <Form.Item
          name="condition"
          label="Condition"
          rules={textInputValidationRules}
        >
          <Input className="generalInputStyle" placeholder="Enter Condition" />
        </Form.Item>
        <Form.Item
          name="dateOfOnset"
          label="Date of Onset"
          rules={[dateHasToBeLesserThanOrEqualToCurrentDayRule]}
        >
          <DatePicker
            format={DEFAULT_DATE_FORMAT}
            className="generalInputStyle"
          />
        </Form.Item>
        <div className="flex justify-end">
          <AppButton type="submit" label="Save" isLoading={isLoading} />
        </div>
      </Form>
    </Modal>
  );
};
