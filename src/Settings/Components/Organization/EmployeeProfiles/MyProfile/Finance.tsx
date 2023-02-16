import { Form, Input, message, Tooltip } from "antd";
import {
  useCreateEmployeeBank,
  useCreateEmployeePension,
  useCreateEmployeeWallet,
} from "APIRQHooks/Utility/employeeHooks";
import { IAuthDets } from "AppTypes/Auth";
import { TEmployee } from "AppTypes/DataEntitities";
import { GlobalContext } from "Contexts/GlobalContextProvider";
import { textInputValidationRules } from "FormHelpers/validation";
import { openNotification } from "NotificationHelpers";
import React, { useContext, useEffect, useState } from "react";
import { useAuthUser } from "react-auth-kit";
import { useQueryClient } from "react-query";
import { BeatLoader } from "react-spinners";

interface IProps {
  employee?: TEmployee;
}

export const Finance = ({ employee }: IProps) => {
  const [disable, setDisable] = useState(true);
  const enableEdit = () => {
    setDisable(!disable);
    message.success(
      disable ? "Editing enabled Successfully" : "Editing disabled successfully"
    );
  };
  const [walletForm] = Form.useForm();
  const [bankForm] = Form.useForm();
  const [pensionForm] = Form.useForm();
  const queryClient = useQueryClient();

  const auth = useAuthUser();
  const authDetails = auth() as unknown as IAuthDets;
  const token = authDetails.userToken;
  const globalCtx = useContext(GlobalContext);
  const { state: globalState } = globalCtx;
  const companyId = globalState.currentCompany?.id as unknown as string;
  useEffect(() => {
    const finance = employee?.finance;
    if (finance) {
      walletForm.setFieldsValue({
        ...finance.wallet,
      });
      bankForm.setFieldsValue({
        ...finance.bank,
      });
      pensionForm.setFieldsValue({
        ...finance.pension,
      });
    }
  }, [employee, walletForm, bankForm, pensionForm]);
  const { mutate: createWallet, isLoading: walletLoading } =
    useCreateEmployeeWallet();
  const { mutate: createBank, isLoading: bankLoading } =
    useCreateEmployeeBank();
  const { mutate: createPension, isLoading: pensionLoading } =
    useCreateEmployeePension();

  const handleWallet = (data: any) => {
    if (companyId && employee) {
      createWallet(
        {
          accountNumber: data.accountNumber,
          accountProvider: data.accountProvider,
          companyId,
          token,
          employeeId: employee.id,
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
              queryKey: ["single-employee", employee?.id],
              exact: true,
            });
          },
        }
      );
    }
  };
  const handleBank = (data: any) => {
    if (companyId && employee) {
      createBank(
        {
          accountNumber: data.accountNumber,
          bankName: data.bankName,
          bvn: data.bvn,
          companyId,
          token,
          employeeId: employee.id,
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
              queryKey: ["single-employee", employee?.id],
              exact: true,
            });
          },
        }
      );
    }
  };
  const handlePension = (data: any) => {
    if (companyId && employee) {
      createPension(
        {
          accountNumber: data.accountNumber,
          fundAdministrator: data.fundAdministrator,
          pensionType: data.pensionType,
          companyId,
          token,
          employeeId: employee.id,
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
              queryKey: ["single-employee", employee?.id],
              exact: true,
            });
          },
        }
      );
    }
  };

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
        <div className="border-b border-gray-400 w-full mb-3">
          <h2 className="text-accent text-base pb-1">Wallet Details</h2>
        </div>
        <Form
          layout="vertical"
          disabled={disable}
          form={walletForm}
          onFinish={handleWallet}
          requiredMark={false}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            <Form.Item
              name="accountProvider"
              label="Nubian Account Provider"
              rules={textInputValidationRules}
            >
              <Input className="generalInputStyle" />
            </Form.Item>
            <Form.Item
              name="accountNumber"
              label="Nubian Account Number"
              rules={textInputValidationRules}
            >
              <Input className="generalInputStyle" />
            </Form.Item>
          </div>
          {!disable && (
            <div className="flex items-center justify-end">
              <button className="button">
                {walletLoading ? <BeatLoader color="#fff" /> : "Save changes"}
              </button>
            </div>
          )}
        </Form>
        <Form
          layout="vertical"
          disabled={disable}
          form={bankForm}
          onFinish={handleBank}
          requiredMark={false}
        >
          <div className="border-b border-gray-400 w-full mb-3">
            <h2 className="text-accent text-base pb-1">Bank Details</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            <Form.Item
              name="bankName"
              label="Bank Name"
              rules={textInputValidationRules}
            >
              <Input className="generalInputStyle" />
            </Form.Item>
            <Form.Item
              name="accountNumber"
              label="Account Number"
              rules={textInputValidationRules}
            >
              <Input className="generalInputStyle" />
            </Form.Item>
            <Form.Item
              name="bvn"
              label="Bank Verification Number"
              rules={textInputValidationRules}
            >
              <Input className="generalInputStyle" />
            </Form.Item>
          </div>
          {!disable && (
            <div className="flex items-center justify-end">
              <button className="button">
                {bankLoading ? <BeatLoader color="#fff" /> : "Save changes"}
              </button>
            </div>
          )}
        </Form>
        <Form
          layout="vertical"
          disabled={disable}
          form={pensionForm}
          onFinish={handlePension}
          requiredMark={false}
        >
          <div className="border-b border-gray-400 w-full mb-3">
            <h2 className="text-accent text-base pb-1">Pension Details</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            <Form.Item
              name="fundAdministrator"
              label="Pension Fund Administrator"
              rules={textInputValidationRules}
            >
              <Input className="generalInputStyle" />
            </Form.Item>
            <Form.Item
              name="pensionType"
              label="Pension Type"
              rules={textInputValidationRules}
            >
              <Input className="generalInputStyle" />
            </Form.Item>
            <Form.Item
              name="accountNumber"
              label="Pension Account Number"
              rules={textInputValidationRules}
            >
              <Input className="generalInputStyle" />
            </Form.Item>
          </div>
          {!disable && (
            <div className="flex items-center justify-end">
              <button className="button">
                {pensionLoading ? <BeatLoader color="#fff" /> : "Save changes"}
              </button>
            </div>
          )}
        </Form>
      </div>
    </div>
  );
};
