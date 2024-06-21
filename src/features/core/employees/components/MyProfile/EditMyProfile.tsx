import { Avatar, Drawer, Form, Input } from "antd";
import { FormDesignationInput } from "features/core/designations/components/FormDesignationInput";
import { FormRoleInput } from "features/core/roles-and-permissions/components/FormRoleInput";
import { useEffect, useState } from "react";
import { useQueryClient } from "react-query";
import { IDrawerProps } from "types";
import {
  textInputValidationRules,
  emailValidationRules,
} from "utils/formHelpers/validation";
import { openNotification } from "utils/notifications";
import { useUpdateEmployee } from "../../hooks/useUpdateEmployee";
import { TSingleEmployee } from "../../types";
import { useApiAuth } from "hooks/useApiAuth";
import { QUERY_KEY_FOR_SINGLE_EMPLOYEE } from "../../hooks/useFetchSingleEmployee";
import { QUERY_KEY_FOR_LIST_OF_EMPLOYEES } from "../../hooks/useFetchEmployees";
import { FormFileInput } from "components/generalFormInputs/FormFileInput";
import { AppButton } from "components/button/AppButton";
import AppSwitch from "components/switch/AppSwitch";
import { bulkUploadFiles } from "hooks/useUploadFile";
import { QUERY_KEY_FOR_AUTHENTICATED_USER } from "features/authentication/hooks/useGetAuthUser";

interface IProps extends IDrawerProps {
  employee?: TSingleEmployee;
}

export const EditMyProfile = ({ open, handleClose, employee }: IProps) => {
  const queryClient = useQueryClient();
  const [form] = Form.useForm();

  const [avatarUrl, setAvatarUrl] = useState<string>();
  const [isUploadingAvatar, setIsUploadingAvatar] = useState(false);

  useEffect(() => {
    if (employee) {
      form.setFieldsValue({
        firstName: employee.firstName,
        lastName: employee.lastName,
        empUid: employee.empUid,
        designationId: employee.designation?.id,
        roleId: employee.role.id,
        email: employee.email,
      });
      setAvatarUrl(employee.avatarUrl);
    }
  }, [employee, form]);

  const { mutate, isLoading } = useUpdateEmployee();
  const {
    token,
    companyId,
    currentCompanyEmployeeDetails: authEmployee,
  } = useApiAuth();

  const handleFinish = async (data: any) => {
    if (!employee) return;
    let uploadedUrl = employee.avatarUrl;
    if (data.avatar) {
      try {
        setIsUploadingAvatar(true);
        const avatarRes = await bulkUploadFiles({
          auth: { companyId, token },
          data: { files: data.avatar },
        });
        uploadedUrl = avatarRes[0];

        setIsUploadingAvatar(false);
      } catch (err: any) {
        openNotification({
          state: "error",
          title: "Error Occured",
          description:
            err?.response.data.message ?? err?.response.data.error.message,
        });

        setIsUploadingAvatar(false);
      }
    }
    setAvatarUrl(uploadedUrl);

    mutate(
      {
        employeeId: employee?.id,
        body: {
          // The pattern below is updated so that only value that are modified are sent to patch request
          // TODO: Come up with a much efficient way to handle this
          avatarUrl:
            employee.avatarUrl === uploadedUrl ? undefined : uploadedUrl,
          designationId:
            employee.designationId === data.designationId
              ? undefined
              : data.designationId,
          email: employee.email === data.email ? undefined : data.email,
          empUid: employee.empUid === data.empUid ? undefined : data.empUid,
          firstName:
            employee.firstName === data.firstName ? undefined : data.firstName,
          lastName:
            employee.lastName === data.lastName ? undefined : data.lastName,

          roleId: employee.roleId === data.roleId ? undefined : data.roleId,
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
          openNotification({
            state: "success",

            title: "Success",
            description: res?.data?.message,
          });
          queryClient.invalidateQueries({
            queryKey: [QUERY_KEY_FOR_SINGLE_EMPLOYEE, employee?.id],
          });
          queryClient.invalidateQueries({
            queryKey: [QUERY_KEY_FOR_LIST_OF_EMPLOYEES],
          });
          queryClient.invalidateQueries({
            queryKey: [QUERY_KEY_FOR_AUTHENTICATED_USER],
          });

          // clear avatar field to prevent api error on subsequent edit
          form.setFieldValue("avatar", undefined);

          handleClose();
        },
      }
    );
  };

  return (
    <Drawer
      title="Edit Profile"
      placement="right"
      onClose={() => handleClose()}
      open={open}
      className="drawerBg"
      width="45%"
    >
      <Form
        layout="vertical"
        form={form}
        requiredMark={false}
        onFinish={handleFinish}
      >
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="flex justify-center">
            <div>
              <FormFileInput
                Form={Form}
                name="avatar"
                ruleOptions={{
                  allowedFileTypes: ["image/png", "image/jpeg", "image/jpg"],
                  required: false,
                  maxFileUploadCount: 1,
                }}
                triggerComp={
                  <div className="flex relative">
                    <Avatar
                      src={!!avatarUrl ? avatarUrl : employee?.avatarUrl}
                      size={110}
                      shape="circle"
                    />
                    <i className="ri-pencil-line cursor-pointer hover:text-caramel" />
                  </div>
                }
              />
            </div>
          </div>
          <div className="col-span-2 gap-x-3 grid grid-cols-1 lg:grid-cols-2">
            <Form.Item
              name="firstName"
              label="First Name"
              rules={textInputValidationRules}
            >
              <Input className="w-full" placeholder="First Name" />
            </Form.Item>

            <Form.Item
              name="lastName"
              label="Last Name"
              rules={textInputValidationRules}
            >
              <Input className="w-full" placeholder="Last Name" />
            </Form.Item>
            <Form.Item
              name="empUid"
              label="Employee ID"
              rules={textInputValidationRules}
            >
              <Input className="w-full" placeholder="Employee ID" />
            </Form.Item>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 mt-2">
          <FormDesignationInput Form={Form} />

          <FormRoleInput Form={Form} disabled={authEmployee?.isOwner} />
          <Form.Item
            name="email"
            label="Work/Official Email"
            rules={emailValidationRules}
          >
            <Input className="w-full" placeholder="Enter Email" disabled />
          </Form.Item>
        </div>
        <div className="flex items-center justify-between mt-2">
          <AppButton
            type="button"
            handleClick={() => handleClose()}
            variant="transparent"
            label="Cancel"
          />
          <AppButton
            type="submit"
            label="Save"
            isLoading={isUploadingAvatar || isLoading}
          />
        </div>
      </Form>
    </Drawer>
  );
};
