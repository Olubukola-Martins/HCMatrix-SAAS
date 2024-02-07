import "../../../../assets/style.css";
import { Checkbox, Form, Input, TimePicker } from "antd";
import { AppButton } from "components/button/AppButton";
import { useCreateWorkSchedule } from "features/timeAndAttendance/hooks/useCreateWorkSchedule";
import { QUERY_KEY_FOR_WORK_SCHEDULE } from "features/timeAndAttendance/hooks/useGetWorkSchedule";
import { useApiAuth } from "hooks/useApiAuth";
import moment from "moment";
import { useContext, useEffect, useState } from "react";
import { useQueryClient } from "react-query";
import { EGlobalOps, GlobalContext } from "stateManagers/GlobalContextProvider";
import { openNotification } from "utils/notifications";

export const WorkShift: React.FC<{ data: any }> = ({ data }) => {
  const [form] = Form.useForm();
  const [selectedShifts, setSelectedShifts] = useState<string[]>([]);
  const { companyId, token, currentUserId } = useApiAuth();
  const globalCtx = useContext(GlobalContext);
  const { dispatch } = globalCtx;
  const queryClient = useQueryClient();
  const { mutate, isLoading } = useCreateWorkSchedule();

  useEffect(() => {
    let initialFormValues;
    if (data && data.workArrangement === "Shift") {
      initialFormValues = data?.workDaysAndTime.map((item: any) => ({
        day: item.day,
        shift: item.shift,
        time: [
          moment(`2013-02-07 ${item.startTime}`),
          moment(`2013-02-08 ${item.endTime}`),
        ],
      }));
    } else {
      initialFormValues = [
        { day: "Monday", shift: "Morning" },
        { day: "Tuesday", shift: "Morning" },
        { day: "Wednesday", shift: "Morning" },
        { day: "Thursday", shift: "Morning" },
        { day: "Friday", shift: "Morning" },
        { day: "Saturday", shift: "Morning" },
        { day: "Sunday", shift: "Morning" },

        { day: "Monday", shift: "Afternoon" },
        { day: "Tuesday", shift: "Afternoon" },
        { day: "Wednesday", shift: "Afternoon" },
        { day: "Thursday", shift: "Afternoon" },
        { day: "Friday", shift: "Afternoon" },
        { day: "Saturday", shift: "Afternoon" },
        { day: "Sunday", shift: "Afternoon" },

        { day: "Monday", shift: "Night" },
        { day: "Tuesday", shift: "Night" },
        { day: "Wednesday", shift: "Night" },
        { day: "Thursday", shift: "Night" },
        { day: "Friday", shift: "Night" },
        { day: "Saturday", shift: "Night" },
        { day: "Sunday", shift: "Night" },
      ];
    }

    form.setFieldsValue({
      workDaysAndTime: initialFormValues,
    });
  }, [data, form]);

  const onFinish = (values: any) => {
    const workDaysAndTime = values?.workDaysAndTime.map((item: any) => {
      if (!item.time || item.time.length < 2) {
        return {
          day: item.day,
          startTime: "00:00",
          endTime: "00:00",
          shift: item.shift,
        };
      }
      const startTime = item.time[0];
      const endTime = item.time[1];
      return {
        day: item.day,
        startTime: startTime && startTime.format("HH:mm"),
        endTime: endTime && endTime.format("HH:mm"),
        shift: item.shift,
      };
    });
    if (companyId) {
      mutate(
        {
          companyId,
          token,
          adminId: currentUserId,
          workArrangement: "Shift",
          workDaysAndTime: workDaysAndTime,
        },
        {
          onError: (err: any) => {
            openNotification({
              state: "error",
              title: "Error Occurred",
              description:
                err?.response.data.message ?? err?.response.data.error.message,
              duration: 7.0,
            });
          },
          onSuccess: (res: any) => {
            openNotification({
              state: "success",
              title: "Success",
              description: "Schedule Created Successfully",
            });

            dispatch({ type: EGlobalOps.setShowInitialSetup, payload: true });
            queryClient.invalidateQueries([QUERY_KEY_FOR_WORK_SCHEDULE]);
          },
        }
      );
    }
  };
  const handleShiftChange = (shift: string, checked: boolean) => {
    if (checked) {
      setSelectedShifts((prevShifts) => [...prevShifts, shift]);
    } else {
      setSelectedShifts((prevShifts) => prevShifts.filter((s) => s !== shift));
    }
  };
  return (
    <div>
      <div className="flex items-center flex-wrap gap-6">
        <h4 className="text-base font-medium">Hours</h4>
        <div className="flex items-center flex-wrap md:ml-20">
          <div className="shiftBox">
            <Checkbox
              onChange={(e) => handleShiftChange("Morning", e.target.checked)}
            >
              Morning
            </Checkbox>
          </div>
          <div className="shiftBox">
            <Checkbox
              onChange={(e) => handleShiftChange("Afternoon", e.target.checked)}
            >
              Afternoon
            </Checkbox>
          </div>
          <div className="shiftBox">
            <Checkbox
              onChange={(e) => handleShiftChange("Night", e.target.checked)}
            >
              Night
            </Checkbox>
          </div>
        </div>
      </div>
      <p className="py-4">
        Checkbox the working days, input the time frame for each shift.
      </p>
      <Form onFinish={onFinish} form={form}>
        <Form.List name="workDaysAndTime">
          {(fields) => (
            <>
              {fields.map((field, index) => {
                const selectedShift = form.getFieldValue([
                  "workDaysAndTime",
                  field.name,
                  "shift",
                ]);

                return (
                  <div key={field.key} className="flex gap-5">
                    {selectedShifts.includes(selectedShift) && (
                      <>
                        <Form.Item {...field} name={[field.name, "day"]}>
                          <Input placeholder="day" disabled className="w-32" />
                        </Form.Item>
                        <Form.Item {...field} name={[field.name, "shift"]}>
                          <Input
                            placeholder="shift"
                            disabled
                            className="w-24"
                          />
                        </Form.Item>
                        <div className="flex-1 w-full">
                          <Form.Item
                            {...field}
                            name={[field.name, "time"]}
                            noStyle
                          >
                            <TimePicker.RangePicker className="flex-1 w-full" format="HH:mm"/>
                          </Form.Item>
                        </div>
                      </>
                    )}
                  </div>
                );
              })}
            </>
          )}
        </Form.List>
        <div className="flex gap-3">
          <AppButton label="Upload Template" />
          <AppButton type="submit" isLoading={isLoading} />
        </div>
      </Form>
    </div>
  );
};
