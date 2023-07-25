import {
  Checkbox,
  Form,
  Input,
  Select,
  Skeleton,
  Spin,
  Table,
  Typography,
} from "antd";
import { CheckboxValueType } from "antd/es/checkbox/Group";
import React, { useContext, useState } from "react";
import { useAuthUser } from "react-auth-kit";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { BeatLoader } from "react-spinners";

import { AppButton } from "components/button/AppButton";
import { useApiAuth } from "hooks/useApiAuth";
import { EGlobalOps, GlobalContext } from "stateManagers/GlobalContextProvider";
import {
  textInputValidationRules,
  generalValidationRules,
} from "utils/formHelpers/validation";
import { openNotification } from "utils/notifications";
import { useCreateRole, ICreateRoleProps } from "../hooks/useCreateRole";
import { useFetchPermissions } from "../hooks/useFetchPermissions";
import { QUERY_KEY_FOR_ROLES } from "../hooks/useFetchRoles";

const CreateRoleForm = () => {
  const queryClient = useQueryClient();
  const { token, companyId } = useApiAuth();
  const { dispatch } = useContext(GlobalContext);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(0);
  const [form] = Form.useForm();
  const {
    data,
    isError: isPError,
    isFetching: isPFetching,
    isSuccess: isPSuccess,
  } = useFetchPermissions({
    companyId,
    token,
  });

  const handleSearch = (e: any) => {
    const val = e.target.value;
    setSearchTerm(val);
  };

  const handleCategoryClick = (val: number) => {
    setSelectedCategory(val);
  };

  const { mutate, isLoading } = useCreateRole();

  const handleSubmit = (data: any) => {
    if (companyId) {
      const props: ICreateRoleProps = {
        companyId,
        name: data.name,
        permissionIds: data.permissionIds,
        token,
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

          openNotification({
            state: "success",

            title: "Success",
            description: res.data.message,
            // duration: 0.4,
          });

          form.resetFields();
          dispatch({ type: EGlobalOps.setShowInitialSetup, payload: true });

          queryClient.invalidateQueries({
            queryKey: [QUERY_KEY_FOR_ROLES],
          });
        },
      });
    }
  };

  const columns = [
    {
      title: "Permission/Priviledges",
      dataIndex: "name",
      key: "name",
    },

    {
      title: "Record Permission",
      dataIndex: "Record Permission",
      key: "Record Permission",
      children: [
        {
          title: "View",
          dataIndex: "View",
          key: "View",
        },
        {
          title: "Add",
          dataIndex: "Add",
          key: "Add",
        },
        {
          title: "Edit",
          dataIndex: "Edit",
          key: "Edit",
        },
        {
          title: "Delete",
          dataIndex: "Delete",
          key: "Delete",
        },
      ],
    },

    {
      title: "Field Permission",
      dataIndex: "Field Permission",
      key: "Field Permission",
      children: [
        {
          title: "Fill",
          dataIndex: "Fill",
          key: "Fill",
        },
      ],
    },
    {
      title: "Action Permission",
      dataIndex: "Action Permission",
      key: "Action Permission",
      children: [
        {
          title: "Import",
          dataIndex: "Import",
          key: "Import",
        },
        {
          title: "Export",
          dataIndex: "Export",
          key: "Export",
        },
        {
          title: "Activate",
          dataIndex: "Activate",
          key: "Activate",
        },
      ],
    },
  ];

  const ans: any[] = [
    {
      name: "Company Details",
      View: <Checkbox />,
      Edit: <Checkbox />,
      Add: <Checkbox />,
      Fill: <Checkbox />,
      Import: <Checkbox />,
      Export: <Checkbox />,
      Activate: <Checkbox />,
      Delete: <Checkbox />,
    },
    {
      name: "Department Details",
      View: <Checkbox />,
      Edit: <Checkbox />,
      Add: <Checkbox />,
      Fill: <Checkbox />,
      Import: <Checkbox />,
      Export: <Checkbox />,
      Activate: <Checkbox />,
      Delete: <Checkbox />,
    },
    {
      name: "Group Details",
      View: <Checkbox />,
      Edit: <Checkbox />,
      Add: <Checkbox />,
      Fill: <Checkbox />,
      Import: <Checkbox />,
      Export: <Checkbox />,
      Activate: <Checkbox />,
      Delete: <Checkbox />,
    },
    {
      name: "Payroll Details",
      View: <Checkbox />,
      Edit: <Checkbox />,
      Add: <Checkbox />,
      Fill: <Checkbox />,
      Import: <Checkbox />,
      Export: <Checkbox />,
      Activate: <Checkbox />,
      Delete: <Checkbox />,
    },
    {
      name: "Wallet Details",
      View: <Checkbox />,
      Edit: <Checkbox />,
      Add: <Checkbox />,
      Fill: <Checkbox />,
      Import: <Checkbox />,
      Export: <Checkbox />,
      Activate: <Checkbox />,
      Delete: <Checkbox />,
    },
  ];
  return (
    <div>
      <Skeleton
        active
        loading={!isPSuccess || isPFetching}
        paragraph={{ rows: 40 }}
      >
        {isPSuccess && (
          <Form
            layout="vertical"
            requiredMark={false}
            form={form}
            onFinish={handleSubmit}
          >
            <div className="flex flex-col gap-4">
              <Typography.Title level={5}>Role name</Typography.Title>
              <Form.Item
                name="name"
                rules={textInputValidationRules}
                className="w-1/5"
              >
                <Input placeholder="role name" />
              </Form.Item>
            </div>
            <div className="flex flex-col gap-4">
              <Typography.Title level={5}>Assign Permissions</Typography.Title>
              {/* permission categories */}
              <div className="flex flex-wrap gap-4 pb-3 border-b ">
                {data.categories.map((item) => (
                  <div className="" key={item.id}>
                    <button
                      type="button"
                      className={` capitalize hover:bg-caramel hover:border-caramel focus:bg-caramel active:bg-caramel text-white block rounded-full text-sm cursor-pointer px-2 py-1 hover:text-white ${
                        item.id === selectedCategory
                          ? "bg-caramel"
                          : "bg-transparent border border-slate-400 text-slate-400"
                      }`}
                      onClick={() => handleCategoryClick(item.id)}
                    >
                      {item.name}
                    </button>
                  </div>
                ))}
              </div>
              <div className="flex justify-end my-2">
                <Input
                  onChange={handleSearch}
                  className="w-48"
                  placeholder="Search permissions"
                  disabled
                />
              </div>
              {/* commented div */}
              <div className="bg-white p-4 rounded-md mb-4">
                <Table columns={columns} dataSource={ans} size="small" />
              </div>
              <Form.Item name="permissionIds" rules={generalValidationRules}>
                <Checkbox.Group style={{ width: "100%" }}>
                  <div className="my-6 grid grid-cols-4 gap-4">
                    {data.permissions.map((item) => (
                      <Checkbox
                        key={item.id}
                        value={item.id}
                        className={`${
                          item.categoryId === selectedCategory ||
                          selectedCategory === 0
                            ? //   ||
                              //   searchTerm
                              //     .toLowerCase()
                              //     .search(item.name.toLowerCase()) !== -1
                              "flex"
                            : "hidden"
                        }`}
                      >
                        {item.name}
                      </Checkbox>
                    ))}
                  </div>
                </Checkbox.Group>
              </Form.Item>
            </div>

            <AppButton type="submit" isLoading={isLoading} />
          </Form>
        )}
      </Skeleton>
    </div>
  );
};

export default CreateRoleForm;
