import {
  DatePicker,
  Form,
  Input,
  Modal,
  Select,
  Skeleton,
  Tag,
  Typography,
} from "antd";
import React, { useEffect, useState } from "react";
import { useQueryClient } from "react-query";
import { CloseCircleOutlined } from "@ant-design/icons";
import {
  FormEmployeeInput,
  FormUnlicensedEmployeeSSRequestInput,
} from "features/core/employees/components/FormEmployeeInput";
import { IModalProps } from "types";
import {
  countMatchingDatesInclusive,
  countWeekendsInclusive,
  isDateGreaterThanCurrentDay,
  textInputValidationRules,
} from "utils/formHelpers/validation";
import { openNotification } from "utils/notifications";
import { AppButton } from "components/button/AppButton";
import { useCreateLeave } from "../../hooks/useCreateLeave";
import { FormFileInput } from "components/generalFormInputs/FormFileInput";
import { FormLeaveTypeInput } from "../settings/types/FormLeaveTypeInput";
import MultiDatePicker, { DateObject } from "react-multi-date-picker";
import moment from "moment";
import { QUERY_KEY_FOR_ALL_LEAVES } from "../../hooks/useGetAllLeaves";
import { QUERY_KEY_FOR_EMPLOYEE_LEAVES } from "../../hooks/useGetEmployeeLeaves";
import { bulkUploadFiles } from "hooks/useUploadFile";
import { useApiAuth } from "hooks/useApiAuth";
import { useGetLeavePolicySetting } from "../../hooks/leavePolicySetting/useGetLeavePolicySetting";
import { useGetHolidays } from "features/core/holidays/hooks/useGetHolidays";
import { useGetEmployeeLeaveDBAnalytics } from "../../hooks/leaveAnalytics/useGetEmployeeLeaveDBAnalytics";
import {
  canUserAccessComponent,
  useGetUserPermissions,
} from "components/permission-restriction/PermissionRestrictor";
import { TSelfServiceApplicationMode } from "features/self-service/types";
import AppTooltip from "components/tooltip/AppTooltip";

interface IProps extends IModalProps {}
export const RequestForLeaveBtn = () => {
  const { userPermissions } = useGetUserPermissions();
  const [action, setAction] = useState<TSelfServiceApplicationMode>();
  const onClose = () => {
    setAction(undefined);
  };
  const handleAction = (action: TSelfServiceApplicationMode) => {
    setAction(action);
  };
  const leaveActions: {
    label: string;
    onClick: () => void;
    hidden: boolean;
  }[] = [
    {
      label: "Myself",
      onClick: () => handleAction("apply-for-myself"),
      hidden: false,
    },
    {
      label: "Unlisenced Employee",
      onClick: () => handleAction("apply-for-unlisenced-employee"),
      hidden: !canUserAccessComponent({
        userPermissions,
        requiredPermissions: ["manage-unlicensed-employees"],
      }),
    },
  ];
  return (
    <>
      <RequestForLeave handleClose={onClose} open={action !== undefined} />
      <AppButton handleClick={leaveActions[0].onClick} label="New Leave" />
    </>
  );
};

