import { DatePicker, Form, Input, Modal } from "antd";
import { AppButton } from "components/button/AppButton";
import { IModalProps } from "types";
import { dateHasToBeGreaterThanCurrentDayRule } from "utils/formHelpers/validation";
import { useGetSingleLoan } from "../../hooks/requests/useGetSingleLoan";
import { useDisburseLoan } from "../../hooks/useDisburseLoan";
import { openNotification } from "utils/notifications";
import { useContext, useEffect } from "react";
import { EGlobalOps, GlobalContext } from "stateManagers/GlobalContextProvider";
import { useQueryClient } from "react-query";
import { QUERY_KEY_FOR_LOAN_REQUESTS } from "../../hooks/requests/useGetLoanRequests";
import { QUERY_KEY_FOR_ALL_LOAN_REQUESTS } from "../../hooks/requests/useGetAllLoans";
import dayjs from "dayjs";
import { DEFAULT_DATE_FORMAT } from "constants/dateFormats";

export const LoanDisbursement = ({ handleClose, open, id }: IModalProps) => {
  const { data, isSuccess } = useGetSingleLoan({ id: id ?? 0 });
  const globalCtx = useContext(GlobalContext);
  const { dispatch } = globalCtx;
  const queryClient = useQueryClient();
  const { mutate, isLoading } = useDisburseLoan();
  const [form] = Form.useForm();

  useEffect(() => {
    if (isSuccess && id) {
      form.setFieldsValue({
        requestDate: dayjs(data.date).format(DEFAULT_DATE_FORMAT),
      });
    } else {
      form.resetFields();
    }
  }, [form, id, data, isSuccess]);
  const onSubmit = (val: any) => {
    mutate(
      {
        disbursedAt: val.disbursedAt,
        id: id ?? 0,
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
          queryClient.invalidateQueries([QUERY_KEY_FOR_LOAN_REQUESTS]);
          queryClient.invalidateQueries([QUERY_KEY_FOR_ALL_LOAN_REQUESTS]);
          form.resetFields();
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
      title={"Loan Disbursement"}
      style={{ top: 20 }}
    >
      <Form
        form={form}
        requiredMark={false}
        onFinish={onSubmit}
        layout="vertical"
      >
        <Form.Item name="requestDate" label="Employee Request date">
          <Input placeholder="Date" disabled />
        </Form.Item>
        <Form.Item
          rules={[dateHasToBeGreaterThanCurrentDayRule]}
          name="disbursedAt"
          label="Set disbursement date"
        >
          <DatePicker className="w-full" />
        </Form.Item>

        <AppButton type="submit" label="Submit" isLoading={isLoading} />
      </Form>
    </Modal>
  );
};
