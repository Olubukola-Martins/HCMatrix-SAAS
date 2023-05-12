import { DatePicker, Form, Input, Skeleton, Switch } from "antd";
import { useFetchSingleLeave } from "../hooks/useFetchSingleLeave";
import moment from "moment";
import { useEffect } from "react";

interface IProps {
  id: number;
}

const boxStyle = "px-4 py-3 shadow rounded-md bg-mainBg mb-4";

export const LeaveDetails = ({ id }: IProps) => {
  const [form] = Form.useForm();
  const { data, isFetching } = useFetchSingleLeave({ id });
  useEffect(() => {
    if (data) {
      form.setFieldsValue({
        employee: `${data.employee.firstName} ${data.employee.lastName}`,
        relieve: `${data.workAssignee.firstName} ${data.workAssignee.lastName}`,
        department: data.department.name,
        length: data.length,
        leaveType: data.leaveType.name,
        reason: data.reason,
        requestAllowance: data.requestAllowance,
        workAssigneeId: data.workAssigneeId,
        duration: [moment(data.startDate), moment(data.endDate)],
      });
    }
  }, [id, form, data]);
  return (
    <Skeleton loading={isFetching} active paragraph={{ rows: 16 }}>
      <Form layout="vertical" requiredMark={false} form={form} disabled>
        <Form.Item label="Employee" name="employee">
          <Input placeholder="Employee" />
        </Form.Item>
        <Form.Item label="Deparment" name="department">
          <Input placeholder="Deparment" />
        </Form.Item>
        <Form.Item name="duration" label="Duration">
          <DatePicker.RangePicker
            placeholder={["Start Date", "End Date"]}
            className="w-full"
          />
        </Form.Item>
        <Form.Item label="Number of days" name="length">
          <Input placeholder="Number of days" />
        </Form.Item>

        <Form.Item label="Leave Type" name="leaveType">
          <Input placeholder="Leave Type" />
        </Form.Item>

        <Form.Item label="Work Assignee/Relieve" name={"relieve"}>
          <Input placeholder="Work Assignee/Relieve" />
        </Form.Item>

        <Form.Item name="reason">
          <Input.TextArea rows={4} placeholder="Reason" />
        </Form.Item>
        <Form.Item name="requestAllowance" label="Request Allowance ">
          <Switch
            defaultChecked={!!data?.requestAllowance}
            checkedChildren="Yes"
            unCheckedChildren="No"
          />
        </Form.Item>
        <div className={boxStyle}>
          {data?.documentUrls.map((item, i) => (
            <a
              href={item}
              className="mb-2 text-sm underline text-caramel hover:no-underline"
            >
              Document {i + 1}
            </a>
          ))}
        </div>
        {/* <div className="flex justify-end">
          <AppButton isLoading={isLoading} type="submit" />
        </div> */}
      </Form>
    </Skeleton>
  );
};
