import { DatePicker, Form, Modal, Select, Spin, TimePicker } from "antd";
import TextArea from "antd/lib/input/TextArea";
import { AppButton } from "components/button/AppButton";
import { IModalProps } from "types";
import {
  generalValidationRules,
  textInputValidationRulesOp,
} from "utils/formHelpers/validation";
import { openNotification } from "utils/notifications";
import { EGlobalOps, GlobalContext } from "stateManagers/GlobalContextProvider";
import { useContext, useEffect, useState } from "react";
import { useQueryClient } from "react-query";
import { useCreateTimeOff } from "../hooks/useCreateTimeOff";
import { useGetTimeOffPolicy } from "../../settings/timeOffPolicy/hooks/useGetTimeOffPolicy";
import { QUERY_KEY_FOR_TIME_OFF } from "../hooks/useGetTimeOff";
import { useGetSingleTimeOff } from "../hooks/useGetSingleTimeOff";
import moment from "moment";
import { useDebounce } from "hooks/useDebounce";

export const AddTimeOff = ({ open, handleClose, id }: IModalProps) => {
  const [form] = Form.useForm();
  const [searchTerm, setSearchTerm] = useState<string>("");
  const debouncedSearchTerm: string = useDebounce<string>(searchTerm);
  const globalCtx = useContext(GlobalContext);
  const { dispatch } = globalCtx;
  const {
    data: timeOffPolicyData,
    isLoading: loadPolicy,
    isSuccess: timeOffPolicySuccess,
  } = useGetTimeOffPolicy({ search: debouncedSearchTerm });

  const { mutate, isLoading: isLoadingCreate } = useCreateTimeOff();
  const queryClient = useQueryClient();
  const { data, isSuccess, isLoading } = useGetSingleTimeOff(
    id as unknown as number
  );

  const handleSearch = (val: string) => {
    setSearchTerm(val);
  };

  useEffect(() => {
    if (data && id) {
      form.setFieldsValue({
        policyId: data?.policyId,
        date: moment(data?.date),
        time: moment(data?.time, "HH:mm:ss"),
        comment: data?.comment,
      });
    } else {
      form.resetFields();
    }
  }, [form, id, data, isSuccess]);

  const handleSubmit = (values: any) => {
    mutate(
      {
        id: id ? id : undefined,
        policyId: values.policyId,
        date: values.date.format("YYYY-MM-DD"),
        time: values.time.format("HH:mm:ss"),
        comment: values.comment,
      },
      {
        onError: (err: any) => {
          openNotification({
            state: "error",
            title: "Error Occurred",
            description:
              err?.response.data.message ?? err?.response.data.error.message,
            duration: 6.0,
          });
        },
        onSuccess: (res: any) => {
          openNotification({
            state: "success",
            title: "Success",
            description: res.data.message,
          });
          form.resetFields();
          dispatch({ type: EGlobalOps.setShowInitialSetup, payload: true });
          queryClient.invalidateQueries([QUERY_KEY_FOR_TIME_OFF]);
          handleClose();
        },
      }
    );
  };

  return (
    <Modal
      open={open}
      onCancel={() => handleClose()}
      footer={null}
      title={`${id ? "Edit" : "Create"} Timeoff`}
      style={{ top: 15 }}
    >
      <Form
        layout="vertical"
        requiredMark={false}
        form={form}
        onFinish={handleSubmit}
        disabled={isLoading}
      >
        <Form.Item
          name="policyId"
          label="Time off policy"
          rules={generalValidationRules}
        >
          <Select
            allowClear
            showSearch
            onClear={() => setSearchTerm("")}
            onSearch={handleSearch}
            loading={loadPolicy}
            placeholder="Select"
            defaultActiveFirstOption={false}
            showArrow={false}
            filterOption={false}
          >
            {timeOffPolicySuccess ? (
              timeOffPolicyData?.data.map((item) => (
                <Select.Option key={item.id} value={item.id}>
                  {item.title}
                </Select.Option>
              ))
            ) : (
              <div className="flex justify-center items-center w-full">
                <Spin size="small" />
              </div>
            )}
          </Select>
        </Form.Item>
        <Form.Item name="time" label="Time" rules={generalValidationRules}>
          <TimePicker className="w-full" />
        </Form.Item>
        <Form.Item name="date" label="Date" rules={generalValidationRules}>
          <DatePicker className="w-full" />
        </Form.Item>

        <Form.Item
          name="comment"
          label="Comment"
          requiredMark="optional"
          rules={textInputValidationRulesOp}
        >
          <TextArea />
        </Form.Item>
        <AppButton type="submit" isLoading={isLoadingCreate} />
      </Form>
    </Modal>
  );
};
