import {
  Collapse,
  Form,
  Spin,
  Input,
  DatePicker,
  InputNumber,
  Select,
  Radio,
  Button,
  Dropdown,
} from "antd";
import { PageIntro } from "components/layout/PageIntro";
import { appRoutes } from "config/router/paths";
import { useFetchDesignations } from "features/core/designations/hooks/useFetchDesignations";
import { FormRoleInput } from "features/core/roles-and-permissions/components/FormRoleInput";
import { useFetchRoles } from "features/core/roles-and-permissions/hooks/useFetchRoles";
import { useApiAuth } from "hooks/useApiAuth";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  textInputValidationRules,
  generalValidationRules,
} from "utils/formHelpers/validation";
import { openNotification } from "utils/notifications";
import { FormEmployeeInput } from "../components/FormEmployeeInput";
import { useCreateEmployee } from "../hooks/useCreateEmployee";
import { useFetchEmployees } from "../hooks/useFetchEmployees";
import { ICreateEmpProps } from "../types";
import { FormDesignationInput } from "features/core/designations/components/FormDesignationInput";
import { EMPLOYMENT_TYPES, WORK_MODELS } from "constants/general";

const { Panel } = Collapse;

type TNextAction = "onboarding" | "complete-profile" | "add-another";

export const AddEmployee = () => {
  const [nextAction, setNextAction] = useState<TNextAction>();
  const { token, companyId } = useApiAuth();
  const [degSearch, setDegSearch] = useState<string>("");
  const [empSearch, setEmpSearch] = useState<string>("");
  const [roleSearch, setRoleSearch] = useState<string>("");

  const [form] = Form.useForm();
  const { mutate } = useCreateEmployee();
  const {
    data: degData,
    isSuccess: isDSuccess,
    isFetching: isDFetching,
  } = useFetchDesignations({
    companyId,
    pagination: {
      limit: 100, //temp suppose to allow search
      offset: 0,
    },
    searchParams: {
      name: degSearch,
    },
    token,
  });
  const {
    data: empData,
    isSuccess: isEmpSuccess,
    isFetching: isEmpFetching,
  } = useFetchEmployees({
    pagination: {
      limit: 100, //temp suppose to allow search
      offset: 0,
    },
    searchParams: {
      name: empSearch,
    },
  });
  const {
    data: roleData,
    isSuccess: isRSuccess,
    isFetching: isRFetching,
  } = useFetchRoles({
    companyId,
    pagination: {
      limit: 100, //temp suppose to allow search
      offset: 0,
    },
    searchParams: {
      name: roleSearch,
    },

    token,
  });
  const navigate = useNavigate();
  const [successData, setSuccessData] = useState<{
    employeeId: number;
    onboardingId: number;
  }>();

  const handleNextAction = () => {
    if (successData) {
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
    }
  };
  const handleCurrentAction = (action: TNextAction) => {
    setNextAction(action);
    form.submit();
  };

  const handleSubmit = (data: any) => {
    if (companyId) {
      const props: ICreateEmpProps = {
        token,
        companyId,
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        hasSelfService: data.hasSelfService,
        empUid: data.empUid,
        roleId: data.roleId,
        designationId: data.designationId,
        jobInformation: {
          startDate: data.startDate.format("YYYY-MM-DD"),
          jobTitle: data.jobTitle,
          monthlyGross: data.monthlyGross,
          employmentType: data.employmentType,
          workModel: data.workModel,
          numberOfDaysPerWeek: data.numberOfDaysPerWeek,

          lineManagerId: data.lineManagerId,
        },
      };

      // return;
      openNotification({
        state: "info",
        title: "Wait a second ...",
        // description: <Progress percent={80} status="active" />,
        description: <Spin />,
      });
      mutate(props, {
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
          setSuccessData({
            employeeId: result.id,
            onboardingId: result?.onboarding.id,
          });

          handleNextAction();

          openNotification({
            state: "success",

            title: "Success",
            description: res.data.message,
            // duration: 0.4,
          });
        },
      });
    }
  };

  return (
    <>
      <div className="Container">
        <PageIntro title="Add Employee" link="/settings/employees" />

        <div className="bg-card px-1 md:px-5 py-7 rounded-md mt-7 text-accent">
          <div className="bg-red-200 text-sm rounded-md py-2 flex justify-between items-center px-3 mb-4">
            <span>Employees Added: 2</span>
            <span>License count left: 5</span>
          </div>
          <Form
            onFinish={handleSubmit}
            layout="vertical"
            requiredMark={false}
            initialValues={{
              hasSelfService: true,
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
                    <Form.Item name="empUid" label="Employee ID (optional)">
                      <Input placeholder="Employee ID" />
                    </Form.Item>
                    <Form.Item
                      name="email"
                      label="Employee Email"
                      rules={[
                        {
                          required: true,
                          message: "Field is required",
                        },
                        {
                          type: "email",
                          message: "Please enter a valid email",
                        },
                      ]}
                    >
                      <Input placeholder="Enter Email" />
                    </Form.Item>
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
                  <div className="bg-card px-3 py-4 rounded-md grid grid-cols-1 md:grid-cols-2 gap-x-5">
                    <Form.Item
                      name="startDate"
                      label="Start Date"
                      rules={generalValidationRules}
                    >
                      <DatePicker format="YYYY/MM/DD" className="w-full" />
                    </Form.Item>

                    <FormRoleInput Form={Form} />
                    <Form.Item
                      name="monthlyGross"
                      label="Monthly Gross"
                      rules={[...generalValidationRules, { type: "number" }]}
                    >
                      <InputNumber
                        placeholder="Enter monthly gross"
                        min={1}
                        className="w-full"
                      />
                    </Form.Item>
                    <Form.Item
                      name="employmentType"
                      label="Employment Type"
                      rules={generalValidationRules}
                    >
                      <Select
                        className="SelectTag w-full"
                        placeholder="Select Employment Type"
                        options={EMPLOYMENT_TYPES}
                      />
                    </Form.Item>
                    <Form.Item
                      name="workModel"
                      label="Work Model"
                      rules={generalValidationRules}
                    >
                      <Select
                        className="SelectTag w-full"
                        placeholder="Select Work Model"
                        options={WORK_MODELS}
                      />
                    </Form.Item>

                    <FormEmployeeInput
                      Form={Form}
                      control={{
                        name: "lineManagerId",
                        label: "Line Manager (optional)",
                      }}
                    />
                    <FormDesignationInput Form={Form} />
                    <Form.Item
                      name="numberOfDaysPerWeek"
                      label="Number of Days in the Week"
                      rules={generalValidationRules}
                    >
                      <InputNumber
                        min={1}
                        max={7}
                        className="w-full"
                        placeholder="Enter..."
                      />
                    </Form.Item>
                  </div>
                </Panel>
              </Collapse>
            </div>

            <div className="bg-mainBg rounded-md md:px-4 pt-4 pb-3 shadow-sm mt-8">
              <Collapse defaultActiveKey={["1"]} ghost expandIconPosition="end">
                <Panel
                  header="Grant Self Service Access"
                  key="1"
                  className="collapseHeader"
                >
                  <Form.Item name="hasSelfService">
                    <Radio.Group name="hasSelfService">
                      <Radio value={true}>Yes</Radio>
                      <Radio value={false}>No</Radio>
                    </Radio.Group>
                  </Form.Item>
                </Panel>
              </Collapse>
            </div>
            <div className="flex items-center gap-3 justify-end mt-5">
              <Button
                type="text"
                onClick={() => handleCurrentAction("onboarding")}
              >
                Proceed to onboarding
              </Button>
              <Dropdown
                placement="top"
                overlay={
                  <ul className="bg-mainBg text-sm rounded-md font-medium shadow-md px-2 py-3 border-2">
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
                  <span>Save</span>
                  <i className="ri-arrow-down-s-line"></i>
                </button>
              </Dropdown>
            </div>
          </Form>
        </div>
      </div>
    </>
  );
};
