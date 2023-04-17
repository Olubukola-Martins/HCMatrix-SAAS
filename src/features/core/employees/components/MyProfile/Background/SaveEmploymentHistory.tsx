import { DatePicker, Drawer, Form, Input } from "antd";
import { useSaveEmployeeEmployementHistory } from "features/core/employees/hooks/useSaveEmployeeEmployementHistory";
import { TEmployementHistory } from "features/core/employees/types";
import { useApiAuth } from "hooks/useApiAuth";
import moment from "moment";
import { useEffect } from "react";
import { useQueryClient } from "react-query";
import { BeatLoader } from "react-spinners";
import { IDrawerProps } from "types";
import { generalValidationRules } from "utils/formHelpers/validation";
import { openNotification } from "utils/notifications";

interface IProps extends IDrawerProps {
  employeeId?: number;
  employmentHistory?: TEmployementHistory;
}

export const SaveEmploymentHistory = ({
  open,
  handleClose,
  employeeId,
  employmentHistory,
}: IProps) => {
  const { mutate, isLoading } = useSaveEmployeeEmployementHistory();
  const [form] = Form.useForm();
  const queryClient = useQueryClient();
  const { token, companyId } = useApiAuth();

  useEffect(() => {
    if (employmentHistory) {
      form.setFieldsValue({
        ...employmentHistory,
        duration: [
          moment(employmentHistory.startDate),
          moment(employmentHistory.endDate),
        ],
      });
    } else {
      form.resetFields();
    }
  }, [employmentHistory, form]);
  const handleFinish = (data: any) => {
    if (companyId && employeeId) {
      mutate(
        {
          companyId,

          token,
          employeeId: employeeId,

          endDate: data.duration[1].format("YYYY/MM/DD"),
          organization: data.organization,
          position: data.position,
          startDate: data.duration[0].format("YYYY/MM/DD"),
          historyId: employmentHistory?.id,
        },
        {
          onError: (err: any) => {
            openNotification({
              state: "error",
              title: "Error Occured",
              description:
                err?.response.data.message ?? err?.response.data.error.message,
            });
          },
          onSuccess: (res: any) => {
            openNotification({
              state: "success",

              title: "Success",
              description: res?.data?.message,
            });
            queryClient.invalidateQueries({
              queryKey: ["single-employee", employeeId],
              // exact: true,
            });
            if (!employmentHistory) form.resetFields();
            handleClose();
          },
        }
      );
    }
  };
  return (
    <Drawer
      title={
        employmentHistory ? "Edit Employment History" : "Add Employment History"
      }
      placement="right"
      onClose={() => handleClose()}
      open={open}
      className="drawerBg"
    >
      <Form
        layout="vertical"
        className="mt-5"
        requiredMark={false}
        onFinish={handleFinish}
        form={form}
      >
        <Form.Item
          name="organization"
          label="Organization"
          rules={generalValidationRules}
        >
          <Input
            className="generalInputStyle"
            placeholder="Enter Organization"
          />
        </Form.Item>
        <Form.Item
          name="position"
          label="Position"
          rules={generalValidationRules}
        >
          <Input className="generalInputStyle" placeholder="Enter Position" />
        </Form.Item>
        <Form.Item
          name="duration"
          label="Duration"
          rules={generalValidationRules}
        >
          <DatePicker.RangePicker
            placeholder={["Start Date", "End Date"]}
            format="YYYY/MM/DD"
            className="generalInputStyle"
          />
        </Form.Item>

        <button className="button" type="submit">
          {isLoading ? <BeatLoader color="#fff" /> : "Submit"}
        </button>
      </Form>
    </Drawer>
  );
};
