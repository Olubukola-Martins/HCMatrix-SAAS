import { DatePicker, Form, Input, Modal, Skeleton, Switch, Tag } from "antd";
import { CloseCircleOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import { useEffect } from "react";
import {
  QUERY_KEY_FOR_SINGLE_LEAVE,
  useGetSingleLeave,
} from "../hooks/useGetSingleLeave";
import { IModalProps } from "types";
import { getEmployeeFullName } from "features/core/employees/utils/getEmployeeFullName";
import { DEFAULT_DATE_FORMAT } from "constants/dateFormats";
import { TApprovalRequest } from "features/core/workflows/types/approval-requests";
import ApproveOrRejectButton from "features/core/workflows/components/approval-request/ApproveOrRejectButton";
import { useQueryClient } from "react-query";
import { QUERY_KEY_FOR_ALL_LEAVES } from "../hooks/useGetAllLeaves";
import { QUERY_KEY_FOR_EMPLOYEE_LEAVES } from "../hooks/useGetEmployeeLeaves";
import { QUERY_KEY_FOR_LEAVE_EMPLOYEE_DB_ANALYTICS } from "../hooks/leaveAnalytics/useGetEmployeeLeaveDBAnalytics";

interface IProps extends IModalProps {
  id: number;
  approvalRequest?: TApprovalRequest;
}
const boxStyle = "px-4 py-3 shadow rounded-md bg-mainBg mb-4";

export const LeaveDetails = ({
  id,
  open,
  handleClose,
  approvalRequest,
}: IProps) => {
  const [form] = Form.useForm();
  const queryClient = useQueryClient();

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
        duration: [dayjs(data.startDate), dayjs(data.endDate)],
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
        <ApproveOrRejectButton
          className="flex justify-end"
          request={approvalRequest}
          handleSuccess={() => {
            queryClient.invalidateQueries({
              queryKey: [QUERY_KEY_FOR_ALL_LEAVES],
              // exact: true,
            });
            queryClient.invalidateQueries({
              queryKey: [QUERY_KEY_FOR_EMPLOYEE_LEAVES],
              // exact: true,
            });
            queryClient.invalidateQueries({
              queryKey: [QUERY_KEY_FOR_SINGLE_LEAVE, id],
              // exact: true,
            });

            queryClient.invalidateQueries({
              queryKey: [QUERY_KEY_FOR_LEAVE_EMPLOYEE_DB_ANALYTICS],
              // exact: true,
            });
            handleClose();
          }}
        />
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
                        {dayjs(item.toString()).format(DEFAULT_DATE_FORMAT)}
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
