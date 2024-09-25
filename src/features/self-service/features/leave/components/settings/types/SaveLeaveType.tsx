import { Form, Input, InputNumber, Modal, Select } from "antd";
import { AppButton } from "components/button/AppButton";
import React, { useEffect, useState } from "react";
import { IModalProps } from "types";
import {
  generalValidationRules,
  generalValidationRulesOp,
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
import { TCreateLeaveTypeProps } from "../../../hooks/leaveTypes/useCreateLeaveType";
import { LEAVE_TYPE_CATEGORIES } from "../../../types/leaveType";
import { openNotification } from "utils/notifications";

interface IProps extends IModalProps {
  onSubmit: {
    fn: (props: TCreateLeaveTypeProps) => void;
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

  const [usesGroup, setUsesGroup] = useState<boolean>(false);

  useEffect(() => {
    if (!data) return;
    setUsesGroup(data.applicableToCertainGroup);
    form.setFieldsValue({
      name: data.name,
      typeOfLength: data.typeOfLength,
      length: data.length,
      employeesGetAllowance: data.employeesGetAllowance,
      eligibilityCriteria: {
        applicableToCertainGroup: data.applicableToCertainGroup,
        groupId: data.groupId ?? null,
        gender: data.gender ?? null,
        employeeStatus: data.employeeStatus ?? null,
        maritalStatus: data.maritalStatus ?? null,
      },

      requireReliever: data.requireReliever,
    });
    setLeaveLengthType(data.typeOfLength);
  }, [form, data]);
  const [leaveLengthType, setLeaveLengthType] = useState<string>("fixed");
  useEffect(() => {
    form.setFieldValue("length", undefined);
  }, [form, leaveLengthType]);
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
          onFinish={(data) => {
            if (data?.category === "casual" && data?.typeOfLength !== "fixed") {
              openNotification({
                state: "info",
                title: "Warning!",
                description:
                  "A casual leave category must have a fixed type of length and the length set to valid number. Please correct and try again. Thank you!",
              });
              return;
            }
            if (
              (data?.category === "annual" &&
                data?.typeOfLength === "dynamic" &&
                data?.length !== "grade") ||
              (data?.category === "annual" && data?.typeOfLength === "fixed")
            ) {
              openNotification({
                state: "info",
                title: "Warning!",
                description:
                  "An annual leave category must have a dynamic type of length and the length set to grade. Please correct and try again. Thank you!",
              });
              return;
            }
            onSubmit.fn({
              name: data.name,
              typeOfLength: data.typeOfLength,
              length: data.length,
              employeesGetAllowance: data.employeesGetAllowance,
              gender: data.eligibilityCriteria?.gender ?? null,
              maritalStatus: data.eligibilityCriteria?.maritalStatus ?? null,
              employeeStatus: data.eligibilityCriteria?.employeeStatus ?? null,
              groupId: data.eligibilityCriteria?.groupId ?? null,
              applicableToCertainGroup: usesGroup,
              requireReliever: !!data.requireReliever,
              category: data.category,
            });
          }}
          className="grid grid-cols-2 gap-x-4"
          requiredMark={false}
        >
          <Form.Item
            className="col-span-2"
            rules={textInputValidationRules}
            name="name"
            label="Name"
          >
            <Input placeholder="Leave Name" />
          </Form.Item>
          <Form.Item
            className="col-span-2"
            rules={generalValidationRulesOp}
            name="category"
            label="Category"
          >
            <Select
              options={LEAVE_TYPE_CATEGORIES.map((item) => ({
                label: <span className="capitalize">{item}</span>,
                value: item,
              }))}
              placeholder="Leave Category"
            />
          </Form.Item>
          <Form.Item
            className="col-span-1"
            rules={generalValidationRules}
            name="typeOfLength"
            label={
              <AppTooltip
                children={<span>Type of Leave Length</span>}
                tooltipProps={{
                  title:
                    "Specify the type of leave length you want to apply to this leave type, Note: A Dynamic leave length cannot be changed to a fixed one",
                }}
              />
            }
          >
            <Select
              disabled={!!data} //ensures that leaveLengthType cannot be editted
              className="w-full"
              placeholder="type of leave length"
              options={["dynamic", "fixed"].map((item) => ({
                label: <span className="capitalize">{item}</span>,

                value: item,
              }))}
              value={leaveLengthType}
              onChange={(value) => {
                setLeaveLengthType(value);
              }}
            />
          </Form.Item>
          {leaveLengthType === "dynamic" && (
            <Form.Item
              className="col-span-1"
              rules={generalValidationRules}
              name="length"
              label={
                <AppTooltip
                  children={<span>Leave Length</span>}
                  tooltipProps={{
                    title:
                      "This is the number of days based on an employee property",
                  }}
                />
              }
            >
              <Select
                className="w-full"
                placeholder="Employee Attribute"
                options={["spillover", "grade"].map((item) => ({
                  label: <span className="capitalize">{item}</span>,
                  value: item,
                }))}
              />
            </Form.Item>
          )}
          {leaveLengthType === "fixed" && (
            <Form.Item
              className="col-span-1"
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
          )}
          <Form.Item
            className="col-span-2"
            name="requireReliever"
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
            <AppSwitch
              unCheckedChildren="No"
              checkedChildren="Yes"
              defaultChecked={data?.requireReliever}
            />
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
            <AppSwitch unCheckedChildren="No" checkedChildren="Yes" />
          </Form.Item>
          <div className="col-span-2">
            <EligibilityCriteriaInput
              Form={Form}
              usesGroup={usesGroup}
              setUsesGroup={setUsesGroup}
            />
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

const EligibilityCriteriaInput: React.FC<{
  Form: typeof Form;
  usesGroup: boolean;
  setUsesGroup: (value: boolean) => void;
}> = ({ Form, usesGroup, setUsesGroup }) => {
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
            <FormItem name={[`eligibilityCriteria`, "employeeStatus"]}>
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
