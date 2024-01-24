import { Checkbox, Form, Input, TimePicker } from "antd";
import { AppButton } from "components/button/AppButton";
import { useCreateFixedSchedule } from "features/timeAndAttendance/hooks/useCreateFixedSchedule";
import { useGetFixedSchedule } from "features/timeAndAttendance/hooks/useGetFixedSchedule";
import { QUERY_KEY_FOR_WORK_SCHEDULE } from "features/timeAndAttendance/hooks/useGetWorkSchedule";
import moment from "moment";
import { useContext, useEffect } from "react";
import { useQueryClient } from "react-query";
import { EGlobalOps, GlobalContext } from "stateManagers/GlobalContextProvider";
import { openNotification } from "utils/notifications";

export const WorkFixed: React.FC<{ data: any }> = () => {
  const [form] = Form.useForm();
  const queryClient = useQueryClient();
  const globalCtx = useContext(GlobalContext);
  const { dispatch } = globalCtx;
  const { mutate, isLoading } = useCreateFixedSchedule();
  const { data, isSuccess } = useGetFixedSchedule();

  useEffect(() => {
    let initialFormValues;

    if (isSuccess && data) {
      initialFormValues = data?.map((item: any) => ({
        day: item.day,
        time: [
          moment(`2013-02-07 ${item.startTime}`),
          moment(`2013-02-08 ${item.endTime}`),
        ],
      }));
    } else {
      initialFormValues = [
        { day: "Monday" },
        { day: "Tuesday" },
        { day: "Wednesday" },
        { day: "Thursday" },
        { day: "Friday" },
        { day: "Saturday" },
        { day: "Sunday" },
      ];
    }

    form.setFieldsValue({
      schedule: initialFormValues,
      // allowTrackingBeforeStart:
    });

    console.log(initialFormValues);
  }, [form, isSuccess, data]);

  const onFinish = (values: any) => {
    console.log(values);

    const workDaysAndTime = values?.schedule.map((item: any) => {
      if (!item.time || item.time.length < 2) {
        return {
          day: item.day,
          startTime: "00:00",
          endTime: "00:00",
        };
      }
      const [startTime, endTime] = item.time;
      return {
        day: item.day,
        startTime: startTime && startTime.format("HH:mm"),
        endTime: endTime && endTime.format("HH:mm"),
      };
    });

    mutate(
      {
        schedule: workDaysAndTime,
        allowTrackingBeforeStart: false,
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

          // form.resetFields();
          dispatch({ type: EGlobalOps.setShowInitialSetup, payload: true });
          queryClient.invalidateQueries([QUERY_KEY_FOR_WORK_SCHEDULE]);
        },
      }
    );
  };

  return (
    <div>
      {/* <div className="flex items-center flex-wrap gap-6">
        <h4 className="text-base font-medium">Days of the week</h4>
        <div className="flex items-center flex-wrap">
          <div className={`${boxStyle} bg-caramel rounded-l`}>
            <h5>M</h5>
          </div>
          <div className={`${boxStyle} bg-caramel`}>
            <h5>T</h5>
          </div>
          <div className={`${boxStyle} bg-caramel`}>
            <h5>W</h5>
          </div>
          <div className={`${boxStyle} bg-caramel`}>
            <h5>T</h5>
          </div>
          <div className={`${boxStyle} bg-caramel`}>
            <h5>F</h5>
          </div>
          <div className={`${boxStyle}`}>
            <h5>S</h5>
          </div>
          <div className={`${boxStyle} rounded-r`}>
            <h5>S</h5>
          </div>
        </div>
      </div> */}

      {/* form */}
      <div className="mt-6">
        <Form form={form} onFinish={onFinish}>
          <Form.List name="schedule">
            {(fields) => (
              <>
                {fields.map((field, index) => (
                  <div key={field.key} className="flex gap-5">
                    <Form.Item {...field} name={[field.name, "day"]}>
                      <Input placeholder="day" disabled className="w-32" />
                    </Form.Item>
                    <div className="flex-1 w-full">
                      <Form.Item {...field} name={[field.name, "time"]} noStyle>
                        <TimePicker.RangePicker
                          className="flex-1 w-full"
                          format="HH:mm"
                        />
                      </Form.Item>
                    </div>
                  </div>
                ))}
              </>
            )}
          </Form.List>

          {/* <Form.List name="workDaysAndTime">
            {(fields) => (
              <>
                {fields.map((field, index) => (
                  <div key={field.key} className="flex gap-5">
                    <Form.Item {...field} name={[field.name, "day"]}>
                      <Input placeholder="day" disabled className="w-32" />
                    </Form.Item>
                    <div className="flex-1 w-full">
                      <Form.Item {...field} name={[field.name, "time"]} noStyle>
                        <TimePicker.RangePicker className="flex-1 w-full" />
                      </Form.Item>
                    </div>
                  </div>
                ))}
              </>
            )}
          </Form.List> */}

          <div className="flex justify-between md:flex-row flex-col items-start">
            <div className="flex items-start gap-2 md:gap-5">
              <h4 className="pt-1">Payroll hours</h4>
              <Form.Item name="allowTrackingBeforeStart">
                <Checkbox>
                  Include time tracked before scheduled start time
                </Checkbox>
              </Form.Item>
            </div>
            <AppButton label="Save" type="submit" isLoading={isLoading} />
          </div>
        </Form>
      </div>
    </div>
  );
};
