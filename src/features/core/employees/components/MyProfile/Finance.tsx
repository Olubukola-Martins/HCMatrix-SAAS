import { Form, Input, message, Tooltip } from "antd";

import React, { useEffect, useState } from "react";
import { useQueryClient } from "react-query";
import { textInputValidationRules } from "utils/formHelpers/validation";
import { openNotification } from "utils/notifications";

import {
  TBankValue,
  TPensionValue,
  TSingleEmployee,
  TWalletValue,
} from "../../types";
import { useSaveEmployeeFinance } from "../../hooks/finance/useSaveEmployeeFinance";
import { AppButton } from "components/button/AppButton";
import { QUERY_KEY_FOR_SINGLE_EMPLOYEE } from "../../hooks/useFetchSingleEmployee";
import { FormBankInput } from "components/generalFormInputs/FormBankInput";
import { TPaystackBank } from "types/paystackBank";
import { FormPensionAdminInput } from "features/payroll/components/organizations/pensionAdministrators/FormPensionAdminInput";
import { FormITFAuthInput } from "features/payroll/components/organizations/itfAuthorities/FormITFAuthInput";
import { FormTaxAuthInput } from "features/payroll/components/organizations/taxAuthorities/FormTaxAuthInput";
import { FormNSITFAuthInput } from "features/payroll/components/organizations/nsitfAuthorities/FormNSITFAuthInput";

interface IProps {
  finance?: TSingleEmployee["finance"];
  employeeId?: number;
  onFinishAction?: () => void;
}

export const Finance = ({ finance = [], employeeId }: IProps) => {
  const [disable, setDisable] = useState(true);
  const enableEdit = () => {
    setDisable(!disable);
    message.success(
      disable ? "Editing enabled Successfully" : "Editing disabled successfully"
    );
  };

  const walletValue = finance.find((item) => item.key === "wallet")?.value as
    | TWalletValue
    | undefined;
  const pensionValue = finance.find((item) => item.key === "pension")?.value as
    | TPensionValue
    | undefined;
  const bankValue = finance.find((item) => item.key === "bank")?.value as
    | TBankValue
    | undefined;
  return (
    <div className="bg-mainBg shadow-sm rounded-md p-4 mt-5">
      <div className="flex justify-between mb-3">
        <h2 className="font-medium text-lg">Finance</h2>
        <Tooltip title={disable ? "Enable editing" : "Disable editing"}>
          <i
            className={
              disable
                ? `ri-pencil-line cursor-pointer hover:text-caramel text-xl`
                : `ri-lock-line cursor-pointer hover:text-caramel text-xl`
            }
            onClick={enableEdit}
          ></i>
        </Tooltip>
      </div>
      <div className="bg-card p-3 rounded">
        <WalletDetailsForm
          employeeId={employeeId}
          disabled={disable}
          value={walletValue}
        />

        <BankDetailsForm
          employeeId={employeeId}
          disabled={disable}
          value={bankValue}
        />
        <PensionDetailsForm
          employeeId={employeeId}
          disabled={disable}
          value={pensionValue}
        />
        <TaxDetailsForm
          employeeId={employeeId}
          disabled={disable}
          value={bankValue}
        />
        <NSITFDetailsForm
          employeeId={employeeId}
          disabled={disable}
          value={bankValue}
        />
        <ITFDetailsForm
          employeeId={employeeId}
          disabled={disable}
          value={bankValue}
        />
      </div>
    </div>
  );
};

