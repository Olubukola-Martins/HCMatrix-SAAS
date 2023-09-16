import PayrollSubNav from "../components/PayrollSubNav";

import { PageIntro } from "components/layout/PageIntro";
import { appRoutes } from "config/router/paths";
import PageSubHeader from "components/layout/PageSubHeader";
import CompanyBankDetails from "../components/payrollSetting/CompanyBankDetails";
import SelectPayslipTemplate from "../components/payrollSetting/SelectPayslipTemplate";
import LoanConfiguration from "../components/payrollSetting/LoanConfiguration";
import { Form, Skeleton } from "antd";
import { useHandlelPayrollSetting } from "../hooks/payroll/setting/useHandlelPayrollSetting";
import { useState, useEffect } from "react";
import { TPaystackBank } from "types/paystackBank";
import { openNotification } from "utils/notifications";
import { FormInstance } from "antd/es/form";
import { useGetPayrollSetting } from "../hooks/payroll/setting/useGetPayrollSetting";

const PayrollSetting = () => {
  const { data: setting, isFetching } = useGetPayrollSetting();

  const [form] = Form.useForm();
  const { mutate, isLoading } = useHandlelPayrollSetting();
  const [bank, setBank] = useState<Pick<TPaystackBank, "code" | "name">>();
  const [loanActivation, setLoanActivation] = useState(false);
  const handleLoanActivation = (val: boolean) => {
    setLoanActivation(val);
  };

  useEffect(() => {
    if (!setting) return;
    setLoanActivation(setting.loanConfiguration.isActive);
    setBank({
      name: setting.companyBankDetails.bankName,
      code: setting.companyBankDetails.bankCode,
    });
    form.setFieldsValue({
      bankCode: setting.companyBankDetails.bankCode,
      accountNumber: setting.companyBankDetails.accountNumber,
      bankName: setting.companyBankDetails.bankName,
      isActive: setting.loanConfiguration.isActive,
      schemes: setting.loanConfiguration.schemes,
      templateId: setting.payslipTemplate.templateId,
    });
  }, [form, setting]);

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
            isActive: loanActivation,
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
          // form.resetFields();
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
        <Skeleton loading={isFetching} active paragraph={{ rows: 12 }}>
          <PayrollSettingContainer
            Form={Form}
            handleSubmit={handleSubmit}
            handleBank={handleBank}
            form={form}
            loanActivation={loanActivation}
            handleLoanActivation={handleLoanActivation}
          />
        </Skeleton>
      </div>
    </>
  );
};

const PayrollSettingContainer: React.FC<{
  Form: any;
  form: FormInstance<any>;
  handleSubmit: (data: any) => void;
  handleBank: (data?: TPaystackBank) => void;
  loanActivation: boolean;
  handleLoanActivation: (val: boolean) => void;
}> = ({
  Form,
  handleSubmit,
  handleBank,
  form,
  handleLoanActivation,
  loanActivation,
}) => {
  return (
    <>
      <Form requiredMark={false} onFinish={handleSubmit} form={form}>
        <div className="bg-card px-5 py-7  rounded-md mt-7 grid grid-cols-1 md:grid-cols-2 gap-7 text-accent">
          <div className="flex flex-col gap-4">
            <CompanyBankDetails Form={Form} handleBank={handleBank} />
            <LoanConfiguration
              Form={Form}
              loanActivation={loanActivation}
              handleLoanActivation={handleLoanActivation}
            />
          </div>

          <div className="flex flex-col gap-4">
            <SelectPayslipTemplate Form={Form} />
          </div>
        </div>
      </Form>
    </>
  );
};

export default PayrollSetting;
