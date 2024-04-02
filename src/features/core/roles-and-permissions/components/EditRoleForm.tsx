import { Button, Checkbox, Form, Input, Skeleton, Typography } from "antd";
import { appRoutes } from "config/router/paths";
import { useState, useEffect } from "react";
import { useQueryClient } from "react-query";
import { Navigate } from "react-router-dom";
import {
  textInputValidationRules,
  generalValidationRules,
} from "utils/formHelpers/validation";
import { openNotification } from "utils/notifications";
import {
  ARTIFICIAL_KEY_FOR_ALL_PERMISSIONS_CATEGORY,
  PREDEFINED_LABEL_NAME_FOR_ADMIN_ROLE,
  PREDEFINED_LABEL_NAME_FOR_EMPLOYEE_ROLE,
  useFetchPermissions,
} from "../hooks/useFetchPermissions";
import { useFetchSingleRole } from "../hooks/useFetchSingleRole";
import { AppButton } from "components/button/AppButton";
import { QUERY_KEY_FOR_ROLES } from "../hooks/useFetchRoles";
import { useEditRole } from "../hooks/useEditRole";
import { QUERY_KEY_FOR_AUTHENTICATED_USER } from "features/authentication/hooks/useGetAuthUser";

export const EditRoleForm: React.FC<{ id: number }> = ({ id }) => {
  const queryClient = useQueryClient();
  const { data: roleData, isFetching: isFetchingRole } = useFetchSingleRole({
    id,
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(
    ARTIFICIAL_KEY_FOR_ALL_PERMISSIONS_CATEGORY
  );
  const [form] = Form.useForm();
  const notAbleToEditRole =
    roleData?.label === PREDEFINED_LABEL_NAME_FOR_ADMIN_ROLE;

  useEffect(() => {
    // notify user of inablity to edit 'admin' role
    if (notAbleToEditRole)
      openNotification({
        state: "info",
        title: "Action not allowed!",
        description:
          "You cannot modify the admin role, try creating a new role instead!",
        duration: 8,
      });
    if (roleData) {
      form.setFieldsValue({
        name: roleData?.name,
        permissionIds: roleData?.permissions?.map((item) => item.permission.id),
      });
    }
  }, [form, roleData, notAbleToEditRole]);

  const { data, isFetching: isFetchingPermissions } = useFetchPermissions();

  const handleSearch = (val: string) => {
    setSearchTerm(val);
  };

  const handleCategoryClick = (val: number) => {
    setSelectedCategory(val);
  };

  const { mutate, isLoading } = useEditRole();

  const handleSubmit = (data: { name: string; permissionIds?: number[] }) => {
    if (!roleData) return;
    mutate(
      {
        data: {
          name: data.name,
          permissionIds: [...(data.permissionIds ?? [])],
        },
        roleId: roleData.id,
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
          openNotification({
            state: "success",

            title: "Success",
            description: res.data.message,
          });

          queryClient.invalidateQueries({
            queryKey: [QUERY_KEY_FOR_ROLES],
          });
          queryClient.invalidateQueries({
            queryKey: [QUERY_KEY_FOR_AUTHENTICATED_USER],
            // exact: true,
          });
        },
      }
    );
  };
  const selectedCategoryPermissionIds = data?.permissions
    .filter((item) => item.categoryId === selectedCategory)
    .map((item) => item.id);
  const permissionIdsSelectedCurrently: number[] | undefined =
    form.getFieldValue("permissionIds");
  const handleClearAll = () => {
    form.setFieldsValue({
      permissionIds: [],
    });
  };
  const handleSelectAll = () => {
    form.setFieldsValue({
      permissionIds: [
        ...(permissionIdsSelectedCurrently ?? []),
        ...(selectedCategoryPermissionIds ?? []),
      ],
    });
  };

  return (
    <>
      {notAbleToEditRole && (
        <Navigate to={appRoutes.roleSettings} replace={true} />
      )}
      <div>
        <Skeleton active loading={isFetchingRole} paragraph={{ rows: 40 }}>
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
                <Input
                  placeholder="role name"
                  disabled={
                    roleData?.label === PREDEFINED_LABEL_NAME_FOR_EMPLOYEE_ROLE
                  }
                />
              </Form.Item>
            </div>
            <Skeleton
              loading={isFetchingPermissions}
              active
              paragraph={{ rows: 35 }}
            >
              <div className="flex flex-col gap-4">
                <Typography.Title level={5}>
                  Assign Permissions
                </Typography.Title>
                {/* permission categories */}
                <div className="flex flex-wrap gap-4 pb-3 border-b ">
                  {data?.categories.map((item) => (
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
                <div className="flex justify-end my-2 gap-x-4">
                  <Button
                    type="primary"
                    shape="round"
                    danger
                    onClick={handleSelectAll}
                  >
                    Select All
                  </Button>
                  <Button
                    type="primary"
                    shape="round"
                    ghost
                    onClick={handleClearAll}
                  >
                    Clear All
                  </Button>
                  <Input.Search
                    onSearch={handleSearch}
                    className="w-52"
                    placeholder="Search permissions"
                    allowClear
                  />
                </div>

                <Form.Item
                  name="permissionIds"
                  rules={generalValidationRules}
                  noStyle
                >
                  <Checkbox.Group className="lg:px-10 lg:py-4 grid lg:grid-cols-3 grid-cols-2 lg:gap-x-12 lg:gap-y-4 gap-x-4 gap-y-4">
                    {data?.permissions.map((item) => (
                      <Checkbox
                        key={`${item.id} ${item.categoryId}`} //this is done to remove duplicates as a result of the all category
                        value={item.id}
                        className={`items-center border rounded-sm px-4 py-3 ${
                          item.categoryId === selectedCategory &&
                          new RegExp(searchTerm, "i").test(item.name)
                            ? "flex"
                            : "hidden"
                        }`}
                      >
                        {item.name}
                      </Checkbox>
                    ))}
                  </Checkbox.Group>
                </Form.Item>
              </div>
            </Skeleton>

            <div className="flex justify-end">
              <AppButton type="submit" isLoading={isLoading} label="Save" />
            </div>
          </Form>
        </Skeleton>
      </div>
    </>
  );
};
