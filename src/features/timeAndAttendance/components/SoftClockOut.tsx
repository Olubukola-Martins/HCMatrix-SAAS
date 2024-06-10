import { openNotification } from "utils/notifications";
import offIndicator from "../assets/images/offIndicator.svg";
import { useContext, useState } from "react";
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
import { useSoftClockOut } from "../hooks/useSoftClockOut";
import { useManageLocation } from "../hooks/useManageLocation";
import { QUERY_KEY_FOR_CLOCKING_AND_BREAK_STATUS } from "../hooks/useClockingAndBreakStatus";
import { useGetFormattedDate } from "hooks/useGetFormattedDate";
import { QUERY_KEY_FOR_TIME_SHEET } from "../features/timeSheet/hooks/useGetTimeSheet";
import { QUERY_KEY_FOR_ANALYTICS_RECORDS } from "../features/home/hooks/useGetAnalyticsRecord";
import { QUERY_KEY_FOR_TIME_SHEET_DASHBOARD } from "../features/home/hooks/useGetTimeSheetRecord";
import { softClockInAndOutProps } from "../types";

export const SoftClockOut = ({ componentType }: softClockInAndOutProps) => {
  const globalCtx = useContext(GlobalContext);
  const { dispatch } = globalCtx;
  const queryClient = useQueryClient();
  const [form] = Form.useForm();
  const { mutate, isLoading } = useSoftClockOut();
  const [openClockOutForm, setOpenClockOutForm] = useState(false);
  const [toggleWorkEnd, setToggleWorkEnd] = useState(false);
  const { lat, long } = useManageLocation();
  const { formattedDate } = useGetFormattedDate();

  const onSubmit = (values: any) => {
    mutate(
      {
        comment: values.comment,
        endWork: values.endWork,
        extraHours: values.extraHours,
        payExtraHours: values.payExtraHours,
        location: {
          longitude: long ? long : null,
          latitude: lat ? lat : null,
        },
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
          queryClient.invalidateQueries([
            QUERY_KEY_FOR_CLOCKING_AND_BREAK_STATUS,
          ]);
          queryClient.invalidateQueries([QUERY_KEY_FOR_TIME_SHEET]);
          queryClient.invalidateQueries([QUERY_KEY_FOR_ANALYTICS_RECORDS]);
          queryClient.invalidateQueries([QUERY_KEY_FOR_TIME_SHEET_DASHBOARD]);
          form.resetFields();
          setOpenClockOutForm(false);
        },
      }
    );
  };

  return (
    <div>
      {componentType === "image" ? (
        <img
          src={offIndicator}
          alt="off indicator"
          className="cursor-pointer"
          title="Clock out"
          onClick={() => setOpenClockOutForm(true)}
        />
      ) : (
        <button className="button w-full">Clock - Out</button>
      )}

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

          <AppButton label="Clock Out" type="submit" isLoading={isLoading} />
        </Form>
      </Modal>
    </div>
  );
};
