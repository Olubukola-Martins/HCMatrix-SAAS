import { Cascader, Form, Input, Modal, Skeleton } from "antd";
import { AppButton } from "components/button/AppButton";
import React, { useEffect, useState } from "react";
import { IModalProps } from "types";
import {
  generalValidationRules,
  textInputValidationRules,
  textInputValidationRulesOp,
} from "utils/formHelpers/validation";
import { openNotification } from "utils/notifications";
import { useQueryClient } from "react-query";
import { useCreateFile } from "../hooks/file/useCreateFile";
import { QUERY_KEY_FOR_FILES_IN_A_FOLDER } from "../hooks/file/useGetFilesInFolder";
import { FormFolderInput } from "./FormFolderInput";
import { FileUpload } from "components/FileUpload";
import { boxStyle } from "styles/reused";
import { useCurrentFileUploadUrl } from "hooks/useCurrentFileUploadUrl";
import { useFetchDepartments } from "features/core/departments/hooks/useFetchDepartments";
import { useApiAuth } from "hooks/useApiAuth";
import { useFetchGroups } from "features/core/groups/hooks/useFetchGroups";
import { useFetchRoles } from "features/core/roles-and-permissions/hooks/useFetchRoles";

const SUITABLE_PAGE_SIZE_FOR_ENTITIES_TO_BE_DISPAYED = 250;

interface IProps extends IModalProps {}
export interface FileAccessOption {
  value: number | string;
  label: string;
  children?: FileAccessOption[];
  disabled?: boolean;
}

const displayRender = (
  labels: string[],
  //   selectedOptions?: FileAccessOption[]
  selectedOptions?: any //TO DO Refactor this code or might be no need as the use of showStrategy
) => {
  const options = selectedOptions ?? [];
  return labels.map((label, i) => {
    const option = options[i];
    if (i === labels.length - 1) {
      return <span key={option.value}>{label}</span>;
    }
    return <span key={option.value}>{label} / </span>;
  });
};
export const AddFile: React.FC<IProps> = ({ open, handleClose }) => {
  const queryClient = useQueryClient();

  const [form] = Form.useForm();
  const { mutate, isLoading } = useCreateFile();
  const documentUrl = useCurrentFileUploadUrl("documentUrl");

  const handleSubmit = (data: any) => {
    if (documentUrl) {
      mutate(
        {
          folderId: data.folderId,
          data: {
            access: data.access.map((item: [string, number], i: number) => ({
              type: item[0],
              entityId: item[1],
            })),
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
              // exact: true,
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

  const { companyId, token } = useApiAuth();
  const { data: departments, isFetching: isFetchingDepartments } =
    useFetchDepartments({
      pagination: {
        offset: 0,
        limit: SUITABLE_PAGE_SIZE_FOR_ENTITIES_TO_BE_DISPAYED,
      },
    });
  const { data: roles, isFetching: isFetchingRoles } = useFetchRoles({
    companyId,
    token,
    pagination: {
      offset: 0,
      limit: SUITABLE_PAGE_SIZE_FOR_ENTITIES_TO_BE_DISPAYED,
    },
  });
  const { data: groups, isFetching: isFetchingGroups } = useFetchGroups({
    pagination: {
      offset: 0,
      limit: SUITABLE_PAGE_SIZE_FOR_ENTITIES_TO_BE_DISPAYED,
    },
  });

  const [FileAccessOptions, setFileAccessOptions] = useState<
    FileAccessOption[]
  >([]);

  useEffect(() => {
    if (departments && roles && groups) {
      const groupOptions: FileAccessOption = {
        disabled: groups && groups.total === 0,
        label: "Group",
        value: "group",
        children: groups?.data?.map((item) => ({
          label: `${item.name}`,

          value: item.id as unknown as number,
        })),
      };
      const departmentOptions: FileAccessOption = {
        disabled: departments && departments.total === 0,
        label: "Department",
        value: "department",
        children: departments?.data?.map((item) => ({
          label: `${item.name}`,
          value: item.id as unknown as number,
        })),
      };
      const roleOptions: FileAccessOption = {
        disabled: roles && roles.total === 0,
        label: "Role",
        value: "role",
        children: roles?.data?.map((item) => ({
          label: `${item.name}`,

          value: item.id as unknown as number,
        })),
      };
      const options: FileAccessOption[] = [
        groupOptions,
        departmentOptions,
        roleOptions,
      ];

      setFileAccessOptions(options);
    }
  }, [departments, roles, groups]);

  return (
    <Modal
      open={open}
      onCancel={() => handleClose()}
      footer={null}
      title={"Add File"}
      style={{ top: 20 }}
    >
      <Skeleton
        active
        loading={isFetchingDepartments || isFetchingRoles || isFetchingGroups}
        paragraph={{ rows: 7 }}
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
            label="Description"
          >
            <Input.TextArea placeholder="Description" />
          </Form.Item>
          <Form.Item
            rules={generalValidationRules}
            name="access"
            label="Access"
          >
            <Cascader
              options={FileAccessOptions}
              multiple
              displayRender={displayRender}
              allowClear
              showCheckedStrategy="SHOW_CHILD"
            />
          </Form.Item>

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
      </Skeleton>
    </Modal>
  );
};
