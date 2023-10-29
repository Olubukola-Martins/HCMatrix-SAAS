import React, { useEffect, useState } from "react";
import {
  QUERY_KEY_FOR_SINGLE_COMPANY,
  useGetCompany,
} from "../hooks/useGetCompany";
import { Skeleton, Avatar, Form, Button, Typography } from "antd";
import { useUpdateCompany } from "../hooks/useUpdateCompany";
import { AppButton } from "components/button/AppButton";
import { FormFileInput } from "components/generalFormInputs/FormFileInput";
import { openNotification } from "utils/notifications";
import { useQueryClient } from "react-query";
import { bulkUploadFiles } from "hooks/useUploadFile";
import { useApiAuth } from "hooks/useApiAuth";
import { UploadOutlined } from "@ant-design/icons";

const CompanyLogoForm = () => {
  const { data: company, isFetching: isFetchingCompany } = useGetCompany();
  const [action, setAction] = useState<"view" | "edit">("view");
  useEffect(() => {
    if (company?.logoUrl) {
      setAction("view");
    } else {
      setAction("edit");
    }
  }, [company]);

  return (
    <Skeleton active loading={isFetchingCompany} avatar paragraph={false}>
      {action === "view" && (
        <div className="flex relative">
          <Avatar src={company?.logoUrl} size={100} />
          <i
            className="ri-pencil-line cursor-pointer hover:text-caramel"
            onClick={() => setAction("edit")}
          />
        </div>
      )}
      {action === "edit" && <LogoForm onCancel={() => setAction("view")} />}
    </Skeleton>
  );
};

const LogoForm: React.FC<{ onCancel: () => void }> = ({ onCancel }) => {
  const { mutate, isLoading } = useUpdateCompany();
  const queryClient = useQueryClient();
  const [form] = Form.useForm();
  const { companyId, token } = useApiAuth();
  const [isUploadingFile, setIsUploadingFile] = useState(false);
  const handleSubmit = async (data: any) => {
    setIsUploadingFile(true);
    const logoRes = await bulkUploadFiles({
      auth: { companyId, token },
      data: { files: data.logo },
    });
    setIsUploadingFile(false);
    mutate(
      {
        logoUrl: logoRes[0],
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
          onCancel();
          queryClient.invalidateQueries({
            queryKey: [QUERY_KEY_FOR_SINGLE_COMPANY],
            // exact: true,
          });
        },
      }
    );
  };

  return (
    <div>
      <Form
        form={form}
        onFinish={handleSubmit}
        requiredMark={false}
        labelCol={{ span: 24 }}
        className="flex flex-col items-center"
      >
        <FormFileInput
          Form={Form}
          ruleOptions={{
            required: true,
            allowedFileTypes: ["image/jpeg", "image/png", "image/jpg"],
          }}
          triggerComp={
            <div className="flex flex-col items-center">
              <Button
                shape="circle"
                size={"large"}
                icon={<UploadOutlined />}
                className="text-3xl"
              />
              <Typography.Text>{"Upload Logo"}</Typography.Text>
            </div>
          }
          name={"logo"}
        />
        <div className="flex gap-4">
          <AppButton
            label="Cancel"
            handleClick={() => onCancel()}
            variant="transparent"
          />
          <AppButton
            label="Save"
            type="submit"
            isLoading={isUploadingFile || isLoading}
          />
        </div>
      </Form>
    </div>
  );
};

export default CompanyLogoForm;
