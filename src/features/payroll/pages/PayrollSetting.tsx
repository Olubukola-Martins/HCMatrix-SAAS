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
  const [bank, setBank] = useState<
    Pick<TPaystackBank, "code" | "name"> & { accountName?: string }
  >();
  const [loanActivation, setLoanActivation] = useState(false);
  const handleLoanActivation = (val: boolean) => {
    setLoanActivation(val);
  };
  useEffect(() => {
    if (loanActivation === true) {
      // set the loan config to have office && direct-salary ticked by default(if no setting exists)
      form.setFieldValue("schemes", ["office", "direct-salary"]);
      return;
    }
  }, [form, loanActivation]);
  useEffect(() => {
    if (!setting) return;

    setLoanActivation(setting.loanConfiguration.isActive);
    setting?.companyBankDetails &&
      setBank({
        name: setting?.companyBankDetails?.bankName,
        code: setting?.companyBankDetails?.bankCode,
        accountName: setting?.companyBankDetails?.accountName,
      });
    form.setFieldsValue({
      bankCode: setting.companyBankDetails?.bankCode,
      accountNumber: setting.companyBankDetails?.accountNumber,
      bankName: setting.companyBankDetails?.bankName,
      isActive: setting.loanConfiguration.isActive,
      schemes: setting.loanConfiguration.schemes,
      templateId: setting.payslipTemplate.templateId,
      timeFrameForManualRepayment: {
        startDay:
          setting.loanConfiguration?.timeFrameForManualRepayment?.startDay,
        endDay: setting.loanConfiguration?.timeFrameForManualRepayment?.endDay,
      },
    });
  }, [form, setting]);

  const handleSubmit = (data: any) => {
    const companyBankDetails = bank
      ? {
          bankCode: data.bankCode,
          accountNumber: data.accountNumber,
          bankName: bank.name,
        }
      : undefined;
    mutate(
      {
        data: {
          companyBankDetails,
          loanConfiguration: {
            isActive: loanActivation,
            schemes: loanActivation ? data?.schemes : undefined,
            timeFrameForManualRepayment: loanActivation
              ? {
                  startDay: data?.timeFrameForManualRepayment?.startDay,
                  endDay: data?.timeFrameForManualRepayment?.endDay,
                }
              : undefined,
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
  const handleBank = (bank?: TPaystackBank & { accountName?: string }) => {
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
            bank={bank}
          />
        </Skeleton>
      </div>
    </>
  );
};

const PayrollSettingContainer: React.FC<{
  Form: typeof Form;
  form: FormInstance<any>;
  handleSubmit: (data: any) => void;
  handleBank: (data?: TPaystackBank) => void;
  loanActivation: boolean;
  handleLoanActivation: (val: boolean) => void;
  bank?: Pick<TPaystackBank, "code" | "name"> & { accountName?: string };
}> = ({
  Form,
  handleSubmit,
  handleBank,
  form,
  handleLoanActivation,
  loanActivation,
  bank,
}) => {
  return (
    <>
      <Form requiredMark={false} onFinish={handleSubmit} form={form}>
        <div className="bg-card px-5 py-7  rounded-md mt-7 grid grid-cols-1 md:grid-cols-2 gap-7 text-accent">
          <div className="flex flex-col gap-4">
            <CompanyBankDetails
              Form={Form}
              handleBank={handleBank}
              bank={bank}
            />
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
