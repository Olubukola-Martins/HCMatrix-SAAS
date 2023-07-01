import { Collapse, Form, Input, Modal, Skeleton } from "antd";
import { AppButton } from "components/button/AppButton";
import React, { useEffect } from "react";
import { IModalProps } from "types";
import {
  textInputValidationRules,
  textInputValidationRulesOp,
} from "utils/formHelpers/validation";
import { openNotification } from "utils/notifications";
import { useQueryClient } from "react-query";

import { QUERY_KEY_FOR_FILES_IN_A_FOLDER } from "../hooks/file/useGetFilesInFolder";
import { CaretRightOutlined } from "@ant-design/icons";
import { FileUpload } from "components/FileUpload";
import { boxStyle } from "styles/reused";
import { useCurrentFileUploadUrl } from "hooks/useCurrentFileUploadUrl";

import { useGetSingleFileInFolder } from "../hooks/file/useGetSingleFileInFolder";
import { useUpdateFile } from "../hooks/file/useUpdateFile";
import { useGetAllAccessToFile } from "../hooks/file/access/useGetAllAccessToFile";
import { usePagination } from "hooks/usePagination";
import { SingleFileAccessContainer } from "./SingleFileAccessContainer";

interface IProps extends IModalProps {
  fileId: number;
  folder: {
    name?: string;
    id: number;
  };
}

export const EditFile: React.FC<IProps> = ({
  open,
  handleClose,
  fileId,
  folder,
}) => {
  return (
    <Modal
      open={open}
      onCancel={() => handleClose()}
      footer={null}
      title={"Edit File"}
      style={{ top: 20 }}
    >
      <div className="flex flex-col gap-4">
        <FileContentContainer folder={folder} fileId={fileId} />
        <FileAccessContainer folderId={folder.id} fileId={fileId} />
      </div>
    </Modal>
  );
};

const FileContentContainer: React.FC<{
  fileId: number;
  folder: {
    name?: string;
    id: number;
  };
}> = ({ fileId, folder }) => {
  const queryClient = useQueryClient();

  const [form] = Form.useForm();
  const { mutate, isLoading } = useUpdateFile();
  const documentUrl = useCurrentFileUploadUrl("documentUrl");
  const handleSubmit = (data: any) => {
    if (documentUrl) {
      mutate(
        {
          folderId: data.folderId,
          fileId,
          data: {
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
  const { data: file, isFetching: isFetchingFile } = useGetSingleFileInFolder({
    fileId,
    folderId: folder.id,
  });

  useEffect(() => {
    if (file) {
      form.setFieldsValue({
        name: file?.name,
        description: file.description,
      });
    }
  }, [form, file]);

  return (
    <Collapse
      bordered={false}
      defaultActiveKey={["1"]}
      expandIcon={({ isActive }) => (
        <CaretRightOutlined
          rotate={isActive ? 90 : 0}
          className="relative -top-2"
        />
      )}
      className="site-collapse-custom-collapse"
    >
      <Collapse.Panel
        header="File Content"
        key="0"
        className="site-collapse-custom-panel"
      >
        <Skeleton active loading={isFetchingFile} paragraph={{ rows: 7 }}>
          <Form
            layout="vertical"
            form={form}
            onFinish={handleSubmit}
            requiredMark={false}
          >
            <Form.Item label="Folder">
              <Input placeholder="Folder Name" value={folder.name} disabled />
            </Form.Item>
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
            <div className={boxStyle}>
              <FileUpload
                allowedFileTypes={[
                  "image/jpeg",
                  "image/png",
                  "image/jpg",
                  "application/pdf",
                  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
                  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
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
      </Collapse.Panel>
    </Collapse>
  );
};

const FileAccessContainer: React.FC<{ fileId: number; folderId: number }> = ({
  folderId,
  fileId,
}) => {
  const { pagination } = usePagination();
  const { data: access, isFetching: isFetchingAccess } = useGetAllAccessToFile({
    fileId,
    folderId,
    data: { pagination },
  });
  return (
    <Collapse
      bordered={false}
      defaultActiveKey={["1"]}
      expandIcon={({ isActive }) => (
        <CaretRightOutlined
          rotate={isActive ? 90 : 0}
          className="relative -top-2"
        />
      )}
      className="site-collapse-custom-collapse"
    >
      <Collapse.Panel
        header="File Access"
        key="1"
        className="site-collapse-custom-panel"
      >
        <Skeleton loading={isFetchingAccess} paragraph={{ rows: 4 }}>
          {
            <SingleFileAccessContainer
              data={access?.data}
              folderId={folderId}
              fileId={fileId}
            />
          }
        </Skeleton>
      </Collapse.Panel>
    </Collapse>
  );
};
