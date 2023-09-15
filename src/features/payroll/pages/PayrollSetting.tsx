import PayrollSubNav from "../components/PayrollSubNav";

import { PageIntro } from "components/layout/PageIntro";
import { appRoutes } from "config/router/paths";
import PageSubHeader from "components/layout/PageSubHeader";
import CompanyBankDetails from "../components/payrollSetting/CompanyBankDetails";
import SelectPayslipTemplate from "../components/payrollSetting/SelectPayslipTemplate";
import LoanConfiguration from "../components/payrollSetting/LoanConfiguration";
import { Form } from "antd";
import { useHandlelPayrollSetting } from "../hooks/payroll/setting/useHandlelPayrollSetting";
import { useState } from "react";
import { TPaystackBank } from "types/paystackBank";
import { openNotification } from "utils/notifications";
import { FormInstance } from "antd/es/form";

const PayrollSetting = () => {
  const [form] = Form.useForm();
  const { mutate, isLoading } = useHandlelPayrollSetting();
  const [bank, setBank] = useState<TPaystackBank>();

  const handleSubmit = (data: any) => {
    if (!bank) return;
    mutate(
      {
        data: {
          companyBankDetails: {
            bankCode: data.bankCode,
            accountNumber: data.accountNumber,
            bankName: bank.name,
          },
          loanConfiguration: {
            isActive: data.schemes.length > 0,
            schemes: data.schemes,
          },
          payslipTemplate: {
            templateId: data.templateId,
          },
        },
      },
      {
        onError: (err: any) => {
          openNotification({
            state: "error",
            title: "Error Occurred",
            description:
              err?.response.data.message ?? err?.response.data.error.message,
          });
        },
        onSuccess: (res: any) => {
          openNotification({
            state: "success",

            title: "Success",
            description: res.data.message,
            // duration: 0.4,
          });
          form.resetFields();
        },
      }
    );
  };
  const handleBank = (bank?: TPaystackBank) => {
    setBank(bank);
  };
  return (
    <>
      <PayrollSubNav />
      <div className="Container flex flex-col gap-2">
        <PageIntro title="Payroll Setting" link={appRoutes.payrollHome} />
        <PageSubHeader
          description={"Configure your payroll setting"}
          hideBackground
          actions={[
            {
              handleClick: () => form.submit(),
              name: "Save",

              loading: isLoading,
            },
          ]}
        />
        <PayrollSettingContainer
          Form={Form}
          handleSubmit={handleSubmit}
          handleBank={handleBank}
          form={form}
        />
      </div>
    </>
  );
};

const PayrollSettingContainer: React.FC<{
  Form: any;
  form: FormInstance<any>;
  handleSubmit: (data: any) => void;
  handleBank: (data?: TPaystackBank) => void;
}> = ({ Form, handleSubmit, handleBank, form }) => {
  return (
    <>
      <Form requiredMark={false} onFinish={handleSubmit} form={form}>
        <div className="bg-card px-5 py-7  rounded-md mt-7 grid grid-cols-1 md:grid-cols-2 gap-7 text-accent">
          <div className="flex flex-col gap-4">
            <CompanyBankDetails key={1} Form={Form} handleBank={handleBank} />
            <LoanConfiguration key={2} Form={Form} />
          </div>

          <div className="flex flex-col gap-4">
            <SelectPayslipTemplate key={3} Form={Form} />
          </div>
        </div>
      </Form>
    </>
  );
};

export default PayrollSetting;
