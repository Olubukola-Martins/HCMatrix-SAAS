import {
  Avatar,
  Drawer,
  Form,
  Input,
  Select,
  Spin,
  Switch,
  Upload,
} from "antd";
import { IUpdateEmpProps } from "ApiRequesHelpers/Utility/employee";
import { useFetchRoles } from "APIRQHooks/Auth/roleHooks";
import { useFetchDepartments } from "APIRQHooks/Utility/departmentHooks";
import { useFetchDesignations } from "APIRQHooks/Utility/designationHooks";
import { useUpdateEmployee } from "APIRQHooks/Utility/employeeHooks";
import { IAuthDets } from "AppTypes/Auth";
import { TEmployee } from "AppTypes/DataEntitities";
import { defaultImage } from "Constants";
import { GlobalContext } from "Contexts/GlobalContextProvider";
import {
  emailValidationRules,
  generalValidationRules,
  textInputValidationRules,
} from "FormHelpers/validation";
import { FileUpload } from "GeneralComps/FileUpload";
import { openNotification } from "NotificationHelpers";
import { useContext, useEffect } from "react";
import { useAuthUser } from "react-auth-kit";
import { useQueryClient } from "react-query";
import { BeatLoader } from "react-spinners";
import { IDrawerProps } from "../../../../../AppTypes/Component";

interface IProps extends IDrawerProps {
  employee?: TEmployee;
}

export const EditMyProfile = ({ open, handleClose, employee }: IProps) => {
  const queryClient = useQueryClient();
  const [form] = Form.useForm();
  const auth = useAuthUser();

  const authDetails = auth() as unknown as IAuthDets;

  const token = authDetails.userToken;
  const globalCtx = useContext(GlobalContext);
  const { state: globalState } = globalCtx;
  const avatarUrl = globalState.upLoadFileString;
  const companyId = globalState.currentCompany?.id as unknown as string;

  useEffect(() => {
    if (employee) {
      form.setFieldsValue({
        avatarUrl: avatarUrl,
        firstName: employee.firstName,
        lastName: employee.lastName,
        empUid: employee.empUid,
        designationId: employee.designation?.id,
        roleId: employee.role.id,
        email: employee.email,
        hasSelfService: employee.hasSelfService,
      });
    }
  }, [employee, form, avatarUrl]);

  const { data: designations, isFetching: isDesgFetching } =
    useFetchDesignations({
      token,
      companyId,
      pagination: {
        limit: 100,
        offset: 0,
      },
    });
  const { data: roles, isFetching: isRoleFetching } = useFetchRoles({
    token,
    companyId,
    pagination: {
      limit: 100,
      offset: 0,
    },
  });

  const { mutate, isLoading } = useUpdateEmployee();

  const handleFinish = (data: any) => {
    if (companyId) {
      const props: IUpdateEmpProps = {
        token,
        companyId,
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        hasSelfService: data.hasSelfService,
        empUid: data.empUid,
        roleId: data.roleId,
        designationId: data.designationId,
        employeeId: employee?.id as number,
        avatarUrl,
      };
      if (props.empUid === employee?.empUid) delete props.empUid;

      // return;
      openNotification({
        state: "info",
        title: "Wait a second ...",
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
          openNotification({
            state: "success",

            title: "Success",
            description: res?.data?.message,
          });
          queryClient.invalidateQueries({
            queryKey: ["single-employee", employee?.id],
          });

          handleClose();
        },
      });
    }
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
              <Avatar
                src={!!avatarUrl ? avatarUrl : employee?.avatarUrl}
                size={110}
                shape="circle"
              />
              <div className="mt-4">
                <FileUpload
                  allowedFileTypes={["image/png", "image/jpeg", "image/jpg"]}
                />
              </div>
              <Form.Item name="image" noStyle>
                <Input type="hidden" />
              </Form.Item>
            </div>
          </div>
          <div className="col-span-2 gap-x-3 grid grid-cols-1 lg:grid-cols-2">
            <Form.Item
              name="firstName"
              label="First Name"
              rules={textInputValidationRules}
            >
              <Input className="generalInputStyle" placeholder="First Name" />
            </Form.Item>

            <Form.Item
              name="lastName"
              label="Last Name"
              rules={textInputValidationRules}
            >
              <Input className="generalInputStyle" placeholder="Last Name" />
            </Form.Item>
            <Form.Item
              name="empUid"
              label="Employee ID"
              rules={textInputValidationRules}
            >
              <Input className="generalInputStyle" placeholder="Employee ID" />
            </Form.Item>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 mt-2">
          <Form.Item
            name="designationId"
            label="Designation"
            rules={generalValidationRules}
          >
            <Select
              options={designations?.data.map((item) => ({
                label: item.name,
                value: item.id,
              }))}
              loading={isDesgFetching}
            />
          </Form.Item>

          <Form.Item name="roleId" label="Role">
            <Select
              options={roles?.data.map((item) => ({
                label: item.name,
                value: item.id,
              }))}
              loading={isRoleFetching}
            />
          </Form.Item>
          <Form.Item
            name="email"
            label="Work/Official Email"
            rules={emailValidationRules}
          >
            <Input
              className="generalInputStyle"
              placeholder="Enter Email"
              disabled
            />
          </Form.Item>
          <Form.Item
            name="hasSelfService"
            label="Do you want to activate self-service for this employee?"
            className="col-span-2"
            valuePropName="checked"
            initialValue
          >
            <Switch unCheckedChildren="No" checkedChildren="Yes" />
          </Form.Item>
        </div>
        <div className="flex items-center justify-between mt-2">
          <button
            type="button"
            onClick={() => handleClose()}
            className="transparentButton"
          >
            Cancel
          </button>
          <button className="button" type="submit" disabled={isLoading}>
            {isLoading ? <BeatLoader color="#fff" /> : "Submit"}
          </button>
        </div>
      </Form>
    </Drawer>
  );
};
