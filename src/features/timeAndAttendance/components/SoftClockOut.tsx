import { openNotification } from "utils/notifications";
import offIndicator from "../assets/images/offIndicator.svg";
import { useContext, useEffect, useState } from "react";
import { EGlobalOps, GlobalContext } from "stateManagers/GlobalContextProvider";
import { useQueryClient } from "react-query";
import { Checkbox, Form, Modal, Select } from "antd";
import { AppButton } from "components/button/AppButton";
import TextArea from "antd/lib/input/TextArea";
import {
  generalValidationRules,
  textInputValidationRulesOpt,
} from "utils/formHelpers/validation";
import { hourList } from "../constants";
import LiveClock from "components/clock/LiveClock";
import moment from "moment";
import { useSoftClockOut } from "../hooks/useSoftClockOut";

export const SoftClockOut = () => {
  const globalCtx = useContext(GlobalContext);
  const { dispatch } = globalCtx;
  const queryClient = useQueryClient();
  const [form] = Form.useForm();
  const { mutate, isLoading } = useSoftClockOut();
  const [openClockOutForm, setOpenClockOutForm] = useState(false);
  const [toggleWorkEnd, setToggleWorkEnd] = useState(false);
  const [formattedDate, setFormattedDate] = useState<string>("");

  useEffect(() => {
    const currentDate = moment();
    const dayOfWeek = currentDate.format("dddd"); // Get day of the week
    const month = currentDate.format("MMM"); // Get abbreviated month
    const year = currentDate.format("YYYY"); // Get full year

    const formattedDateString = `${dayOfWeek}, ${month} ${year}`;
    setFormattedDate(formattedDateString);
  }, []);

  const onSubmit = (values: any) => {
    mutate(
      {
        ...values,
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
            duration: 4,
          });
          dispatch({ type: EGlobalOps.setShowInitialSetup, payload: true });
          queryClient.invalidateQueries([]);
          form.resetFields();
          setOpenClockOutForm(false);
        },
      }
    );
  };

  return (
    <div>
      <img
        src={offIndicator}
        alt="off indicator"
        className="cursor-pointer"
        title="Clock out"
        onClick={() => setOpenClockOutForm(true)}
      />

      <Modal
        title="Clock Out"
        open={openClockOutForm}
        onCancel={() => setOpenClockOutForm(false)}
        footer={null}
        style={{ top: 10 }}
      >
        <Form layout="vertical" requiredMark="optional" onFinish={onSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
            <div className="w-full bg-gray-100 py-1 px-2 rounded border">
              <LiveClock format="hh:mm:ss A" />
            </div>
            <div className="w-full bg-gray-100 py-1 px-2 rounded border">
              {formattedDate}
            </div>
          </div>
          <Form.Item
            rules={textInputValidationRulesOpt}
            label="Add note"
            requiredMark="optional"
            name="comment"
          >
            <TextArea />
          </Form.Item>
          <Form.Item
            name="endWork"
            valuePropName="checked"
            initialValue={false}
          >
            <Checkbox onChange={() => setToggleWorkEnd((prev) => !prev)}>
              End work for the day
            </Checkbox>
          </Form.Item>

          {!toggleWorkEnd && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
              <Form.Item
                rules={generalValidationRules}
                name="extraHours"
                label="Add Extra hour"
              >
                <Select
                  placeholder="Select"
                  allowClear
                  options={hourList.map((item: number) => ({
                    value: item,
                    label: `${item} ${item === 1 ? "hour" : "hours"}`,
                  }))}
                />
              </Form.Item>
              <Form.Item
                rules={generalValidationRules}
                name="payExtraHours"
                label="Request Payment for Extra hour"
              >
                <Select
                  placeholder="Select"
                  allowClear
                  options={[
                    { label: "No", value: false },
                    { label: "YES", value: true },
                  ]}
                />
              </Form.Item>
            </div>
          )}

          <AppButton label="Clock Out" type="submit" isLoading={isLoading}/>
        </Form>
      </Modal>
    </div>
  );
};
