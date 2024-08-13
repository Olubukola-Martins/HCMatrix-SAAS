import { Form, Input, InputNumber, Modal, Radio } from "antd";
import { AppButton } from "components/button/AppButton";
import { useContext, useEffect, useState } from "react";
import { IModalProps } from "types";
import {
  generalValidationRules,
  textInputValidationRules,
} from "utils/formHelpers/validation";
import { useAddAndUpdateLoanType } from "../../../hooks/type/useAddAndUpdateLoanType";
import { openNotification } from "utils/notifications";
import { EGlobalOps, GlobalContext } from "stateManagers/GlobalContextProvider";
import { useQueryClient } from "react-query";
import { useGetSingleLoanType } from "../../../hooks/type/useGetSingleLoanType";
import { QUERY_KEY_FOR_LOAN_TYPES } from "../../../hooks/type/useGetLoanTypes";

export const AddLoanType = ({ handleClose, open, id }: IModalProps) => {
  const [interestOption, setInterestOption] = useState<boolean>();
  const [form] = Form.useForm();
  const globalCtx = useContext(GlobalContext);
  const { dispatch } = globalCtx;
  const queryClient = useQueryClient();
  const { mutate, isLoading: loadCreateLoan } = useAddAndUpdateLoanType();
  const { data, isSuccess, isLoading } = useGetSingleLoanType({
    id: id as unknown as number,
  });
  useEffect(() => {
    if (isSuccess && id) {
      form.setFieldsValue({
        ...data,
      });
      setInterestOption(data.hasInterest);
    } else {
      form.resetFields();
    }
  }, [form, id, data, isSuccess]);


  const onSubmit = (values: any) => {
    mutate(
      {
        ...values,
        id,
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
          queryClient.invalidateQueries([QUERY_KEY_FOR_LOAN_TYPES]);
          handleClose()
        },
      }
    );
  };

  return (
    <Modal
      open={open}
      footer={null}
      onCancel={() => handleClose()}
      title={`${id ? "Edit" : "Add"}Loan Type`}
    >
      <Form
        requiredMark={false}
        layout="vertical"
        onFinish={onSubmit}
        form={form}
        disabled={isLoading}
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

        <AppButton type="submit" label="Submit" isLoading={loadCreateLoan} />
      </Form>
    </Modal>
  );
};
