import { Checkbox, Form, Modal } from "antd";
import { useState } from "react";
import { IModalProps } from "types";
import { TFileEntities } from "./AddFile";
import { FormGroupInput } from "features/core/groups/components/FormGroupInput";
import { FormDepartmentInput } from "features/core/departments/components/FormDepartmentInput";
import { FormEmployeeInput } from "features/core/employees/components/FormEmployeeInput";
import { FormRoleInput } from "features/core/roles-and-permissions/components/FormRoleInput";
import { TFileData } from "../../hooks/file/useCreateFile";
import { useAddAccessToFile } from "../../hooks/file/access/useAddAccessToFile";
import { AppButton } from "components/button/AppButton";
import { openNotification } from "utils/notifications";
import { useQueryClient } from "react-query";
import { QUERY_KEY_FOR_FILES_IN_A_FOLDER } from "../../hooks/file/useGetFilesInFolder";
import { TFileListItem } from "../../types";
import { generalValidationRules } from "utils/formHelpers/validation";

interface IProps extends IModalProps {
  file?: Pick<TFileListItem, "id" | "folderId">;
}

export const AssignFile = ({ open, handleClose, file }: IProps) => {
  const [form] = Form.useForm();
  const queryClient = useQueryClient();
  const [entities, setEntities] = useState<TFileEntities[]>([]);
  const { mutate, isLoading } = useAddAccessToFile();

  const handleSubmit = (data: any) => {
    const defineAccessFromFormFields = () => {
      const access: TFileData["access"] = [];
      if (entities.includes("group")) {
        access.push(...data?.groupIds?.map((id: number) => ({ groupId: id })));
      }
      if (entities.includes("department")) {
        access.push(
          ...data?.departmentIds?.map((id: number) => ({ departmentId: id }))
        );
      }
      if (entities.includes("role")) {
        access.push(...data?.roleIds?.map((id: number) => ({ roleId: id })));
      }
      if (entities.includes("employee")) {
        access.push(
          ...data?.employeeIds?.map((id: number) => ({ employeeId: id }))
        );
      }
      return access;
    };

    mutate(
      {
        folderId: file?.folderId ?? 0,
        fileId: file?.id ?? 0,
        data: defineAccessFromFormFields(),
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
          openNotification({
            state: "success",

            title: "Success",
            description: res.data.message,
          });
          form.resetFields();
          handleClose();

          queryClient.invalidateQueries({
            queryKey: [QUERY_KEY_FOR_FILES_IN_A_FOLDER],
          });
        },
      }
    );
  };

  return (
    <Modal
      open={open}
      onCancel={() => handleClose()}
      footer={null}
      title={"Assign File"}
      style={{ top: 20 }}
    >
      <Form onFinish={handleSubmit} form={form} layout="vertical" requiredMark={false}>
        <Form.Item
          label="Assign File to"
          name="file"
          rules={generalValidationRules}
        >
          <Checkbox.Group onChange={(val) => setEntities(val)}>
            <Checkbox value="group">Group</Checkbox>
            <Checkbox value="department">Department</Checkbox>
            <Checkbox value="role">Role</Checkbox>
            <Checkbox value="employee">Employee</Checkbox>
          </Checkbox.Group>
        </Form.Item>
        {entities.includes("group") && (
          <FormGroupInput
            Form={Form}
            control={{ label: "Groups", name: "groupIds" }}
            mode="multiple"
          />
        )}
        {entities.includes("department") && (
          <FormDepartmentInput
            Form={Form}
            control={{
              label: "Departments",
              name: "departmentIds",
              multiple: true,
            }}
          />
        )}
        {entities.includes("role") && (
          <FormRoleInput
            Form={Form}
            control={{ label: "Roles", name: "roleIds" }}
          />
        )}
        {entities.includes("employee") && (
          <FormEmployeeInput
            Form={Form}
            control={{ label: "Employees", name: "employeeIds" }}
            mode="multiple"
          />
        )}

        <AppButton type="submit" isLoading={isLoading} />
      </Form>
    </Modal>
  );
};
