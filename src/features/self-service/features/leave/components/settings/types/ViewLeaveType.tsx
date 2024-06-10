import { Form, Input, InputNumber, Modal, Select } from "antd";
import React, { useEffect, useState } from "react";
import { IModalProps } from "types";
import {
  numberHasToBeAWholeNumberRule,
  textInputValidationRules,
} from "utils/formHelpers/validation";
import { TLeaveType } from "../../../types";
import AppTooltip from "components/tooltip/AppTooltip";
import Themes from "components/Themes";
import AppSwitch from "components/switch/AppSwitch";
import FormItem from "antd/es/form/FormItem";
import { GENDERS, MARITAL_STATUSES } from "constants/general";
import { EMPLOYEE_STATUSES_OPTIONS } from "features/core/employees/constants";
import { truncateString } from "utils/dataHelpers/truncateString";
import { FormGroupInput } from "features/core/groups/components/FormGroupInput";

interface IProps extends IModalProps {
  data?: TLeaveType;
}

export const ViewLeaveType: React.FC<IProps> = ({
  open,
  handleClose,
  data,
}) => {
  const [form] = Form.useForm();
  useEffect(() => {
    if (!data) return;
    form.setFieldsValue({
      name: data.name,
      length: data.length,
      employeesGetAllowance: data.employeesGetAllowance,
      eligibilityCriteria: {
        applicableToCertainGroup: data.applicableToCertainGroup,
        groupId: data.groupId,
        gender: data.gender,
        employeeStatus: data.employeeStatus,
        maritalStatus: data.maritalStatus,
      },

      requireReliever: data.requireReliever,
    });
  }, [form, data]);

  return (
    <Themes>
      <Modal
        open={open}
        onCancel={() => handleClose()}
        footer={null}
        title={<span>{"View Leave Type"}</span>}
        style={{ top: 20 }}
      >
        <Form
          layout="vertical"
          form={form}
          className="grid grid-cols-2 gap-x-4"
          requiredMark={false}
          disabled
        >
          <Form.Item rules={textInputValidationRules} name="name" label="Name">
            <Input placeholder="Leave Name" />
          </Form.Item>
          <Form.Item
            rules={[numberHasToBeAWholeNumberRule]}
            name="length"
            label={
              <AppTooltip
                children={<span>Leave Length</span>}
                tooltipProps={{
                  title:
                    "This is the number of days you can take leave in a leave cycle",
                }}
              />
            }
          >
            <InputNumber className="w-full" placeholder="Leave Length" />
          </Form.Item>
          <Form.Item
            className="col-span-2"
            name="employeesGetAllowance"
            label={
              <AppTooltip
                children={
                  <span>
                    Should employees applying for this leave be paid while on
                    leave?
                  </span>
                }
                tooltipProps={{
                  title:
                    "This is an indication of whether the employee will receive pay while on leave",
                }}
              />
            }
          >
            <AppSwitch
              unCheckedChildren="No"
              checkedChildren="Yes"
              checked={data?.employeesGetAllowance}
            />
          </Form.Item>
          <Form.Item
            className="col-span-2"
            name="requiresLeaveReliever"
            label={
              <AppTooltip
                children={
                  <span>
                    Does this leave type require the employee to select a
                    reliever?
                  </span>
                }
                tooltipProps={{
                  title:
                    "This is an indication of whether the employee will be required to select a reliever when applying for this leave type",
                }}
              />
            }
          >
            <AppSwitch unCheckedChildren="No" checkedChildren="Yes" />
          </Form.Item>
          <div className="col-span-2">
            <EligibilityCriteriaInput Form={Form} type={data} />
          </div>
        </Form>
      </Modal>
    </Themes>
  );
};

const EligibilityCriteriaInput: React.FC<{
  Form: typeof Form;
  type?: TLeaveType;
}> = ({ Form, type }) => {
  const [usesGroup, setUsesGroup] = useState<boolean>(false);
  useEffect(() => {
    if (!type) return;
    setUsesGroup(type.applicableToCertainGroup);
  }, [type]);
  return (
    <Form.Item
      name={`eligibilityCriteria`}
      label={
        <span className="font-semibold underline text-slate-400 underline-offset-2">
          Leave Eligibility Criteria
        </span>
      }
    >
      <Input.Group className="grid grid-cols-3 gap-x-4">
        <Form.Item
          className="col-span-3"
          label="Is this leave type to be applicable to a certain group?"
          name={[`eligibilityCriteria`, "usesGroup"]}
        >
          <AppSwitch
            unCheckedChildren="No"
            checkedChildren="Yes"
            checked={usesGroup}
            onChange={setUsesGroup}
          />
        </Form.Item>
        {usesGroup && (
          <div className="col-span-3">
            <FormGroupInput
              Form={Form}
              control={{
                label: "",
                name: [`eligibilityCriteria`, "groupId"],
              }}
            />
          </div>
        )}
        {!usesGroup && (
          <>
            <FormItem name={[`eligibilityCriteria`, "gender"]} label="Gender">
              <Select
                options={GENDERS}
                placeholder="Select gender"
                allowClear
              />
            </FormItem>
            <FormItem
              name={[`eligibilityCriteria`, "maritalStatus"]}
              label="Marital Status"
            >
              <Select
                options={MARITAL_STATUSES}
                placeholder="Select marital status"
                allowClear
              />
            </FormItem>
            <FormItem
              name={[`eligibilityCriteria`, "employeeStatus"]}
              label={truncateString("Employment Status", 10)}
            >
              <Select
                allowClear
                options={EMPLOYEE_STATUSES_OPTIONS.filter((item) =>
                  ["probation", "confirmed"].includes(item.value)
                ).map((item) => ({
                  ...item,
                  label: <span className="capitalize">{item.label}</span>,
                }))}
                placeholder="Select status"
              />
            </FormItem>
          </>
        )}
      </Input.Group>
    </Form.Item>
  );
};
