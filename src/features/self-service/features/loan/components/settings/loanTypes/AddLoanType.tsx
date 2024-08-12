import { Form, Input, InputNumber, Modal, Radio } from "antd";
import { AppButton } from "components/button/AppButton";
import { useContext, useState } from "react";
import { IModalProps } from "types";
import {
  generalValidationRules,
  textInputValidationRules,
} from "utils/formHelpers/validation";
import { useAddAndUpdateLoanType } from "../../../hooks/type/useAddAndUpdateLoanType";
import { openNotification } from "utils/notifications";
import { EGlobalOps, GlobalContext } from "stateManagers/GlobalContextProvider";
import { useQueryClient } from "react-query";

export const AddLoanType = ({ handleClose, open, id }: IModalProps) => {
  const [interestOption, setInterestOption] = useState(false);
  const [form] = Form.useForm();
  const globalCtx = useContext(GlobalContext);
  const { dispatch } = globalCtx;
  const queryClient = useQueryClient();
  const {mutate, isLoading: loadCreateLoan} = useAddAndUpdateLoanType()
   
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
        },
      }
    );
  };

   
  return (
    <Modal
      open={open}
      footer={null}
      onCancel={() => handleClose()}
      title={`Add Loan Type`}
    >
      <Form
        requiredMark={false}
        layout="vertical"
        onFinish={onSubmit}
        form={form}
      >
        <Form.Item
          name="name"
          label="Loan Type"
          rules={textInputValidationRules}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="hasInterest"
          label="Do you want to attach an interest rate to this loan type"
          rules={generalValidationRules}
        >
          <Radio.Group
            className="flex flex-col gap-4"
            onChange={(e) => setInterestOption(e.target.value)}
          >
            <Radio value={false}>No</Radio>
            <Radio value={true}>Yes</Radio>
          </Radio.Group>
        </Form.Item>

        {interestOption && (
          <Form.Item
            label="Interest Rate (%)"
            name="interestRate"
            rules={generalValidationRules}
          >
            <InputNumber
              placeholder="Percentage"
              className="w-full"
              min={1}
              max={100}
            />
          </Form.Item>
        )}

        <AppButton type="submit" label="Add" isLoading={loadCreateLoan} />
      </Form>
    </Modal>
  );
};
