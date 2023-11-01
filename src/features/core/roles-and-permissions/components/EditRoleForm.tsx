import { Checkbox, Form, Input, Skeleton, Typography } from "antd";
import { appRoutes } from "config/router/paths";
import { useState, useEffect } from "react";
import { useQueryClient } from "react-query";
import { Navigate } from "react-router-dom";
import {
  textInputValidationRules,
  generalValidationRules,
} from "utils/formHelpers/validation";
import { openNotification } from "utils/notifications";
import { useFetchPermissions } from "../hooks/useFetchPermissions";
import { useFetchSingleRole } from "../hooks/useFetchSingleRole";
import { AppButton } from "components/button/AppButton";
import { QUERY_KEY_FOR_ROLES } from "../hooks/useFetchRoles";
import { useEditRole } from "../hooks/useEditRole";

export const EditRoleForm: React.FC<{ id: number }> = ({ id }) => {
  const queryClient = useQueryClient();
  const { data: roleData, isFetching: isFetchingRole } = useFetchSingleRole({
    id,
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(0);
  const [form] = Form.useForm();
  const notAbleToEditRole = roleData?.label === "admin";

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

  const handleSearch = (e: any) => {
    const val = e.target.value;
    setSearchTerm(val);
  };

  const handleCategoryClick = (val: number) => {
    setSelectedCategory(val);
  };

  const { mutate, isLoading } = useEditRole();

  const handleSubmit = (data: any) => {
    if (!roleData) return;
    mutate(
      {
        data: {
          name: data.name,
          permissionIds: data.permissionIds,
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
        },
      }
    );
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
                  disabled={roleData?.label === "employee"}
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
                <div className="flex justify-end my-2">
                  <Input
                    onChange={handleSearch}
                    className="w-48"
                    placeholder="Search permissions"
                    value={searchTerm}
                  />
                </div>

                <Form.Item name="permissionIds" rules={generalValidationRules}>
                  <Checkbox.Group style={{ width: "100%" }}>
                    <div className="my-6 grid grid-cols-4 gap-4">
                      {data?.permissions.map((item) => (
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
