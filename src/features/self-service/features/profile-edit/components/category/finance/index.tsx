import { Input, Form } from "antd";
import { AppButton } from "components/button/AppButton";
import { FormBankInput } from "components/generalFormInputs/FormBankInput";
import { useSaveEmployeeFinance } from "features/core/employees/hooks/finance/useSaveEmployeeFinance";
import { QUERY_KEY_FOR_SINGLE_EMPLOYEE } from "features/core/employees/hooks/useFetchSingleEmployee";
import { TBankValue, TPensionValue } from "features/core/employees/types";
import { TITFValue, TNSITFValue, TTaxValue } from "features/core/employees/types/singleEmployee";
import { FormITFAuthInput } from "features/payroll/components/organizations/itfAuthorities/FormITFAuthInput";
import { FormNSITFAuthInput } from "features/payroll/components/organizations/nsitfAuthorities/FormNSITFAuthInput";
import { FormPensionAdminInput } from "features/payroll/components/organizations/pensionAdministrators/FormPensionAdminInput";
import { FormTaxAuthInput } from "features/payroll/components/organizations/taxAuthorities/FormTaxAuthInput";
import { useState, useEffect } from "react";
import { useQueryClient } from "react-query";
import { TPaystackBank } from "types/paystackBank";
import { textInputValidationRules } from "utils/formHelpers/validation";
import { openNotification } from "utils/notifications";

export const EditBankDetailsRequest: React.FC<{
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
              bankCode: data.bankcode ?? selectedBank?.code,
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
        accountName: value?.accountName,
        bankCode: value?.bankCode,
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
      <div
        className={`grid grid-cols-1 md:grid-cols-2 ${
          value?.accountName ? "lg:grid-cols-4" : "lg:grid-cols-3"
        } gap-5`}
      >
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
        {value?.accountName && (
          <Form.Item name="accountName" label="Account Name">
            <Input disabled />
          </Form.Item>
        )}
      </div>

      <div className="flex items-center justify-end">
        <AppButton label="Save Changes" type="submit" isLoading={isLoading} />
      </div>
    </Form>
  );
};
export const EditITFDetailsRequest: React.FC<{
  employeeId?: number;
  disabled?: boolean;
  value?: TITFValue;
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
            key: "itf",
            value: {
              itfAuthorityId: data.itfAuthorityId,
              employeeItfId: data.employeeItfId,
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
        itfAuthorityId: value.itfAuthorityId,
        employeeItfId: value.employeeItfId,
        itfAuthorityName: value?.itfAuthorityName,
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
          name="employeeItfId"
          label="Employee ITF ID"
          rules={textInputValidationRules}
        >
          <Input placeholder="ITF ID" />
        </Form.Item>
        <FormITFAuthInput
          Form={Form}
          control={{ label: "ITF Authority", name: "itfAuthorityId" }}
        />
      </div>

      <div className="flex items-center justify-end">
        <AppButton label="Save Changes" type="submit" isLoading={isLoading} />
      </div>
    </Form>
  );
};
export const EditNSITFDetailsRequest: React.FC<{
  employeeId?: number;
  disabled?: boolean;
  value?: TNSITFValue;
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
            key: "nsitf",
            value: {
              nsitfAuthorityId: data.nsitfAuthorityId,
              employeeNsitfId: data.employeeNsitfId,
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
        nsitfAuthorityId: value.nsitfAuthorityId,
        employeeNsitfId: value.employeeNsitfId,
        nsitfAuthorityName: value?.nsitfAuthorityName,
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
          name="employeeNsitfId"
          label="Employee NSITF ID"
          rules={textInputValidationRules}
        >
          <Input placeholder="NSITF ID" />
        </Form.Item>
        <FormNSITFAuthInput
          Form={Form}
          control={{ label: "NSITF Authority", name: "nsitfAuthorityId" }}
        />
      </div>

      <div className="flex items-center justify-end">
        <AppButton label="Save Changes" type="submit" isLoading={isLoading} />
      </div>
    </Form>
  );
};
export const EditTaxDetailsRequest: React.FC<{
  employeeId?: number;
  disabled?: boolean;
  value?: TTaxValue;
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
            key: "tax",
            value: {
              taxAuthorityId: data.taxAuthorityId,
              employeeTaxId: data.employeeTaxId,
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
        taxAuthorityId: value.taxAuthorityId,
        employeeTaxId: value.employeeTaxId,
        taxAuthorityName: value.taxAuthorityName,
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
          <Input placeholder="Tax ID" />
        </Form.Item>
        <FormTaxAuthInput
          Form={Form}
          control={{ label: "Tax Authority", name: "taxAuthorityId" }}
        />
      </div>

      <div className="flex items-center justify-end">
        <AppButton label="Save Changes" type="submit" isLoading={isLoading} />
      </div>
    </Form>
  );
};

export const EditPensionDetailsRequest: React.FC<{
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
              employeePensionId: data?.employeePensionId,
              pensionAdministratorId: data?.pensionAdministratorId,
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
        employeePensionId: value?.employeePensionId,
        pensionAdministratorId: value?.pensionAdministratorId,
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
          <Input placeholder="Pension ID" />
        </Form.Item>
        <FormPensionAdminInput
          Form={Form}
          control={{
            label: "Fund Administrator",
            name: "pensionAdministratorId",
          }}
        />
        <Form.Item
          name="pensionType"
          label="Pension Type"
          rules={textInputValidationRules}
        >
          <Input placeholder="Pension Type" />
        </Form.Item>
      </div>

      <div className="flex items-center justify-end">
        <AppButton label="Save Changes" type="submit" isLoading={isLoading} />
      </div>
    </Form>
  );
};
