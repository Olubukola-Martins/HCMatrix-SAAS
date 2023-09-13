import React from "react";
import { PageIntro } from "components/layout/PageIntro";
import PayrollSubNav from "../components/PayrollSubNav";
import { appRoutes } from "config/router/paths";
import PayrollReportTemplate from "../components/payrollReports/templates/PayrollReportTemplate";
import PageSubHeader from "components/layout/PageSubHeader";
import { useNavigate } from "react-router-dom";
import { useCreateFolder } from "features/self-service/features/documents/hooks/useCreateFolder";
import { QUERY_KEY_FOR_FOLDERS } from "features/self-service/features/documents/hooks/useGetFolders";
import { useQueryClient } from "react-query";
import { openNotification } from "utils/notifications";
import {
  TAddPayrollTemplateData,
  useAddPayrollTemplate,
} from "../hooks/templates/useAddPayrollTemplate";

const CreatePayrollReportTemplate = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate, isLoading } = useAddPayrollTemplate();

  const createTemplate = (data: TAddPayrollTemplateData) => {
    mutate(
      {
        type: "payroll",
        data,
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
            queryKey: [QUERY_KEY_FOR_FOLDERS],
            // exact: true,
          });
          navigate(appRoutes.payrollReport);
        },
      }
    );
  };
  return (
    <>
      <PayrollSubNav />
      <div className="Container flex flex-col gap-4">
        <PageIntro
          title="Create Payroll Report Template"
          link={appRoutes.payrollReport}
        />
        <PageSubHeader
          hideBackground
          description={`Create a template that will be used to create your reports`}
        />
        <PayrollReportTemplate
          handleSubmit={{ fn: createTemplate, isLoading }}
        />
      </div>
    </>
  );
};

export default CreatePayrollReportTemplate;