export const RequestForLeave: React.FC<IProps> = ({ handleClose, open }) => {
  // should be from global state - user leave days left
  const [leaveLength, setLeaveLength] = useState(0);
  const queryClient = useQueryClient();
  const [form] = Form.useForm();
  const { mutate, isLoading } = useCreateLeave();
  const [leavesDaysSelection, setLeaveDaysSelection] = useState<
    "duration" | "days"
  >("duration");
  const { data: leavePolicySetting, isFetching: isFetchingLeavePolicySetting } =
    useGetLeavePolicySetting();
  const { data: holidays, isFetching: isFetchingHolidays } = useGetHolidays({
    pagination: {
      limit: 100, //a reasonable limit to get all holidays for the time being
      offset: 0,
    },
  });

  const [specificDates, setSpecificDates] = useState<
    DateObject[] | undefined
  >();
  const { companyId, token } = useApiAuth();
  const [isUploadingDocs, setIsUploadingDocs] = useState(false);
  const handleSubmit = async (data: any) => {
    setIsUploadingDocs(true);
    const documentUrls = data?.documents
      ? await bulkUploadFiles({
          auth: { companyId, token },
          data: { files: data?.documents },
        })
      : [];
    setIsUploadingDocs(false);
    mutate(
      {
        employeeId: data?.employeeId,
        startDate:
          data?.duration?.length > 0 ? data.duration[0].toString() : undefined,
        endDate:
          data?.duration?.length > 0 ? data.duration[1].toString() : undefined,
        specificDates:
          leavesDaysSelection === "days"
            ? specificDates?.map((item) => item.toString())
            : undefined,
        length: leaveLength,
        leaveTypeId: data.leaveTypeId,
        reason: data.reason,
        relieverId: data.relieverId,

        documentUrls,
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
            queryKey: [QUERY_KEY_FOR_ALL_LEAVES],
            // exact: true,
          });
          queryClient.invalidateQueries({
            queryKey: [QUERY_KEY_FOR_EMPLOYEE_LEAVES],
            // exact: true,
          });
        },
      }
    );
  };

  useEffect(() => {
    // reset leavelength && specific dates
    setSpecificDates(undefined);
    form.setFieldValue("duration", [null, null]);
    setLeaveLength(0);
  }, [leavesDaysSelection]);
  useEffect(() => {
    // validate fields when specific dates are selected
    form.validateFields();
  }, [form, specificDates]);
  const [requiresLeaveReliever, setRequiresLeaveReliever] = useState(false);
  const [leaveTypeMaxLength, setLeaveTypeMaxLength] = useState<number>();
  useEffect(() => {
    form.setFieldValue("duration", [null, null]);
    form.setFieldValue("specificDates", null);
    form.validateFields();
  }, [form, leaveTypeMaxLength]);
  const {
    data: employeeLeaveAnalytics,
    isFetching: isFetchingEmployeeLeaveAnalytics,
  } = useGetEmployeeLeaveDBAnalytics();
  return (
    <Modal
      open={open}
      onCancel={() => handleClose()}
      footer={null}
      title={
        <AppTooltip
          children={
            <Typography.Title level={5}>Apply for Leave</Typography.Title>
          }
          tooltipProps={{
            title: (
              <LeaveInfo
                {...{
                  leavePolicyIncludesHolidays:
                    leavePolicySetting?.includeHolidays,
                  leaveTypeMaxLength: leaveTypeMaxLength,
                  leavePolicyIncludesWeekends:
                    leavePolicySetting?.includeWeekends,
                }}
              />
            ),
          }}
        />
      }
      style={{ top: 20 }}
    >
      <Skeleton
        active
        loading={
          isFetchingLeavePolicySetting ||
          isFetchingHolidays ||
          isFetchingEmployeeLeaveAnalytics
        }
        paragraph={{ rows: 32 }}
      >
        <Form
          layout="vertical"
          requiredMark={false}
          form={form}
          onFinish={handleSubmit}
        >
          <FormUnlicensedEmployeeSSRequestInput
            Form={Form}
            control={{
              name: "employeeId",
              label: "Select Unlinsenced Employee",
            }}
          />
          <FormLeaveTypeInput
            Form={Form}
            control={{ name: "leaveTypeId", label: "Leave Type" }}
            handleSelect={(_, type) => {
              const maxLength = employeeLeaveAnalytics?.spillOver ?? 0;
              setRequiresLeaveReliever(!!type?.requireReliever);

              if (
                type &&
                typeof +type.length === "number" &&
                type.typeOfLength === "fixed"
              ) {
                setLeaveTypeMaxLength(+type?.length);
              }
              // use spillover when the typeofLength is dynamic && length is spillover

              if (
                type &&
                typeof type.length === "string" &&
                type.typeOfLength === "dynamic" &&
                type.length === "spillover"
              ) {
                setLeaveTypeMaxLength(maxLength);
              }
            }}
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
                    if (
                      Array.isArray(specificDates) === false ||
                      specificDates?.length === 0
                    ) {
                      throw new Error("Please select a date");
                    }
                    if (
                      leaveTypeMaxLength !== undefined &&
                      leaveLength > leaveTypeMaxLength
                    ) {
                      throw new Error(
                        `The selected leave type cannot exceed ${leaveTypeMaxLength} days`
                      );
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
                        if (
                          leavePolicySetting?.includeWeekends === false &&
                          countWeekendsInclusive(
                            moment(item.toString()),
                            moment(item.toString())
                          )
                        ) {
                          throw new Error(
                            "Leave Policy does not allow weekends to be included!"
                          );
                        }
                        if (
                          leavePolicySetting?.includeHolidays === false &&
                          holidays &&
                          countMatchingDatesInclusive(
                            moment(item.toString()),
                            moment(item.toString()),
                            holidays.data.map((item) => moment(item.date))
                          )
                        ) {
                          throw new Error(
                            "Leave Policy does not allow holidays to be included!"
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
                    if (vals === null) {
                      setSpecificDates(undefined);
                    }
                    if (Array.isArray(vals) === true && vals) {
                      const dates = vals as DateObject[];
                      setSpecificDates(dates);
                      setLeaveLength(dates.length);
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
              rules={[
                {
                  validator: async (rule, value) => {
                    if (Array.isArray(value) === false) {
                      throw new Error("Please select a make a date selection");
                    }
                    if (!isDateGreaterThanCurrentDay(value[0])) {
                      throw new Error(
                        "Please select a date greater than the current day"
                      );
                    }
                    if (!isDateGreaterThanCurrentDay(value[1])) {
                      throw new Error(
                        "Please select a date greater than the current day"
                      );
                    }

                    if (
                      leaveTypeMaxLength !== undefined &&
                      leaveLength > leaveTypeMaxLength
                    ) {
                      throw new Error(
                        `Leave cannot exceed ${leaveTypeMaxLength} days`
                      );
                    }

                    return true;
                  },
                },
              ]}
              label="Duration"
            >
              <DatePicker.RangePicker
                placeholder={["Start Date", "End Date"]}
                className="w-full"
                onChange={(period) => {
                  let leaveLength = 0;
                  if (period && period[0] && period[1]) {
                    leaveLength = period[1].diff(period[0], "days") + 1;
                    if (leavePolicySetting?.includeWeekends === false) {
                      leaveLength =
                        leaveLength -
                        countWeekendsInclusive(period[0], period[1]);
                    }
                    if (
                      leavePolicySetting?.includeHolidays === false &&
                      holidays
                    ) {
                      leaveLength =
                        leaveLength -
                        countMatchingDatesInclusive(
                          period[0],
                          period[1],
                          holidays.data.map((item) => moment(item.date))
                        );
                    }
                  }
                  setLeaveLength(leaveLength);
                }}
              />
            </Form.Item>
          )}
          <Form.Item label="Number of days">
            <Input placeholder="Number of days" disabled value={leaveLength} />
          </Form.Item>

          {requiresLeaveReliever && (
            <FormEmployeeInput
              Form={Form}
              control={{
                name: "relieverId",
                label: "Select Work Assignee/Relieve",
              }}
            />
          )}

          <Form.Item name="reason" rules={textInputValidationRules}>
            <Input.TextArea rows={4} placeholder="Reason" />
          </Form.Item>

          <FormFileInput
            label="Supporting Documents"
            name="documents"
            Form={Form}
            multiple={true}
            ruleOptions={{
              maxFileUploadCount: 3,
              required: false,
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
            <AppButton isLoading={isUploadingDocs || isLoading} type="submit" />
          </div>
        </Form>
      </Skeleton>
    </Modal>
  );
};

const LeaveInfo: React.FC<{
  leaveTypeMaxLength?: number;
  leavePolicyIncludesWeekends?: boolean;
  leavePolicyIncludesHolidays?: boolean;
}> = ({
  leaveTypeMaxLength,
  leavePolicyIncludesHolidays,
  leavePolicyIncludesWeekends,
}) => {
  return (
    <div className="flex flex-col gap-2">
      {leaveTypeMaxLength !== undefined && (
        <span className="text-red-400 text-xs">{`Only ${leaveTypeMaxLength} days or less are allowed for the selected leave type!`}</span>
      )}
      {leavePolicyIncludesWeekends === false && (
        <span className="text-red-400 text-xs">{`Leave policy dictates that weekends are excluded from leave calculations`}</span>
      )}
      {leavePolicyIncludesHolidays === false && (
        <span className="text-red-400 text-xs">{`Leave policy dictates that holidays are excluded from leave calculations`}</span>
      )}
    </div>
  );
};
