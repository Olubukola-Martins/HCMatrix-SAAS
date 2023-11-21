import { DatePicker, Form, Input, Modal } from "antd";
import { AppButton } from "components/button/AppButton";
import { DEFAULT_DATE_FORMAT } from "constants/dateFormats";
import { useAddEmployeeMedicalHistory } from "features/self-service/features/health-access/hooks/employee/medical/history/useAddEmployeeMedicalHistory";
import { QUERY_KEY_FOR_SINGLE_EMPLOYEE_HEALTH_ACCESS } from "features/self-service/features/health-access/hooks/employee/useGetSingleEmployeeHealthAccess";
import { TEmployeeMedicalHistoryType } from "features/self-service/features/health-access/types/employee";
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
}
export const AddMedication = ({
  open,
  handleClose,
  employeeId,
  type,
}: IProps) => {
  const queryClient = useQueryClient();

  const [form] = Form.useForm();
  const { mutate, isLoading } = useAddEmployeeMedicalHistory();

  const handleSubmit = (data: any) => {
    if (!employeeId) return;
    mutate(
      {
        body: {
          condition: data.condition,
          dateOfOnset: data.dateOfOnset,
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
            queryKey: [QUERY_KEY_FOR_SINGLE_EMPLOYEE_HEALTH_ACCESS],
            // exact: true,
          });
        },
      }
    );
  };
  return (
    <Modal
      title="Add Medication"
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
