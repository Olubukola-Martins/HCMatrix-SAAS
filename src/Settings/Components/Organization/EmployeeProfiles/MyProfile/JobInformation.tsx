import { DatePicker, Form, Input, message, Select, Tooltip } from "antd";
import moment from "moment";
import React, { useState } from "react";
const { Option } = Select;

const branchList = ["Branch 1", "Branch 2", "Branch 3"];
export const JobInformation = () => {
  const [disable, setDisable] = useState(true);
  const enableEdit = () => {
    setDisable(!disable);
    message.success(
      disable ? "Editing enabled Successfully" : "Editing disabled successfully"
    );
  };

  const initialValues = {
    employeeNumber: "",
    hireDate: moment("2020-06-09T12:40:14+0000"),
    branch: "",
    resumptionDate: moment("2020-06-09T12:40:14+0000"),
    employmentType: "",
    probationEndDate: moment("2020-06-09T12:40:14+0000"),
    workModel: "",
    confirmationDate: moment("2020-06-09T12:40:14+0000"),
  };

  const onsubmit = (values: any) => {};

  return (
    <div className="bg-mainBg shadow-sm rounded-md p-4 mt-5">
      <div className="flex justify-between mb-3">
        <h2 className="font-medium text-lg">Job Information</h2>
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
        <Form
          layout="vertical"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
          initialValues={initialValues}
          onFinish={onsubmit}
        >
          <Form.Item name="employeeNumber" label="Employee Number">
            <Input className="generalInputStyle" disabled={disable} />
          </Form.Item>
          <Form.Item name="hireDate" label="Hire Date">
            <DatePicker
              format="YYYY/MM/DD"
              className="generalInputStyle"
              disabled={disable}
            />
          </Form.Item>
          <Form.Item name="branch" label="Branch">
            <Select
              showSearch
              allowClear
              optionLabelProp="label"
              className="SelectTag w-full"
              size="large"
              disabled={disable}
              placeholder="Select Nationality"
            >
              {branchList.map((data) => (
                <Option key={data} value={data} label={data}>
                  {data}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item name="resumptionDate" label="Resumption Date">
            <DatePicker
              format="YYYY/MM/DD"
              className="generalInputStyle"
              disabled={disable}
            />
          </Form.Item>
          <Form.Item name="employmentType" label="Employment Type">
            <Select
              className="SelectTag w-full"
              size="large"
              disabled={disable}
              placeholder="Select"
            >
              <Option value="fullTime">Full time</Option>
              <Option value="partTime">Part time</Option>
              <Option value="contract">Contract</Option>
            </Select>
          </Form.Item>
          <Form.Item name="probationEndDate" label="Probation End Date">
            <DatePicker
              format="YYYY/MM/DD"
              className="generalInputStyle"
              disabled={disable}
            />
          </Form.Item>
          <Form.Item name="workModel" label="Work Model">
            <Select
              className="SelectTag w-full"
              size="large"
              disabled={disable}
              placeholder="Select"
            >
              <Option value="on-site">On Site</Option>
              <Option value="fullRemote">Full Remote</Option>
              <Option value="hybrid">Hybrid</Option>
            </Select>
          </Form.Item>
          <Form.Item name="confirmationDate" label="Confirmation Date">
            <DatePicker
              format="YYYY/MM/DD"
              className="generalInputStyle"
              disabled={disable}
            />
          </Form.Item>
          <Form.Item name="grade" label="Grade">
            <Select
              className="SelectTag w-full"
              size="large"
              disabled={disable}
              placeholder="Select"
            >
              <Option value="grade 1">Grade 1</Option>
              <Option value="grade 2">Grade 2</Option>
              <Option value="grade 2">Grade 2</Option>
            </Select>
          </Form.Item>
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
