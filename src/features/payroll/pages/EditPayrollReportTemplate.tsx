import React from "react";
import { PageIntro } from "components/layout/PageIntro";
import PayrollSubNav from "../components/PayrollSubNav";
import { appRoutes } from "config/router/paths";
import PayrollReportTemplate from "../components/payrollReports/templates/PayrollReportTemplate";
import PageSubHeader from "components/layout/PageSubHeader";
import { useNavigate, useParams } from "react-router-dom";
import { QUERY_KEY_FOR_FOLDERS } from "features/self-service/features/documents/hooks/useGetFolders";
import { useQueryClient } from "react-query";
import { openNotification } from "utils/notifications";
import { Skeleton } from "antd";
import { useUpdatePayrollTemplate } from "../hooks/templates/useUpdatePayrollTemplate";
import { TAddPayrollTemplateData } from "../hooks/templates/useAddPayrollTemplate";
import { ErrorWrapper } from "components/errorHandlers/ErrorWrapper";
import { useGetSinglePayrollTemplate } from "../hooks/templates/useGetSinglePayrollTemplate";
import { removeObjectKeys } from "utils/dataHelpers/removeObjectKeys";

const EditPayrollReportTemplate = () => {
  const params = useParams();
  const entityId: number = +(params.id as unknown as string);
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate, isLoading } = useUpdatePayrollTemplate();
  const { data, isFetching, isError } = useGetSinglePayrollTemplate({
    templateId: entityId,
    type: "payroll",
  });

  const editTemplate = (data: TAddPayrollTemplateData) => {
    const parsedData = removeObjectKeys(data, [
      "employeeInformation",
      "payrollInformation",
    ]);
    mutate(
      {
        id: entityId,
        type: "payroll",
        data: {
          ...parsedData,
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
        {/* TODO: Fetch the template name from api and also pass the template to templateComp */}
        <Skeleton loading={isFetching} active paragraph={{ rows: 9 }}>
          <ErrorWrapper
            message="Payroll Template not found"
            isError={isError}
            backLink={appRoutes.payrollReport}
          >
            <>
              {" "}
              <PageIntro
                title={`${data?.name} payroll template`}
                link={appRoutes.payrollReport}
              />
              <PageSubHeader
                hideBackground
                description={`You can now view this  template`}
              />
              {/* TODO: Style select boxes that are disabled to be grayed out */}
              {data && (
                <PayrollReportTemplate
                  template={{ ...data }}
                  handleSubmit={{ fn: editTemplate, isLoading: isLoading }}
                />
              )}
            </>
          </ErrorWrapper>
        </Skeleton>
      </div>
    </>
  );
};

export default EditPayrollReportTemplate;
