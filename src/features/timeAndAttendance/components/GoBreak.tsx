import { Form, Modal, Select, Spin } from "antd";
import { AppButton } from "components/button/AppButton";
import { useContext, useState } from "react";
import { IModalProps } from "types";
import { useGetBreakPolicy } from "../features/settings/workSchedule/hooks/useGetBreakPolicy";
import { useDebounce } from "hooks/useDebounce";
import { generalValidationRules } from "utils/formHelpers/validation";
import { useGoBreak } from "../hooks/useGoBreak";
import { openNotification } from "utils/notifications";
import { EGlobalOps, GlobalContext } from "stateManagers/GlobalContextProvider";
import { useQueryClient } from "react-query";
import { QUERY_KEY_FOR_CLOCKING_AND_BREAK_STATUS } from "../hooks/useClockingAndBreakStatus";

export const GoBreak = ({ handleClose, open }: IModalProps) => {
  const globalCtx = useContext(GlobalContext);
  const { dispatch } = globalCtx;
  const queryClient = useQueryClient();
  const [form] = Form.useForm();
  const [searchTerm, setSearchTerm] = useState<string>("");
  const debouncedSearchTerm: string = useDebounce<string>(searchTerm);
  const {
    data: breakPolicyData,
    isLoading: breakPolicyLoad,
    isSuccess,
  } = useGetBreakPolicy({ search: debouncedSearchTerm });

  const { mutate, isLoading } = useGoBreak();

  const handleSearch = (val: string) => {
    setSearchTerm(val);
  };

  const onSubmit = (value: any) => {
    mutate(
      {
        ...value,
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
          form.resetFields();
          handleClose();
        },
      }
    );
  };

  return (
    <Modal
      title="Go on Break"
      open={open}
      onCancel={() => handleClose()}
      footer={null}
      style={{ top: 10 }}
    >
      <Form
        layout="vertical"
        requiredMark="optional"
        form={form}
        onFinish={onSubmit}
      >
        <Form.Item
          name="breakPolicyId"
          label="Type of Break"
          rules={generalValidationRules}
        >
          <Select
            allowClear
            showSearch
            onClear={() => setSearchTerm("")}
            onSearch={handleSearch}
            loading={breakPolicyLoad}
            placeholder="Select"
            defaultActiveFirstOption={false}
            showArrow={false}
            filterOption={false}
          >
            {isSuccess ? (
              breakPolicyData?.data.map((item) => (
                <Select.Option key={item.id} value={item.id}>
                  {item.name}
                </Select.Option>
              ))
            ) : (
              <div className="flex justify-center items-center w-full">
                <Spin size="small" />
              </div>
            )}
          </Select>
        </Form.Item>
        <AppButton label="Submit" type="submit" isLoading={isLoading} />
      </Form>
    </Modal>
  );
};
