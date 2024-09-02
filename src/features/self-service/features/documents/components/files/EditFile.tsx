import { Checkbox, Form, Input, Modal } from "antd";
import { useEffect, useState } from "react";
import { useQueryClient } from "react-query";
import { IModalProps } from "types";
import { FormFolderInput } from "../folders/FormFolderInput";
import {
  generalValidationRules,
  textInputValidationRules,
  textInputValidationRulesOp,
} from "utils/formHelpers/validation";
import { FormGroupInput } from "features/core/groups/components/FormGroupInput";
import { FormDepartmentInput } from "features/core/departments/components/FormDepartmentInput";
import { FormRoleInput } from "features/core/roles-and-permissions/components/FormRoleInput";
import { FormEmployeeInput } from "features/core/employees/components/FormEmployeeInput";
import { useCurrentFileUploadUrl } from "hooks/useCurrentFileUploadUrl";
import { TFileEntities } from "./AddFile";
import { FileUpload } from "components/FileUpload";
import { AppButton } from "components/button/AppButton";
import { boxStyle } from "styles/reused";
import { TFileData } from "../../hooks/file/useCreateFile";
import { openNotification } from "utils/notifications";
import { useUpdateFile } from "../../hooks/file/useUpdateFile";
import { QUERY_KEY_FOR_FILES_IN_A_FOLDER } from "../../hooks/file/useGetFilesInFolder";
import { TFileListItem } from "../../types";
import { QUERY_KEY_FOR_ALL_ASSIGNED_FILES } from "../../hooks/file/useGetAllAssignedFiles";

interface IProps extends IModalProps {
  file?: TFileListItem;
}

interface TFormData {
    groupIds: number[];
    departmentIds: number[];
    roleIds: number[];
    employeeIds: number[];
    name: string;
    description:string;
    url: string;
  }
export const EditFile = ({ open, handleClose, file }: IProps) => {
  const queryClient = useQueryClient();
  const documentUrl = useCurrentFileUploadUrl("documentUrl");
  const [entities, setEntities] = useState<TFileEntities[]>([]);
  const [form] = Form.useForm();
  const { mutate, isLoading } = useUpdateFile();

  console.log(file);

  useEffect(() => {
    form.setFieldsValue({
      folderId: file?.folderId,
      name: file?.name,
      description: file?.description,
      url: file?.url,
    });
  }, [file, form]);

  const handleSubmit = (value: TFormData) => {
    const defineAccessFromFormFields = () => {
      const access: TFileData["access"] = [];
      if (entities.includes("group")) {
        access.push(...value?.groupIds?.map((id: number) => ({ groupId: id })));
      }
      if (entities.includes("department")) {
        access.push(
          ...value?.departmentIds?.map((id: number) => ({ departmentId: id }))
        );
      }
      if (entities.includes("role")) {
        access.push(...value?.roleIds?.map((id: number) => ({ roleId: id })));
      }
      if (entities.includes("employee")) {
        access.push(
          ...value?.employeeIds?.map((id: number) => ({ employeeId: id }))
        );
      }
      return access;
    };

    mutate(
      {
        data: {
          url: documentUrl ?? "",
          name: value.name,
          description: value.description,
          access: defineAccessFromFormFields(),
        },
        folderId: file?.folderId ?? 0,
        fileId: file?.id ?? 0,
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
          queryClient.invalidateQueries({
            queryKey: [QUERY_KEY_FOR_ALL_ASSIGNED_FILES],
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
      title={"Edit File"}
      style={{ top: 20 }}
    >
      <Form
        layout="vertical"
        form={form}
        onFinish={handleSubmit}
        requiredMark={false}
      >
        <FormFolderInput
          Form={Form}
          control={{ name: "folderId", label: "Folder" }}
        />
        <Form.Item
          rules={textInputValidationRules}
          name="name"
          label="File Name"
        >
          <Input placeholder="File Name" />
        </Form.Item>
        <Form.Item
          rules={textInputValidationRulesOp}
          name="description"
          label="Description (optional)"
        >
          <Input.TextArea placeholder="Description" />
        </Form.Item>
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

        <div className={boxStyle}>
          <FileUpload
            allowedFileTypes={[
              "image/jpeg",
              "image/png",
              "image/jpg",
              "application/pdf",
              "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
              "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
              "text/csv",
              "text/plain",
            ]}
            fileKey="documentUrl"
            textToDisplay="Upload File"
            displayType="form-space-between"
          />
        </div>

        <div className="flex justify-end">
          <AppButton type="submit" isLoading={isLoading} />
        </div>
      </Form>
    </Modal>
  );
};
