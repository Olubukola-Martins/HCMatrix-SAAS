import { DatePicker, Form, Input, Modal, Select, Tag } from "antd";
import React, { useEffect, useState } from "react";
import { useQueryClient } from "react-query";
import { CloseCircleOutlined } from "@ant-design/icons";
import { FormEmployeeInput } from "features/core/employees/components/FormEmployeeInput";
import { IModalProps } from "types";
import {
  dateHasToBeGreaterThanCurrentDayRuleForRange,
  isDateGreaterThanCurrentDay,
  textInputValidationRules,
} from "utils/formHelpers/validation";
import { openNotification } from "utils/notifications";
import { AppButton } from "components/button/AppButton";
import { useCreateLeave } from "../../hooks/useCreateLeave";
import { useApiAuth } from "hooks/useApiAuth";
import { QUERY_KEY_FOR_LEAVES } from "../../hooks/useFetchLeaves";
import { useFetchSingleEmployee } from "features/core/employees/hooks/useFetchSingleEmployee";
import { FormFileInput } from "components/generalFormInputs/FormFileInput";
import { FormLeaveTypeInput } from "../settings/types/FormLeaveTypeInput";
import MultiDatePicker, { DateObject } from "react-multi-date-picker";
import moment from "moment";

interface IProps extends IModalProps {}

export const RequestForLeave: React.FC<IProps> = ({ handleClose, open }) => {
  // should be from global state - user leave days left
  const [leaveLength, setLeaveLength] = useState(0);
  const queryClient = useQueryClient();
  const [form] = Form.useForm();
  const { mutate, isLoading } = useCreateLeave();
  const { currentUserEmployeeId } = useApiAuth();
  const { data: employee } = useFetchSingleEmployee({
    employeeId: currentUserEmployeeId,
  });
  // const today = new DateObject();
  // const tomorrow = new DateObject();

  // tomorrow.setDate(tomorrow.add(1, "d"));

  const [specificDates, setSpecificDates] = useState<
    DateObject[] | undefined
  >();

  const handleSubmit = (data: any) => {
    const departmentId = employee?.designation?.department.id;
    if (departmentId) {
      mutate(
        {
          departmentId, //TODO: Tell toyin(backend) to populate this if it will be used
          startDate:
            data?.duration?.length > 0
              ? data.duration[0].toString()
              : undefined,
          endDate:
            data?.duration?.length > 0
              ? data.duration[1].toString()
              : undefined,
          specificDates: specificDates?.map((item) => item.toString()),
          length: leaveLength,
          leaveTypeId: data.leaveTypeId,
          reason: data.reason,
          requestAllowance: data.requestAllowance,
          workAssigneeId: data.workAssigneeId,
          documentUrls: data.documentUrls,
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
            setLeaveLength(0);
            form.resetFields();
            handleClose();

            queryClient.invalidateQueries({
              queryKey: [QUERY_KEY_FOR_LEAVES],
              // exact: true,
            });
          },
        }
      );
    } else {
      openNotification({
        state: "error",
        title: "Error Occurred",
        description: `You currently do not belong to a department, so you're not eligible to take leaves`,
        duration: 0,
      });
    }
  };

  const [leavesDaysSelection, setLeaveDaysSelection] = useState<
    "duration" | "days"
  >("duration");
  useEffect(() => {
    // reset leavelength && specific dates
    setSpecificDates(undefined);
    setLeaveLength(0);
  }, [leavesDaysSelection]);
  useEffect(() => {
    // validate fields when specific dates are selected
    form.validateFields();
  }, [form, specificDates]);
  return (
    <Modal
      open={open}
      onCancel={() => handleClose()}
      footer={null}
      title={"Apply for Leave"}
      style={{ top: 20 }}
    >
      <Form
        layout="vertical"
        requiredMark={false}
        form={form}
        onFinish={handleSubmit}
      >
        <FormLeaveTypeInput
          Form={Form}
          control={{ name: "leaveTypeId", label: "Leave Type" }}
        />
        <Form.Item label="How would you like to select your leave days?">
          <Select
            options={[
              { value: "duration", label: "Date Range" },
              { value: "days", label: "Specific Dates" },
            ]}
            value={leavesDaysSelection}
            onSelect={setLeaveDaysSelection}
            placeholder="Select Leave Days"
          />
        </Form.Item>
        {leavesDaysSelection === "days" && (
          <Form.Item
            name="specificDates"
            rules={[
              {
                validator: async () => {
                  console.log(specificDates, "specificDates");
                  if (
                    Array.isArray(specificDates) === false ||
                    specificDates?.length === 0
                  ) {
                    throw new Error("Please select a date");
                  }
                  specificDates &&
                    specificDates.forEach((item, i) => {
                      if (
                        !isDateGreaterThanCurrentDay(moment(item.toString()))
                      ) {
                        throw new Error(
                          "Please select a date greater than the current day"
                        );
                      }
                    });

                  return true;
                },
              },
            ]}
            label="Specific Dates"
          >
            <div className="flex flex-col gap-4">
              <MultiDatePicker
                style={{
                  width: "100%",
                  padding: "4px 6px",
                  borderRadius: "2px",
                  transition: "background 0.3s, border 0.3s",
                }}
                placeholder="Select Dates"
                className="w-full"
                multiple
                value={specificDates}
                onChange={(vals) => {
                  if (vals === null) return;
                  if (Array.isArray(vals) === true && vals) {
                    setSpecificDates(vals as DateObject[]);
                    setLeaveLength((vals as DateObject[]).length);
                  }
                }}
              />
              <div className="grid grid-cols-4 gap-x-2 gap-y-3">
                {specificDates?.map((item) => (
                  <Tag color="blue">
                    <div className="flex items-center gap-2">
                      <span>{item.toString()}</span>
                      <CloseCircleOutlined
                        className="cursor-pointer"
                        onClick={() => {
                          const vals = specificDates?.filter(
                            (val) => val.toString() !== item.toString()
                          );
                          setSpecificDates(vals);
                          setLeaveLength(vals.length);
                        }}
                      />
                    </div>
                  </Tag>
                ))}
              </div>
            </div>
          </Form.Item>
        )}

        {leavesDaysSelection === "duration" && (
          <Form.Item
            name="duration"
            rules={[dateHasToBeGreaterThanCurrentDayRuleForRange]}
            label="Duration"
          >
            <DatePicker.RangePicker
              placeholder={["Start Date", "End Date"]}
              className="w-full"
              onChange={(period) =>
                period &&
                period[0] &&
                period[1] &&
                setLeaveLength(period[1].diff(period[0], "days") + 1)
              }
            />
          </Form.Item>
        )}
        <Form.Item label="Number of days">
          <Input placeholder="Number of days" disabled value={leaveLength} />
        </Form.Item>

        <FormEmployeeInput
          Form={Form}
          control={{
            name: "workAssigneeId",
            label: "Select Work Assignee/Relieve",
          }}
        />

        <Form.Item name="reason" rules={textInputValidationRules}>
          <Input.TextArea rows={4} placeholder="Reason" />
        </Form.Item>

        <FormFileInput
          label="Supporting Documents"
          name="documentUrls"
          Form={Form}
          multiple={true}
          ruleOptions={{
            maxFileUploadCount: 3,
            allowedFileTypes: [
              "application/pdf",
              "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
              "image/jpeg",
              "image/jpg",
              "image/png",
            ],
          }}
        />
        <div className="flex justify-end">
          <AppButton isLoading={isLoading} type="submit" />
        </div>
      </Form>
    </Modal>
  );
};