const WalletDetailsForm: React.FC<{
  employeeId?: number;
  disabled?: boolean;
  value?: TWalletValue;
}> = ({ employeeId, disabled = false, value }) => {
  const [form] = Form.useForm();
  const queryClient = useQueryClient();
  const { mutate, isLoading } = useSaveEmployeeFinance();

  const handleFinish = (data: any) => {
    if (employeeId) {
      mutate(
        {
          employeeId,
          data: {
            key: "wallet",
            value: {
              accountNumber: data.accountNumber,
              accountProvider: data.accountProvider,
            },
          },
        },
        {
          onError: (err: any) => {
            openNotification({
              state: "error",
              title: "Error Occured",
              description:
                err?.response.data.message ?? err?.response.data.error.message,
            });
          },
          onSuccess: (res: any) => {
            openNotification({
              state: "success",

              title: "Success",
              description: res?.data?.message,
            });
            queryClient.invalidateQueries({
              queryKey: [QUERY_KEY_FOR_SINGLE_EMPLOYEE],
              exact: true,
            });
          },
        }
      );
    }
  };
  useEffect(() => {
    if (value) {
      form.setFieldsValue({
        accountNumber: value.accountNumber,
        accountProvider: value.accountProvider,
      });
    }
  }, [form, value]);
  return (
    <Form
      layout="vertical"
      disabled={disabled}
      form={form}
      onFinish={handleFinish}
      requiredMark={false}
    >
      <div className="border-b border-gray-400 w-full mb-3">
        <h2 className="text-accent text-base pb-1">Wallet Details</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        <Form.Item
          name="accountNumber"
          label="Account Number"
          rules={textInputValidationRules}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="accountProvider"
          label="Account Provider"
          rules={textInputValidationRules}
        >
          <Input />
        </Form.Item>
      </div>

      <div className="flex items-center justify-end">
        <AppButton label="Save Changes" type="submit" isLoading={isLoading} />
      </div>
    </Form>
  );
};
const PensionDetailsForm: React.FC<{
  employeeId?: number;
  disabled?: boolean;
  value?: TPensionValue;
}> = ({ employeeId, disabled = false, value }) => {
  const [form] = Form.useForm();
  const queryClient = useQueryClient();
  const { mutate, isLoading } = useSaveEmployeeFinance();

  const handleFinish = (data: any) => {
    if (employeeId) {
      mutate(
        {
          employeeId,
          data: {
            key: "pension",
            value: {
              pensionType: data?.pensionType,
              accountNumber: data?.accountNumber,
              fundAdministrator: data?.fundAdministrator,
            },
          },
        },
        {
          onError: (err: any) => {
            openNotification({
              state: "error",
              title: "Error Occured",
              description:
                err?.response.data.message ?? err?.response.data.error.message,
            });
          },
          onSuccess: (res: any) => {
            openNotification({
              state: "success",

              title: "Success",
              description: res?.data?.message,
            });
            queryClient.invalidateQueries({
              queryKey: [QUERY_KEY_FOR_SINGLE_EMPLOYEE],
              exact: true,
            });
          },
        }
      );
    }
  };
  useEffect(() => {
    if (value) {
      form.setFieldsValue({
        pensionType: value?.pensionType,
        accountNumber: value?.accountNumber,
        fundAdministrator: value?.fundAdministrator,
      });
    }
  }, [form, value]);
  return (
    <Form
      layout="vertical"
      disabled={disabled}
      form={form}
      onFinish={handleFinish}
      requiredMark={false}
    >
      <div className="border-b border-gray-400 w-full mb-3">
        <h2 className="text-accent text-base pb-1">Pension Information</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        <Form.Item
          name="employeePensionId"
          label="Employee Pension ID"
          rules={textInputValidationRules}
        >
          <Input />
        </Form.Item>
        <FormPensionAdminInput
          Form={Form}
          control={{ label: "Fund Administrator", name: "pensionAuthId" }}
        />
        <Form.Item
          name="pensionType"
          label="Pension Type"
          rules={textInputValidationRules}
        >
          <Input placeholder="Not sure y" />
        </Form.Item>
      </div>

      <div className="flex items-center justify-end">
        <AppButton label="Save Changes" type="submit" isLoading={isLoading} />
      </div>
    </Form>
  );
};
const BankDetailsForm: React.FC<{
  employeeId?: number;
  disabled?: boolean;
  value?: TBankValue;
}> = ({ employeeId, disabled = false, value }) => {
  const [form] = Form.useForm();
  const queryClient = useQueryClient();
  const { mutate, isLoading } = useSaveEmployeeFinance();
  const [selectedBank, setSetlectedBank] = useState<TPaystackBank>();

  const handleFinish = (data: any) => {
    if (employeeId && selectedBank) {
      mutate(
        {
          employeeId,
          data: {
            key: "bank",
            value: {
              bvn: data.bvn,
              bankName: selectedBank.name,
              accountNumber: data?.accountNumber,
              bankCode: data.bankcode ?? selectedBank.code,
            },
          },
        },
        {
          onError: (err: any) => {
            openNotification({
              state: "error",
              title: "Error Occured",
              description:
                err?.response.data.message ?? err?.response.data.error.message,
            });
          },
          onSuccess: (res: any) => {
            openNotification({
              state: "success",

              title: "Success",
              description: res?.data?.message,
            });
            queryClient.invalidateQueries({
              queryKey: [QUERY_KEY_FOR_SINGLE_EMPLOYEE],
              exact: true,
            });
          },
        }
      );
    }
  };
  useEffect(() => {
    if (value) {
      form.setFieldsValue({
        bvn: value.bvn,
        bankName: value.bankName,
        accountNumber: value?.accountNumber,
      });
    }
  }, [form, value]);
  return (
    <Form
      layout="vertical"
      disabled={disabled}
      form={form}
      onFinish={handleFinish}
      requiredMark={false}
    >
      <div className="border-b border-gray-400 w-full mb-3">
        <h2 className="text-accent text-base pb-1">Bank Information</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        <Form.Item
          name="bvn"
          label="Bank Verification Number"
          rules={textInputValidationRules}
        >
          <Input />
        </Form.Item>
        <FormBankInput
          Form={Form}
          control={{ label: "Bank", name: "bankCode" }}
          handleSelect={(_, bank) => setSetlectedBank(bank)}
        />
        <Form.Item
          name="accountNumber"
          label="Account Number"
          rules={textInputValidationRules}
        >
          <Input />
        </Form.Item>
      </div>

      <div className="flex items-center justify-end">
        <AppButton label="Save Changes" type="submit" isLoading={isLoading} />
      </div>
    </Form>
  );
};
const ITFDetailsForm: React.FC<{
  employeeId?: number;
  disabled?: boolean;
  value?: TBankValue;
}> = ({ employeeId, disabled = false, value }) => {
  const [form] = Form.useForm();
  const queryClient = useQueryClient();
  const { mutate, isLoading } = useSaveEmployeeFinance();

  const handleFinish = (data: any) => {
    if (employeeId) {
      mutate(
        {
          employeeId,
          data: {
            key: "bank",
            value: {
              bvn: data.bvn,
              bankName: data.bankName,
              accountNumber: data?.accountNumber,
            },
          },
        },
        {
          onError: (err: any) => {
            openNotification({
              state: "error",
              title: "Error Occured",
              description:
                err?.response.data.message ?? err?.response.data.error.message,
            });
          },
          onSuccess: (res: any) => {
            openNotification({
              state: "success",

              title: "Success",
              description: res?.data?.message,
            });
            queryClient.invalidateQueries({
              queryKey: [QUERY_KEY_FOR_SINGLE_EMPLOYEE],
              exact: true,
            });
          },
        }
      );
    }
  };
  useEffect(() => {
    if (value) {
      form.setFieldsValue({
        bvn: value.bvn,
        bankName: value.bankName,
        accountNumber: value?.accountNumber,
      });
    }
  }, [form, value]);
  return (
    <Form
      layout="vertical"
      disabled={disabled}
      form={form}
      onFinish={handleFinish}
      requiredMark={false}
    >
      <div className="border-b border-gray-400 w-full mb-3">
        <h2 className="text-accent text-base pb-1">ITF Information</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        <Form.Item
          name="employeeITFId"
          label="Employee ITF ID"
          rules={textInputValidationRules}
        >
          <Input />
        </Form.Item>
        <FormITFAuthInput
          Form={Form}
          control={{ label: "ITF Authority", name: "itfAuthId" }}
        />
      </div>

      <div className="flex items-center justify-end">
        <AppButton label="Save Changes" type="submit" isLoading={isLoading} />
      </div>
    </Form>
  );
};
const NSITFDetailsForm: React.FC<{
  employeeId?: number;
  disabled?: boolean;
  value?: TBankValue;
}> = ({ employeeId, disabled = false, value }) => {
  const [form] = Form.useForm();
  const queryClient = useQueryClient();
  const { mutate, isLoading } = useSaveEmployeeFinance();

  const handleFinish = (data: any) => {
    if (employeeId) {
      mutate(
        {
          employeeId,
          data: {
            key: "bank",
            value: {
              bvn: data.bvn,
              bankName: data.bankName,
              accountNumber: data?.accountNumber,
            },
          },
        },
        {
          onError: (err: any) => {
            openNotification({
              state: "error",
              title: "Error Occured",
              description:
                err?.response.data.message ?? err?.response.data.error.message,
            });
          },
          onSuccess: (res: any) => {
            openNotification({
              state: "success",

              title: "Success",
              description: res?.data?.message,
            });
            queryClient.invalidateQueries({
              queryKey: [QUERY_KEY_FOR_SINGLE_EMPLOYEE],
              exact: true,
            });
          },
        }
      );
    }
  };
  useEffect(() => {
    if (value) {
      form.setFieldsValue({
        bvn: value.bvn,
        bankName: value.bankName,
        accountNumber: value?.accountNumber,
      });
    }
  }, [form, value]);
  return (
    <Form
      layout="vertical"
      disabled={disabled}
      form={form}
      onFinish={handleFinish}
      requiredMark={false}
    >
      <div className="border-b border-gray-400 w-full mb-3">
        <h2 className="text-accent text-base pb-1">NSITF Information</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        <Form.Item
          name="employeeNSITFId"
          label="Employee NSITF ID"
          rules={textInputValidationRules}
        >
          <Input />
        </Form.Item>
        <FormNSITFAuthInput
          Form={Form}
          control={{ label: "NSITF Authority", name: "nsitfAuthId" }}
        />
      </div>

      <div className="flex items-center justify-end">
        <AppButton label="Save Changes" type="submit" isLoading={isLoading} />
      </div>
    </Form>
  );
};
const TaxDetailsForm: React.FC<{
  employeeId?: number;
  disabled?: boolean;
  value?: TBankValue;
}> = ({ employeeId, disabled = false, value }) => {
  const [form] = Form.useForm();
  const queryClient = useQueryClient();
  const { mutate, isLoading } = useSaveEmployeeFinance();

  const handleFinish = (data: any) => {
    if (employeeId) {
      mutate(
        {
          employeeId,
          data: {
            key: "bank",
            value: {
              bvn: data.bvn,
              bankName: data.bankName,
              accountNumber: data?.accountNumber,
            },
          },
        },
        {
          onError: (err: any) => {
            openNotification({
              state: "error",
              title: "Error Occured",
              description:
                err?.response.data.message ?? err?.response.data.error.message,
            });
          },
          onSuccess: (res: any) => {
            openNotification({
              state: "success",

              title: "Success",
              description: res?.data?.message,
            });
            queryClient.invalidateQueries({
              queryKey: [QUERY_KEY_FOR_SINGLE_EMPLOYEE],
              exact: true,
            });
          },
        }
      );
    }
  };
  useEffect(() => {
    if (value) {
      form.setFieldsValue({
        bvn: value.bvn,
        bankName: value.bankName,
        accountNumber: value?.accountNumber,
      });
    }
  }, [form, value]);
  return (
    <Form
      layout="vertical"
      disabled={disabled}
      form={form}
      onFinish={handleFinish}
      requiredMark={false}
    >
      <div className="border-b border-gray-400 w-full mb-3">
        <h2 className="text-accent text-base pb-1">Tax Information</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        <Form.Item
          name="employeeTaxId"
          label="Employee Tax ID"
          rules={textInputValidationRules}
        >
          <Input />
        </Form.Item>
        <FormTaxAuthInput
          Form={Form}
          control={{ label: "Tax Authority", name: "taxAuthId" }}
        />
      </div>

      <div className="flex items-center justify-end">
        <AppButton label="Save Changes" type="submit" isLoading={isLoading} />
      </div>
    </Form>
  );
};
