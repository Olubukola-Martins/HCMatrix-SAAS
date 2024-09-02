import { Cascader, Checkbox, Form, Input, Modal, Skeleton } from "antd";
import { AppButton } from "components/button/AppButton";
import React, { useEffect, useState } from "react";
import { IModalProps } from "types";
import {
  textInputValidationRules,
  textInputValidationRulesOp,
} from "utils/formHelpers/validation";
import { openNotification } from "utils/notifications";
import { useQueryClient } from "react-query";
import { TFileData, useCreateFile } from "../../hooks/file/useCreateFile";
import { QUERY_KEY_FOR_FILES_IN_A_FOLDER } from "../../hooks/file/useGetFilesInFolder";
import { FormFolderInput } from "../folders/FormFolderInput";
import { FileUpload } from "components/FileUpload";
import { boxStyle } from "styles/reused";
import { useCurrentFileUploadUrl } from "hooks/useCurrentFileUploadUrl";

import { QUERY_KEY_FOR_FOLDERS } from "../../hooks/useGetFolders";
import { FormGroupInput } from "features/core/groups/components/FormGroupInput";
import { FormDepartmentInput } from "features/core/departments/components/FormDepartmentInput";
import { FormRoleInput } from "features/core/roles-and-permissions/components/FormRoleInput";
import { FormEmployeeInput } from "features/core/employees/components/FormEmployeeInput";


interface IProps extends IModalProps {}
export interface FileAccessOption {
  value: number | string;
  label: string;
  children?: FileAccessOption[];
  disabled?: boolean;
}


type TFileEntities = "group" | "department" | "employee" | "role";

export const AddFile: React.FC<IProps> = ({ open, handleClose, id }) => {
  const queryClient = useQueryClient();
  const [form] = Form.useForm();
  const { mutate, isLoading } = useCreateFile();
  const documentUrl = useCurrentFileUploadUrl("documentUrl");
  const [entities, setEntities] = useState<TFileEntities[]>([]);

  useEffect(() => {
    form.setFieldsValue({
      folderId: id,
    });
  }, [id]);

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
    if (documentUrl) {
      mutate(
        {
          folderId: id ? id : data.folderId,
          data: {
            access: defineAccessFromFormFields(),

            description: data.description,
            url: documentUrl,
            name: data.name,
          },
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
              // duration: 0.4,
            });
            form.resetFields();
            handleClose();

            queryClient.invalidateQueries({
              queryKey: [QUERY_KEY_FOR_FILES_IN_A_FOLDER],
            });
            queryClient.invalidateQueries({
              queryKey: [QUERY_KEY_FOR_FOLDERS],
            });
            queryClient.invalidateQueries({
              queryKey: [QUERY_KEY_FOR_FILES_IN_A_FOLDER],
            });
          },
        }
      );
    } else {
      openNotification({
        state: "error",
        title: "No File Uploaded",
        description: `Please upload a file to proceed!`,
      });
    }
  };

  const [FileAccessOptions, setFileAccessOptions] = useState<
    FileAccessOption[]
  >([]);

  return (
    <Modal
      open={open}
      onCancel={() => handleClose()}
      footer={null}
      title={"Add File"}
      style={{ top: 20 }}
    >
      {/* <Skeleton
        active
        // loading={}
        paragraph={{ rows: 7 }}
      > */}
      <Form
        layout="vertical"
        form={form}
        onFinish={handleSubmit}
        requiredMark={false}
      >
        <FormFolderInput
          Form={Form}
          control={{ name: "folderId", label: "Folder" }}
          disabled={id ? true : false}
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
        <Form.Item label="Assign File to">
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
      {/* </Skeleton> */}
    </Modal>
  );
};
