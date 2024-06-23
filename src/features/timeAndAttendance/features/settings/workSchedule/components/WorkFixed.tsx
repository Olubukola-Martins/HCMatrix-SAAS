import { Checkbox, Form, Input, TimePicker } from "antd";
import { AppButton } from "components/button/AppButton";
import dayjs from "dayjs";
import { useContext, useEffect } from "react";
import { useQueryClient } from "react-query";
import { EGlobalOps, GlobalContext } from "stateManagers/GlobalContextProvider";
import { openNotification } from "utils/notifications";
import { useCreateFixedSchedule } from "../hooks/useCreateFixedSchedule";
import {
  QUERY_KEY_FOR_WORK_SCHEDULE_FIXED,
  useGetFixedSchedule,
} from "../hooks/useGetFixedSchedule";
import { capitalizeWord } from "../../Utils";

export const WorkFixed = () => {
  const [form] = Form.useForm();
  const queryClient = useQueryClient();
  const globalCtx = useContext(GlobalContext);
  const { dispatch } = globalCtx;
  const { mutate, isLoading } = useCreateFixedSchedule();
  const { data, isSuccess, isLoading: isFetchLoading } = useGetFixedSchedule();

  const allowTracking = data?.map((item: any) => item.allowTrackingBeforeStart);
  const allowTrackingResult = allowTracking?.find(
    (element) => element === false || true
  );

  useEffect(() => {
    let initialFormValues;

    if (isSuccess && data && data.length !== 0) {
      initialFormValues = data?.map((item: any) => ({
        day: capitalizeWord(item.day),
        time: [
          dayjs(`2013-02-07 ${item.startTime}`),
          dayjs(`2013-02-08 ${item.endTime}`),
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
      allowTrackingBeforeStart: allowTrackingResult,
    });
  }, [form, isSuccess, data]);

  const onFinish = (values: any) => {
    const workDaysAndTime = values?.schedule.map((item: any) => {
      if (!item.time || item.time.length < 2) {
        return {
          day: item.day,
          startTime: "00:00:00",
          endTime: "00:00:00",
        };
      }
      const [startTime, endTime] = item.time;
      
      return {
        day: item.day.toLowerCase(),
        startTime: startTime && startTime.format("HH:mm:ss"),
        endTime: endTime && endTime.format("HH:mm:ss"),
      };
    });

    mutate(
      {
        schedule: workDaysAndTime,
        allowTrackingBeforeStart: values.allowTrackingBeforeStart,
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
            description: res.data.message,
          });

          dispatch({ type: EGlobalOps.setShowInitialSetup, payload: true });
          queryClient.invalidateQueries([QUERY_KEY_FOR_WORK_SCHEDULE_FIXED]);
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
        <Form form={form} onFinish={onFinish} disabled={isFetchLoading}>
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

          <div className="flex justify-between md:flex-row flex-col items-start">
            <div className="flex items-start gap-2 md:gap-5">
              <h4 className="pt-1">Payroll hours</h4>
              <Form.Item
                name="allowTrackingBeforeStart"
                valuePropName="checked"
                initialValue={false}
              >
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
