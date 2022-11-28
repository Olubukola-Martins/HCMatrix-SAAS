import { Form, Input, message, Tooltip } from "antd";
import React, { useState } from "react";

export const Finance = () => {
  const [disable, setDisable] = useState(true);
  const enableEdit = () => {
    setDisable(!disable);
    message.success(
      disable ? "Editing enabled Successfully" : "Editing disabled successfully"
    );
  };

  const initialValues = {
    nubianAccountProvider: "",
    nubianAccountNumber: "",
    referenceID: "",
    bankName: "",
    accountNumber: "",
    AccountName: "",
    pensionFundAdministrator: "",
    pensionAccountNumber: "",
  };

  const onsubmit = (values: any) => {};

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
          initialValues={initialValues}
          onFinish={onsubmit}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            <Form.Item
              name="nubianAccountProvider"
              label="Nubian Account Provider"
            >
              <Input className="generalInputStyle" disabled={disable} />
            </Form.Item>
            <Form.Item name="nubianAccountNumber" label="Nubian Account Number">
              <Input className="generalInputStyle" disabled={disable} />
            </Form.Item>
            <Form.Item name="referenceID" label="Reference ID">
              <Input className="generalInputStyle" disabled={disable} />
            </Form.Item>
          </div>
          <div className="border-b border-gray-400 w-full mb-3">
            <h2 className="text-accent text-base pb-1">Bank Details</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            <Form.Item name="bankName" label="Bank Name">
              <Input className="generalInputStyle" disabled={disable} />
            </Form.Item>
            <Form.Item name="accountNumber" label="Account Number">
              <Input className="generalInputStyle" disabled={disable} />
            </Form.Item>
            <Form.Item name="AccountName" label="Account Name">
              <Input className="generalInputStyle" disabled={disable} />
            </Form.Item>
          </div>

          <div className="border-b border-gray-400 w-full mb-3">
            <h2 className="text-accent text-base pb-1">Pension Details</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            <Form.Item
              name="pensionFundAdministrator"
              label="Pension Fund Administrator"
            >
              <Input className="generalInputStyle" disabled={disable} />
            </Form.Item>
            <Form.Item
              name="pensionAccountNumber"
              label="Pension Account Number"
            >
              <Input className="generalInputStyle" disabled={disable} />
            </Form.Item>
          </div>
          {!disable && (
            <div className="flex items-center">
              <button className="button">Save changes</button>
            </div>
          )}
        </Form>
      </div>
    </div>
  );
};
