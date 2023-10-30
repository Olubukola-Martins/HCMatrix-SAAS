import { DatePicker, Form, Input, Modal, Skeleton, Switch, Tag } from "antd";
import { CloseCircleOutlined } from "@ant-design/icons";
import moment from "moment";
import { useEffect } from "react";
import { useGetSingleLeave } from "../hooks/useGetSingleLeave";
import { IModalProps } from "types";
import { getEmployeeFullName } from "features/core/employees/utils/getEmployeeFullName";
import { DEFAULT_DATE_FORMAT } from "constants/dateFormats";

interface IProps extends IModalProps {
  id: number;
}
const boxStyle = "px-4 py-3 shadow rounded-md bg-mainBg mb-4";

export const LeaveDetails = ({ id, open, handleClose }: IProps) => {
  const [form] = Form.useForm();
  const { data, isFetching } = useGetSingleLeave({ id });
  useEffect(() => {
    if (data) {
      form.setFieldsValue({
        employee: getEmployeeFullName(data.employee),
        reliever: data.reliever ? getEmployeeFullName(data.reliever) : "",
        department: data.employee?.designation?.department?.name,
        length: data.length,
        leaveType: data.leaveType.name,
        reason: data.reason,
        employeesGetAllowance: data.leaveType.employeesGetAllowance,
        duration: [moment(data.startDate), moment(data.endDate)],
      });
    }
  }, [id, form, data]);
  return (
    <Modal
      open={open}
      onCancel={() => handleClose()}
      footer={null}
      title={"Leave Details"}
      style={{ top: 20 }}
    >
      <Skeleton loading={isFetching} active paragraph={{ rows: 16 }}>
        <Form layout="vertical" requiredMark={false} form={form} disabled>
          <Form.Item label="Employee" name="employee">
            <Input placeholder="Employee" />
          </Form.Item>
          <Form.Item label="Deparment" name="department">
            <Input placeholder="Deparment" />
          </Form.Item>
          {!data?.specificDates && (
            <Form.Item name="duration" label="Duration">
              <DatePicker.RangePicker
                placeholder={["Start Date", "End Date"]}
                className="w-full"
              />
            </Form.Item>
          )}
          {data?.specificDates && (
            <Form.Item label="Specific Dates">
              <div className="grid grid-cols-4 gap-x-2 gap-y-3">
                {data.specificDates?.map((item) => (
                  <Tag color="blue">
                    <div className="flex items-center gap-2">
                      <span>
                        {moment(item.toString()).format(DEFAULT_DATE_FORMAT)}
                      </span>
                      <CloseCircleOutlined />
                    </div>
                  </Tag>
                ))}
              </div>
            </Form.Item>
          )}
          <Form.Item label="Number of days" name="length">
            <Input placeholder="Number of days" />
          </Form.Item>

          <Form.Item label="Leave Type" name="leaveType">
            <Input placeholder="Leave Type" />
          </Form.Item>

          {data?.leaveType.requireReliever && (
            <Form.Item label="Work Assignee/Relieve" name={"reliever"}>
              <Input placeholder="Work Assignee/Relieve" />
            </Form.Item>
          )}

          <Form.Item name="reason">
            <Input.TextArea rows={4} placeholder="Reason" />
          </Form.Item>
          <Form.Item
            name="employeesGetAllowance"
            label="Does employee get allowance?"
          >
            <Switch
              defaultChecked={!!data?.leaveType.employeesGetAllowance}
              checkedChildren="Yes"
              unCheckedChildren="No"
            />
          </Form.Item>
          {data?.documentUrls && data?.documentUrls.length > 0 && (
            <div className={boxStyle + "grid gap-3 grid-cols-3"}>
              {data?.documentUrls.map((item, i) => (
                <a
                  href={item}
                  className="mb-2 text-sm underline text-caramel hover:no-underline"
                >
                  Document {i + 1}
                </a>
              ))}
            </div>
          )}
          {/* <div className="flex justify-end">
          <AppButton isLoading={isLoading} type="submit" />
        </div> */}
        </Form>
      </Skeleton>
    </Modal>
  );
};
