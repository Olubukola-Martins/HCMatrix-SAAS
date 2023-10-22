import { Form, Input, InputNumber, Modal, Select } from "antd";
import { AppButton } from "components/button/AppButton";
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
import { FormGroupInput } from "features/core/groups/components/FormGroupInput";
import FormItem from "antd/es/form/FormItem";
import { GENDERS, MARITAL_STATUSES } from "constants/general";
import { EMPLOYEE_STATUSES_OPTIONS } from "features/core/employees/constants";

interface IProps extends IModalProps {
  onSubmit: {
    fn: (
      props: Pick<
        TLeaveType,
        | "name"
        | "length"
        | "calculation"
        | "employeesGetAllowance"
        | "gender"
        | "percentageAmount"
      >
    ) => void;
    isLoading?: boolean;
    isSuccess?: boolean;
  };
  data?: TLeaveType;
  action: "add" | "edit";
}

export const SaveLeaveType: React.FC<IProps> = ({
  open,
  handleClose,
  onSubmit,
  data,
  action,
}) => {
  const [form] = Form.useForm();
  useEffect(() => {
    if (!data) return;
    form.setFieldsValue({
      name: data.name,
      //   TODO: Populate when Backend updates endpoint
    });
  }, [form, data]);

  // close modal if onSubmit is success
  useEffect(() => {
    if (!onSubmit.isSuccess) return;
    handleClose();
  }, [form, onSubmit.isSuccess, handleClose]);

  return (
    <Themes>
      <Modal
        open={open}
        onCancel={() => handleClose()}
        footer={null}
        title={
          <span>
            {action === "add" && "Add Leave Type"}
            {action === "edit" && "Edit Leave Type"}
          </span>
        }
        style={{ top: 20 }}
      >
        <Form
          layout="vertical"
          form={form}
          onFinish={(data) =>
            onSubmit.fn({
              name: data.name,
              length: data.length,
              calculation: data.calculation,
              employeesGetAllowance: data.employeesGetAllowance,
              gender: data.gender,
              percentageAmount: data.percentageAmount,
            })
          }
          className="grid grid-cols-2 gap-x-4"
          requiredMark={false}
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
                    "This is an indication of wether the employee will receive pay while on leave",
                }}
              />
            }
          >
            <AppSwitch unCheckedChildren="No" checkedChildren="Yes" />
          </Form.Item>
          <div className="col-span-2">
            <EligibilityCriteriaInput Form={Form} />
          </div>

          <div className="col-span-2 flex justify-end">
            <AppButton
              type="submit"
              label="Save"
              isLoading={onSubmit.isLoading}
            />
          </div>
        </Form>
      </Modal>
    </Themes>
  );
};

const EligibilityCriteriaInput: React.FC<{ Form: typeof Form }> = ({
  Form,
}) => {
  const [usesGroup, setUsesGroup] = useState<boolean>(false);
  return (
    <Form.Item
      name={`eligibilityCriteria`}
      label={
        <AppTooltip
          children={
            <span className="underline text-gray-300 underline-offset-2">
              Define Leave Eligibility Criteria
            </span>
          }
          tooltipProps={{
            title:
              "This section enables you to define the employees eligible to apply for this leave, this could be the a certain group or employees matching a gender, marital status or employment status. Note that if no option is selected for a particular criteria the leave type will apply to every employee in that criteria.",
          }}
        />
      }
    >
      <Input.Group className="grid grid-cols-3 gap-x-4">
        <Form.Item
          className="col-span-3"
          label="Would you like this leave type to be applicable to a certain group?"
          name={[`eligibilityCriteria`, "usesGroup"]}
        >
          <AppSwitch
            unCheckedChildren="No"
            checkedChildren="Yes"
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
            <FormItem name={[`eligibilityCriteria`, "gender"]}>
              <Select
                options={GENDERS}
                placeholder="Select gender"
                allowClear
              />
            </FormItem>
            <FormItem name={[`eligibilityCriteria`, "maritalStatus"]}>
              <Select
                options={MARITAL_STATUSES}
                placeholder="Select marital status"
                allowClear
              />
            </FormItem>
            <FormItem name={[`eligibilityCriteria`, "employmentStatus"]}>
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
