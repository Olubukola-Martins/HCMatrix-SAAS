import { Collapse, Form, Skeleton, Typography } from "antd";
import { AppButton } from "components/button/AppButton";
import { FormFileInput } from "components/generalFormInputs/FormFileInput";
import { useApiAuth } from "hooks/useApiAuth";
import { bulkUploadFiles } from "hooks/useUploadFile";
import { useEffect, useState } from "react";
import { useSaveCompanyParamDocuments } from "../hooks/useSaveCompanyParamDocuments";
import { useQueryClient } from "react-query";
import { openNotification } from "utils/notifications";
import {
  QUERY_KEY_FOR_COMPANY_PARAMETER_DOCUMENTS,
  useGetCompanyParamDocuments,
} from "../hooks/useGetCompanyParamDocuments";

const CompanyDocumentsAccordion = () => {
  const { data, isFetching } = useGetCompanyParamDocuments();
  const [action, setAction] = useState<"view" | "edit">("view");
  useEffect(() => {
    if (data?.value.companyHandBook) {
      setAction("view");
    } else {
      setAction("edit");
    }
  }, [data]);

  return (
    <div className="">
      <Collapse defaultActiveKey={["3"]} expandIconPosition="end">
        <Collapse.Panel
          header={
            <Typography.Title level={5}>Company Documents</Typography.Title>
          }
          key="3"
        >
          <Skeleton active paragraph={{ rows: 4 }} loading={isFetching}>
            {action === "edit" && (
              <CompanyDocumentsForm onCancel={() => setAction("view")} />
            )}
            {action === "view" && data && (
              <ViewCompanyDocuments
                onEdit={() => setAction("edit")}
                data={[
                  {
                    name: "Company Handbook",
                    url: data?.value.companyHandBook,
                  },
                ]}
              />
            )}
          </Skeleton>
        </Collapse.Panel>
      </Collapse>
    </div>
  );
};
const ViewCompanyDocuments: React.FC<{
  data: { name: string; url: string }[];
  onEdit: () => void;
}> = ({ data, onEdit }) => {
  return (
    <div className="flex gap-2">
      <div className="grid md:grid-cols-3 gap-4 flex-1">
        {data.map((item) => (
          <a
            href={item.url}
            className="text-caramel underline hover:text-black"
          >
            {item.name}
          </a>
        ))}
      </div>
      <i
        className="ri-pencil-line cursor-pointer hover:text-caramel"
        onClick={onEdit}
      />
    </div>
  );
};
const CompanyDocumentsForm: React.FC<{ onCancel: () => void }> = ({
  onCancel,
}) => {
  const { mutate, isLoading } = useSaveCompanyParamDocuments();
  const queryClient = useQueryClient();
  const { companyId, token } = useApiAuth();
  const [isUploadingFile, setIsUploadingFile] = useState(false);
  const handleSubmit = async (data: any) => {
    setIsUploadingFile(true);
    const companyHandbookRes = await bulkUploadFiles({
      auth: { companyId, token },
      data: { files: data.companyHandbook },
    });
    setIsUploadingFile(false);
    mutate(
      {
        companyHandBook: companyHandbookRes[0],
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

          queryClient.invalidateQueries({
            queryKey: [QUERY_KEY_FOR_COMPANY_PARAMETER_DOCUMENTS],
            // exact: true,
          });
        },
      }
    );
  };
  return (
    <Skeleton active loading={false} paragraph={{ rows: 8 }}>
      <Form
        requiredMark={false}
        labelCol={{ span: 24 }}
        onFinish={handleSubmit}
      >
        <div className="flex flex-col gap-4">
          <div className="grid md:grid-cols-3 gap-4">
            <FormFileInput
              Form={Form}
              label={`Company Handbook`}
              name="companyHandbook"
              ruleOptions={{
                allowedFileTypes: [
                  "application/pdf",
                  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
                ],
                required: true,
              }}
            />
          </div>
          <div className="flex justify-end gap-4">
            <AppButton
              label="Cancel"
              variant="transparent"
              handleClick={onCancel}
            />
            <AppButton
              label="Save"
              isLoading={isUploadingFile || isLoading}
              type="submit"
            />
          </div>
        </div>
      </Form>
    </Skeleton>
  );
};

export default CompanyDocumentsAccordion;
