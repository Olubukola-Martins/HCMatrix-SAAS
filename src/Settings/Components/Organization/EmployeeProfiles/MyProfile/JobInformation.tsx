import {
  DatePicker,
  Form,
  Input,
  InputNumber,
  message,
  Select,
  Spin,
  Tooltip,
} from "antd";
import { ICreateEmpJobInfoProps } from "ApiRequesHelpers/Utility/employee";
import {
  useCreateEmployeeJobInfo,
  useFetchEmployees,
  useUpdateEmployeeJobInfo,
} from "APIRQHooks/Utility/employeeHooks";
import { IAuthDets } from "AppTypes/Auth";
import { TEmployee } from "AppTypes/DataEntitities";
import { employmentTypes, workModels } from "Constants";
import { GlobalContext } from "Contexts/GlobalContextProvider";
import { generalValidationRules } from "FormHelpers/validation";
import moment from "moment";
import { openNotification } from "NotificationHelpers";
import React, { useContext, useEffect, useState } from "react";
import { useAuthUser } from "react-auth-kit";
import { useQueryClient } from "react-query";
import { BeatLoader } from "react-spinners";
const { Option } = Select;

interface IProps {
  employee?: TEmployee;
}

const branchList = ["Branch 1", "Branch 2", "Branch 3"];
export const JobInformation = ({ employee }: IProps) => {
  const [form] = Form.useForm();
  const queryClient = useQueryClient();

  const auth = useAuthUser();
  const authDetails = auth() as unknown as IAuthDets;
  const token = authDetails.userToken;
  const globalCtx = useContext(GlobalContext);
  const { state: globalState } = globalCtx;
  const companyId = globalState.currentCompany?.id as unknown as string;
  const [disable, setDisable] = useState(true);
  const enableEdit = () => {
    setDisable(!disable);
    message.success(
      disable ? "Editing enabled Successfully" : "Editing disabled successfully"
    );
  };
  const { data: employees, isSuccess } = useFetchEmployees({
    companyId,
    token,
    pagination: {
      limit: 100,
      offset: 0,
    },
  });

  useEffect(() => {
    const jobInfo = employee?.jobInformation;
    if (jobInfo) {
      form.setFieldsValue({
        startDate: moment(jobInfo.startDate),
        monthlyGross: +jobInfo.monthlyGross, // to covert to number
        employmentType: jobInfo.employmentType,
        workModel: jobInfo.workModel,
        numberOfDaysPerWeek: jobInfo.numberOfDaysPerWeek,
        hireDate: moment(jobInfo.hireDate),
        probationEndDate: moment(jobInfo.probationEndDate),
        confirmationDate: moment(jobInfo.confirmationDate),
      });
    }
  }, [employee]);
  const { mutate: createMutate, isLoading: createLoading } =
    useCreateEmployeeJobInfo();
  const { mutate: updateMutate, isLoading: updateLoading } =
    useUpdateEmployeeJobInfo();

  const handleFinish = (data: any) => {
    if (companyId && employee && !employee.jobInformation) {
      //if the personal info doesnt exist, then create
      const props: ICreateEmpJobInfoProps = {
        token,
        companyId,
        startDate: data.startDate,
        monthlyGross: data.monthlyGross,
        employmentType: data.employmentType,
        workModel: data.workModel,
        numberOfDaysPerWeek: data.numberOfDaysPerWeek,
        hireDate: data.hireDate,
        probationEndDate: data.probationEndDate,
        confirmationDate: data.confirmationDate,
        employeeId: employee.id,
      };

      openNotification({
        state: "info",
        title: "Wait a second ...",
        description: <Spin />,
      });
      createMutate(props, {
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
          });
        },
      });
    }
    if (companyId && employee && employee.jobInformation) {
      //if the personal info exist, then update
      const props: ICreateEmpJobInfoProps = {
        token,
        companyId,
        startDate: data.startDate,
        monthlyGross: data.monthlyGross,
        employmentType: data.employmentType,
        workModel: data.workModel,
        numberOfDaysPerWeek: data.numberOfDaysPerWeek,
        hireDate: data.hireDate,
        probationEndDate: data.probationEndDate,
        confirmationDate: data.confirmationDate,
        employeeId: employee.id,
      };

      // return;
      openNotification({
        state: "info",
        title: "Wait a second ...",
        description: <Spin />,
      });
      updateMutate(props, {
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
          });
        },
      });
    }
  };

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
          form={form}
          onFinish={handleFinish}
          requiredMark={false}
          disabled={disable}
        >
          <Form.Item
            name="monthlyGross"
            label="Monthly Gross"
            rules={[...generalValidationRules, { type: "number" }]}
          >
            <InputNumber min={1} className="w-full" />
          </Form.Item>
          <Form.Item
            name="numberOfDaysPerWeek"
            label="Number of days per week"
            rules={[...generalValidationRules, { type: "number" }]}
          >
            <InputNumber min={1} className="w-full" />
          </Form.Item>
          <Form.Item
            name="startDate"
            label="Resumption Date"
            rules={generalValidationRules}
          >
            <DatePicker format="YYYY/MM/DD" className="w-full" />
          </Form.Item>
          <Form.Item
            name="hireDate"
            label="Hire Date"
            rules={generalValidationRules}
          >
            <DatePicker format="YYYY/MM/DD" className="w-full" />
          </Form.Item>
          <Form.Item name="branch" label="Branch">
            <Select
              showSearch
              allowClear
              optionLabelProp="label"
              placeholder="Select Branch"
            >
              {branchList.map((data) => (
                <Option key={data} value={data} label={data}>
                  {data}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            name="lineManagerId"
            label="Line Manager"
            rules={generalValidationRules}
          >
            <Select
              showSearch
              allowClear
              optionLabelProp="label"
              placeholder="Select"
            >
              {isSuccess &&
                employees?.data?.map((data) => (
                  <Option
                    key={data.id}
                    value={data.id}
                    label={`${data.firstName} ${data.lastName}`}
                  >
                    {data.firstName} {data.lastName}
                  </Option>
                ))}
            </Select>
          </Form.Item>

          <Form.Item
            name="employmentType"
            label="Employment Type"
            rules={generalValidationRules}
          >
            <Select placeholder="Select" options={employmentTypes} />
          </Form.Item>
          <Form.Item
            name="probationEndDate"
            label="Probation End Date"
            rules={generalValidationRules}
          >
            <DatePicker format="YYYY/MM/DD" className="w-full" />
          </Form.Item>
          <Form.Item
            name="workModel"
            label="Work Model"
            rules={generalValidationRules}
          >
            <Select placeholder="Select" options={workModels} />
          </Form.Item>
          <Form.Item
            name="confirmationDate"
            label="Confirmation Date"
            rules={generalValidationRules}
          >
            <DatePicker format="YYYY/MM/DD" className="w-full" />
          </Form.Item>
          <Form.Item name="payGradeId" label="Pay Grade">
            <Select placeholder="Select">
              <Option value="grade 1">Grade 1</Option>
              <Option value="grade 2">Grade 2</Option>
              <Option value="grade 2">Grade 2</Option>
            </Select>
          </Form.Item>
          {!disable && (
            <div className="flex items-center">
              <button className="button" type="submit">
                {createLoading || updateLoading ? (
                  <BeatLoader color="#fff" />
                ) : (
                  "Save changes"
                )}
              </button>
            </div>
          )}
        </Form>
      </div>
    </div>
  );
};
