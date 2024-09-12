import { Collapse, Form, Input, Radio, Dropdown } from "antd";
import { PageIntro } from "components/layout/PageIntro";
import { appRoutes } from "config/router/paths";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  emailValidationRules,
  textInputValidationRules,
  textInputValidationRulesOp,
} from "utils/formHelpers/validation";
import { openNotification } from "utils/notifications";
import { useCreateEmployee } from "../hooks/useCreateEmployee";
import { JobInformationFormItems } from "../components/MyProfile/JobInformation";
import {
  TEssentialPayrollType,
  TPayrollFrequency,
} from "features/payroll/types/payroll";
import { DEFAULT_DATE_FORMAT } from "constants/dateFormats";
import { FormRoleInput } from "features/core/roles-and-permissions/components/FormRoleInput";
import { FormDesignationInput } from "features/core/designations/components/FormDesignationInput";
import { BeatLoader } from "react-spinners";
import AppTooltip from "components/tooltip/AppTooltip";

const { Panel } = Collapse;

type TNextAction = "onboarding" | "complete-profile" | "add-another";

export const AddEmployee = () => {
  const [nextAction, setNextAction] = useState<TNextAction>();

  const [form] = Form.useForm();
  const { mutate, isLoading } = useCreateEmployee();

  const navigate = useNavigate();

  const handleNextAction = (successData: {
    employeeId: number;
    onboardingId: number;
  }) => {
    switch (nextAction) {
      case "complete-profile":
        navigate(appRoutes.singleEmployee(successData.employeeId).path);

        break;
      case "add-another":
        form.resetFields();

        break;
      case "onboarding":
        navigate(appRoutes.startOnBoarding(successData.onboardingId).path);

        break;

      default:
        break;
    }
  };
  const handleCurrentAction = (action: TNextAction) => {
    setNextAction(action);
    form.submit();
  };

  const handleSubmit = (data: any) => {
    mutate(
      {
        designationId: data.designationId,
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
        licenseType: data.licenseType,
        roleId: data.roleId,
        empUid: data.empUid,
        jobInformation: {
          startDate: data.startDate.format(DEFAULT_DATE_FORMAT),
          monthlyGross: data.monthlyGross,
          employmentType: data.employmentType,
          workModel: data.workModel,
          numberOfDaysPerWeek: data.numberOfDaysPerWeek,
          hireDate: data.hireDate.format(DEFAULT_DATE_FORMAT),
          probationEndDate: data.probationEndDate.format(DEFAULT_DATE_FORMAT),
          confirmationDate: data.confirmationDate.format(DEFAULT_DATE_FORMAT),
          lineManagerId: data.lineManagerId,
          gradeId: data.gradeId,
          payrollType: data.payrollType,
          branchId: data.branchId,
          hourlyRate: data.hourlyRate,
          frequency: payrollType === "wages" ? frequency : "monthly",
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
          const result = res.data.data;
          const successData = {
            employeeId: result.id,
            onboardingId: result?.onboarding.id,
          };

          handleNextAction(successData);

          openNotification({
            state: "success",

            title: "Success",
            description: res.data.message,
            // duration: 0.4,
          });
        },
      }
    );
  };
  const [frequency, setFrequency] = useState<TPayrollFrequency>("monthly");

  const [payrollType, setPayrollType] =
    useState<TEssentialPayrollType>("direct-salary");

  return (
    <>
      <div className="Container">
        <PageIntro title="Add Employee" link={appRoutes.employeeSettings} />

        <div className="bg-card px-1 md:px-5 py-7 rounded-md mt-7 text-accent">
          <Form
            onFinish={handleSubmit}
            layout="vertical"
            requiredMark={false}
            initialValues={{
              licenseType: true,
            }}
            form={form}
          >
            <div className="bg-mainBg rounded-md md:px-4 pt-4 pb-4 shadow-sm mt-8">
              <Collapse defaultActiveKey={["1"]} ghost expandIconPosition="end">
                <Panel
                  header="Basic Information"
                  key="1"
                  className="collapseHeader"
                >
                  <div className="bg-card px-3 py-4 rounded-md grid grid-cols-1 md:grid-cols-2 gap-x-5">
                    <Form.Item
                      name="firstName"
                      label="First Name"
                      rules={textInputValidationRules}
                    >
                      <Input placeholder="Enter First Name" />
                    </Form.Item>
                    <Form.Item
                      name="lastName"
                      label="Last Name"
                      rules={textInputValidationRules}
                    >
                      <Input placeholder="Enter Last Name" />
                    </Form.Item>
                    <Form.Item
                      name="empUid"
                      label="Employee ID (optional)"
                      rules={textInputValidationRulesOp}
                    >
                      <Input placeholder="Employee ID" />
                    </Form.Item>
                    <Form.Item
                      name="email"
                      label="Employee Email"
                      rules={emailValidationRules}
                    >
                      <Input placeholder="Enter Email" />
                    </Form.Item>
                    <FormRoleInput
                      Form={Form}
                      control={{ name: "roleId", label: "Role" }}
                    />
                    <FormDesignationInput
                      Form={Form}
                      control={{ name: "designationId", label: "Designation" }}
                    />
                  </div>
                </Panel>
              </Collapse>
            </div>

            <div className="bg-mainBg rounded-md md:px-4 pt-4 pb-3 shadow-sm mt-8">
              <Collapse defaultActiveKey={["1"]} ghost expandIconPosition="end">
                <Panel
                  header="Job Information"
                  key="1"
                  className="collapseHeader"
                >
                  <div className="bg-card px-3 py-4 rounded-md ">
                    {/* Begin here: Extract a job information form and use here */}
                    <JobInformationFormItems
                      Form={Form}
                      frequency={frequency}
                      setFrequency={setFrequency}
                      payrollType={payrollType}
                      setPayrollType={setPayrollType}
                    />
                  </div>
                </Panel>
              </Collapse>
            </div>

            <div className="bg-mainBg rounded-md md:px-4 pt-4 pb-3 shadow-sm mt-8">
              <Collapse defaultActiveKey={["1"]} ghost expandIconPosition="end">
                <Panel
                  header={"Select user license type ?"}
                  key="1"
                  className="collapseHeader"
                >
                  <Form.Item name="licenseType">
                    <Radio.Group name="licenseType">
                      Licensed
                      <Radio value={"licensed"}>
                        <AppTooltip
                          children={<span>Licensed</span>}
                          tooltipProps={{
                            title:
                              "Licensed Users will be able to access the system and use features like self service, onboarding, payslips, etc.",
                          }}
                        />
                      </Radio>
                      <Radio value={"unlicensed"}>
                        {" "}
                        <AppTooltip
                          children={<span>Unlicensed</span>}
                          tooltipProps={{
                            title:
                              "Unlicensed Users will be unable to access the system and use features like self service, onboarding, payslips, etc.",
                          }}
                        />
                      </Radio>
                    </Radio.Group>
                  </Form.Item>
                </Panel>
              </Collapse>
            </div>
            <div className="flex items-center gap-3 justify-end mt-5">
              <Dropdown
                placement="top"
                overlay={
                  <ul className="bg-mainBg text-sm rounded-md font-medium shadow-md px-2 py-3 border-2">
                    <li
                      className="pb-2 cursor-pointer hover:text-caramel"
                      onClick={() => handleCurrentAction("onboarding")}
                    >
                      Save and Onboard
                    </li>
                    <li
                      className="pb-2 cursor-pointer hover:text-caramel"
                      onClick={() => handleCurrentAction("add-another")}
                    >
                      Save and add Another
                    </li>
                    <li
                      className=" cursor-pointer hover:text-caramel"
                      onClick={() => handleCurrentAction("complete-profile")}
                    >
                      Save and Complete Profile
                    </li>
                  </ul>
                }
                trigger={["click"]}
              >
                <button
                  type="button"
                  className="flex items-center gap-2 transparentButton"
                >
                  {isLoading ? (
                    <BeatLoader />
                  ) : (
                    <>
                      <span>Save</span>
                      <i className="ri-arrow-down-s-line"></i>
                    </>
                  )}
                </button>
              </Dropdown>
            </div>
          </Form>
        </div>
      </div>
    </>
  );
};
