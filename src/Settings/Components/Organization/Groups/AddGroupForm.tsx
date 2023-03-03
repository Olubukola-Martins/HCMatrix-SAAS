import { Form, Input, Select, Spin } from "antd";
import { ICreateDepProps } from "ApiRequesHelpers/Utility/departments";
import { useCreateDepartment } from "APIRQHooks/Utility/departmentHooks";
import { useFetchEmployees } from "APIRQHooks/Utility/employeeHooks";
import { useSaveGroup } from "APIRQHooks/Utility/groupHooks";
import { IAuthDets } from "AppTypes/Auth";
import { TGroup } from "AppTypes/DataEntitities";
import { GlobalContext, EGlobalOps } from "Contexts/GlobalContextProvider";
import {
  textInputValidationRules,
  emailValidationRules,
  generalValidationRules,
} from "FormHelpers/validation";
import { openNotification } from "NotificationHelpers";
import { useContext, useEffect, useState } from "react";
import { useAuthUser } from "react-auth-kit";
import { useQueryClient } from "react-query";
import { BeatLoader } from "react-spinners";

const AddGroupForm = ({
  handleClose,
  group,
}: {
  handleClose: Function;
  group?: TGroup;
}) => {
  const queryClient = useQueryClient();
  const auth = useAuthUser();
  const [empSearch, setEmpSearch] = useState<string>("");

  const authDetails = auth() as unknown as IAuthDets;

  const token = authDetails.userToken;
  const globalCtx = useContext(GlobalContext);
  const { state: globalState } = globalCtx;
  const companyId = globalState.currentCompany?.id as unknown as string;
  const [form] = Form.useForm();
  useEffect(() => {
    if (group) {
      form.setFieldsValue({
        name: group.name,
        email: group.email,
        description: group.description,
        employees: group?.employees?.map((item) => item.employeeId),
      });
    }
  }, [group, form]);
  const { mutate, isLoading } = useSaveGroup();

  const { data: empData, isSuccess: isEmpSuccess } = useFetchEmployees({
    companyId,
    pagination: {
      limit: 100, //temp suppose to allow search
      offset: 0,
    },
    searchParams: {
      name: empSearch,
    },

    token,
  });

  const handleSubmit = (data: any) => {
    if (companyId) {
      // return;
      openNotification({
        state: "info",
        title: "Wait a second ...",
        description: <Spin />,
      });
      mutate(
        {
          id: group?.id,
          companyId,
          description: data.description,
          email: data.email,
          token,
          employees: data.employees.map((id: number, index: number) => ({
            employeeId: id,
            isLead: index === 0 ? true : false,
          })),
          name: data.name,
        },
        {
          onError: (err: any) => {
            openNotification({
              state: "error",
              title: "Error Occurred",
              description:
                err?.response.data.message ?? err?.response.data.error.message,
            });
          },
          onSuccess: (res: any) => {
            const result = res.data.data;

            openNotification({
              state: "success",

              title: "Success",
              description: res.data.message,
              // duration: 0.4,
            });

            !group && form.resetFields();
            handleClose();

            queryClient.invalidateQueries({
              queryKey: ["groups"],
              // exact: true,
            });
          },
        }
      );
    }
  };
  return (
    <Form
      layout="vertical"
      requiredMark={false}
      form={form}
      onFinish={handleSubmit}
    >
      <Form.Item
        name="name"
        label="Group Name"
        rules={textInputValidationRules}
      >
        <Input placeholder="name" />
      </Form.Item>
      <Form.Item name="email" label="Mail Alias" rules={emailValidationRules}>
        <Input placeholder="john@gmail.com" />
      </Form.Item>

      <Form.Item name="description" label="Description (Optional)">
        <Input.TextArea placeholder="description" />
      </Form.Item>
      <Form.Item
        name="employees"
        label={
          <div className="flex flex-col">
            <span>Members</span>
            <span className="text-red-500 text-xs">
              * The first member will be the lead by default
            </span>
          </div>
        }
        rules={generalValidationRules}
      >
        <Select
          disabled={!!group}
          mode="tags"
          onSearch={(val) => setEmpSearch(val)}
          showSearch
          value={empSearch}
          defaultActiveFirstOption={false}
          showArrow={false}
          filterOption={false}
          // onChange={handleChange}
          notFoundContent={null}
        >
          {isEmpSuccess ? (
            empData.data.map((item) => (
              <Select.Option key={item.id} value={item.id}>
                {item.firstName} {item.lastName}
              </Select.Option>
            ))
          ) : (
            <div className="flex justify-center items-center w-full">
              <Spin size="small" />
            </div>
          )}
        </Select>
      </Form.Item>

      <button className="button" type="submit">
        {isLoading ? <BeatLoader color="#fff" /> : "Submit"}
      </button>
    </Form>
  );
};

export default AddGroupForm;
