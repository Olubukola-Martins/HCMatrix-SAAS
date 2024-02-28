import { Drawer, Form, Input, Select, TimePicker } from "antd";
import { AppButton } from "components/button/AppButton";
import { UseWindowWidth } from "features/timeAndAttendance/hooks/UseWindowWidth";
import { useContext, useEffect } from "react";
import { IDrawerProps } from "types";
import { generalValidationRules } from "utils/formHelpers/validation";
import { useSetUpBreak } from "../hooks/useSetUpBreak";
import { openNotification } from "utils/notifications";
import { EGlobalOps, GlobalContext } from "stateManagers/GlobalContextProvider";
import { useQueryClient } from "react-query";
import moment from "moment";
import { QUERY_KEY_FOR_BREAK_POLICY } from "../hooks/useGetBreakPolicy";
import { useGetSingleBreakPolicy } from "../hooks/useGetSingleBreakPolicy";

export const AddBreak = ({ handleClose, open, id }: IDrawerProps) => {
  const { drawerSize } = UseWindowWidth();
  const globalCtx = useContext(GlobalContext);
  const { dispatch } = globalCtx;
  const [form] = Form.useForm();
  const { mutate, isLoading } = useSetUpBreak();
  const {
    data,
    isSuccess,
    isLoading: loadSingle,
  } = useGetSingleBreakPolicy(id as number);
  const queryClient = useQueryClient();

  const defaultField = {
    name: "",
    isPaid: undefined,
    time: "",
    enforcePeriod: undefined,
  };

  useEffect(() => {
    if (id && isSuccess) {
      form.setFieldsValue({
        fields: [
          {
            name: data?.name,
            isPaid: data?.isPaid,
            time: [
              moment(data?.startAt? data?.startAt : '00:00:00', "HH:mm:ss"),
              moment(data?.endAt ? data?.endAt : '00:00:00', "HH:mm:ss"),
            ],
            enforcePeriod: data?.enforcePeriod,
          },
        ],
      });
    } else {
      form.setFieldsValue({ fields: [defaultField] });
    }
  }, [form, data, id, isSuccess]);

  const handleAddField = () => {
    const fields = form.getFieldValue("fields") || [];
    const newField = {
      name: "",
      isPaid: undefined,
      timeRange: "",
      enforcePeriod: undefined,
    };
    form.setFieldsValue({ fields: [...fields, newField] });
  };

  const handleRemoveField = (index: number) => {
    const fields = form.getFieldValue("fields") || [];
    form.setFieldsValue({
      fields: fields.filter((_: any, i: number) => i !== index),
    });
  };

  const handleFormSubmit = (values: any) => {
    const workDaysAndTime = values?.fields.map((item: any) => {
      if (!item.time || item.time.length < 2) {
        return {
          name: item.name,
          isPaid: item.isPaid,
          enforcePeriod: item.enforcePeriod,
          startAt: "00:00:00",
          endAt: "00:00:00",
          duration: "0h:0m",
        };
      }

      const [startAt, endAt] = item.time;
      const startTime = startAt && moment(startAt, "HH:mm:ss");
      const endTime = endAt && moment(endAt, "HH:mm:ss");

      let startAtValue, endAtValue, durationValue;

      if (item.enforcePeriod) {
        startAtValue = startTime && startTime.format("HH:mm:ss");
        endAtValue = endTime && endTime.format("HH:mm:ss");
      } else {
        const duration = moment.duration(endTime.diff(startTime));
        const totalHours = duration.hours();
        const totalMinutes = duration.minutes();
        durationValue = `${totalHours}h:${totalMinutes}m`;
      }

      return {
        id: id ? id : undefined,
        name: item.name,
        isPaid: item.isPaid,
        enforcePeriod: item.enforcePeriod,
        startAt: startAtValue,
        endAt: endAtValue,
        duration: durationValue,
      };
    });

    mutate(
      {
        data: workDaysAndTime,
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
          queryClient.invalidateQueries([QUERY_KEY_FOR_BREAK_POLICY]);
          handleClose();
          form.setFieldsValue({ fields: [defaultField] });
        },
      }
    );
  };

  return (
    <Drawer
      title={`${id ? "Edit" : "Add"} break`}
      size={drawerSize}
      onClose={() => handleClose()}
      open={open}
    >
      <Form
        onFinish={handleFormSubmit}
        form={form}
        layout="vertical"
        className="mt-4 "
        requiredMark={false}
        disabled={loadSingle}
      >
        <Form.List name="fields">
          {(fields) => (
            <>
              {fields.map((field, index) => (
                <div key={field.key}>
                  <div className="md:grid grid-cols-1 md:grid-cols-2 gap-x-5">
                    <Form.Item
                      {...field}
                      name={[field.name, "name"]}
                      label="Break name"
                      rules={generalValidationRules}
                    >
                      <Input placeholder="break Name" />
                    </Form.Item>
                    <Form.Item
                      {...field}
                      name={[field.name, "enforcePeriod"]}
                      label="Allow break to be taken between the selected time"
                    >
                      <Select
                        options={[
                          { value: false, label: "No" },
                          { value: true, label: "Yes" },
                        ]}
                        placeholder="Select"
                        className="w-full"
                      />
                    </Form.Item>

                    <Form.Item
                      {...field}
                      name={[field.name, "time"]}
                      label="Time Range"
                    >
                      <TimePicker.RangePicker className="w-full" />
                    </Form.Item>

                    <Form.Item
                      {...field}
                      name={[field.name, "isPaid"]}
                      label="Break payment status"
                    >
                      <Select
                        options={[
                          { value: true, label: "Paid" },
                          { value: false, label: "Unpaid" },
                        ]}
                        placeholder="Select"
                      />
                    </Form.Item>
                  </div>
                  {!id && (
                    <div className="flex justify-end">
                      <i
                        className="ri-delete-bin-line -mt-3 text-xl cursor-pointer hover:text-caramel"
                        onClick={() => handleRemoveField(index)}
                      ></i>
                    </div>
                  )}
                </div>
              ))}

              <div className="flex justify-between items-center mt-3">
                {!id && (
                  <AppButton
                    variant="transparent"
                    label="+ Add More"
                    handleClick={() => handleAddField()}
                  />
                )}
                <AppButton label="Submit" type="submit" isLoading={isLoading} />
              </div>
            </>
          )}
        </Form.List>
      </Form>
    </Drawer>
  );
};
