import React from "react";
import { PageIntro } from "components/layout/PageIntro";
import PayrollSubNav from "../components/PayrollSubNav";
import { appRoutes } from "config/router/paths";
import PageSubHeader from "components/layout/PageSubHeader";
import { useNavigate } from "react-router-dom";
import { useCreateFolder } from "features/self-service/features/documents/hooks/useCreateFolder";
import { QUERY_KEY_FOR_FOLDERS } from "features/self-service/features/documents/hooks/useGetFolders";
import { useQueryClient } from "react-query";
import { openNotification } from "utils/notifications";
import { Skeleton } from "antd";
import PayslipTemplate from "../components/payslips/templates/PayslipTemplate";

const EditPayslipTemplate = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate, isLoading } = useCreateFolder();

  const editTemplate = (data: any) => {
    mutate(
      {
        name: data.name,
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
        <Skeleton loading={false} active paragraph={{ rows: 9 }}>
          <PageIntro
            title="Edit Payslip Template"
            link={appRoutes.payrollReport}
          />
          <PageSubHeader
            hideBackground
            description={`You can now edit this _ template`}
          />
          <PayslipTemplate handleSubmit={{ fn: editTemplate, isLoading }} />
        </Skeleton>
      </div>
    </>
  );
};

export default EditPayslipTemplate;
