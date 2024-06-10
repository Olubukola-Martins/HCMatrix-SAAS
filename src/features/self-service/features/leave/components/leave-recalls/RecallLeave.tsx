import { Checkbox, DatePicker, Form, Input, InputNumber, Modal } from "antd";
import { AppButton } from "components/button/AppButton";
import React, { useEffect, useState } from "react";
import { IModalProps } from "types";
import { openNotification } from "utils/notifications";
import { useQueryClient } from "react-query";
import { TLeave } from "../../types";
import dayjs, { Dayjs } from "dayjs";
import moment from "moment";
import { DEFAULT_DATE_FORMAT } from "constants/dateFormats";
import { getEmployeeFullName } from "features/core/employees/utils/getEmployeeFullName";
import { useRecallLeave } from "../../hooks/leaveRecall/useRecallLeave";
import { QUERY_KEY_FOR_ALL_LEAVE_RECALLS } from "../../hooks/leaveRecall/useGetAllLeaveRecalls";

interface IProps extends IModalProps {
  leave?: TLeave;
}

export const RecallLeave: React.FC<IProps> = ({ open, handleClose, leave }) => {
  const queryClient = useQueryClient();

  const [form] = Form.useForm();
  const { mutate, isLoading } = useRecallLeave();
  const [newEndDate, setNewEndDate] = useState<Dayjs | null>(null);
  const [newLeaveLength, setNewLeaveLength] = useState<number>(0);
  useEffect(() => {
    if (leave) {
      form.setFieldsValue({
        name: leave.leaveType.name,
        startDate: dayjs(leave.startDate ?? null),
        endDate: dayjs(leave.endDate ?? null),
        leaveLength: leave.length,
        employeeName: getEmployeeFullName(leave.employee),
      });
      setNewLeaveLength(leave.length);
    }
    setNewEndDate(null);
  }, [leave, form]);

  const handleSubmit = (data: any) => {
    if ((!newEndDate && !leave?.specificDates) || !leave) return;
    mutate(
      {
        leaveId: leave.id,
        length: !leave.specificDates
          ? data?.daysToBeRecalled
          : data?.specificDates.length,
        specificDates: !leave.specificDates ? null : data?.specificDates,
        newEndDate: !leave.specificDates
          ? newEndDate?.toISOString()
          : undefined,
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
            queryKey: [QUERY_KEY_FOR_ALL_LEAVE_RECALLS],
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
      title={"Recall Leave"}
      style={{ top: 20 }}
    >
      <Form
        layout="vertical"
        form={form}
        onFinish={handleSubmit}
        requiredMark={false}
      >
        <Form.Item name="name" label="Leave Type Name">
          <Input placeholder="Name" disabled />
        </Form.Item>
        <Form.Item name="employeeName" label="Employee Name">
          <Input placeholder="Employee Name" disabled />
        </Form.Item>
        {!!leave?.specificDates === false && (
          <>
            <Form.Item name="startDate" label="Start Date">
              <DatePicker placeholder="Name" className="w-full" disabled />
            </Form.Item>
            <Form.Item name="endDate" label="Previous End Date">
              <DatePicker placeholder="Name" className="w-full" disabled />
            </Form.Item>
            <Form.Item
              label="Days to be recalled"
              name={"daysToBeRecalled"}
              rules={[
                {
                  validator: async (_, value) => {
                    if (typeof value !== "number") {
                      throw new Error("Please enter a valid number!");
                    }
                    if (typeof value === "number" && +value < -1) {
                      throw new Error(
                        "Please enter a value greater than or equal to -1!"
                      );
                    }
                    if (!Number.isInteger(value)) {
                      throw new Error("Please enter a whole number");
                    }
                    if (
                      Number.isInteger(value) &&
                      dayjs(leave?.startDate)
                        .add(value, "days")
                        .isBefore(dayjs(leave?.endDate)) === false
                    ) {
                      throw new Error(
                        "Please enter a number that results in a date lesser than the previous end date"
                      );
                    }

                    return true;
                  },
                },
              ]}
            >
              <InputNumber
                placeholder="Days"
                className="w-full"
                onChange={(val) =>
                  setNewEndDate(
                    dayjs(
                      moment(leave?.startDate)
                        .add(val?.toString(), "days")
                        .toString()
                    )
                  )
                }
              />
            </Form.Item>
            <Form.Item label="New End Date">
              <DatePicker
                value={newEndDate}
                placeholder="New End Date"
                className="w-full"
                disabled
              />
            </Form.Item>
          </>
        )}
        {!!leave?.specificDates === true && (
          <>
            <Form.Item name="leaveLength" label="Old Leave Length">
              <Input disabled />
            </Form.Item>
            <Form.Item
              name="specificDates"
              label="Select the specific dates you wish to recall?"
              rules={[{ required: true }]}
            >
              <Checkbox.Group
                onChange={(vals) =>
                  leave && setNewLeaveLength(leave?.length - vals.length)
                }
                options={leave?.specificDates?.map((item) => ({
                  value: item,
                  label: <span>{dayjs(item).format(DEFAULT_DATE_FORMAT)}</span>,
                }))}
              />
            </Form.Item>
            <Form.Item label="New Leave Length">
              <Input disabled value={newLeaveLength} />
            </Form.Item>
          </>
        )}

        <div className="flex justify-end">
          <AppButton type="submit" isLoading={isLoading} />
        </div>
      </Form>
    </Modal>
  );
};
