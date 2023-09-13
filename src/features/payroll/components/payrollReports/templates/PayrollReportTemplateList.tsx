import { Pagination, Skeleton } from "antd";

import { usePagination } from "hooks/usePagination";

import { TemplateCard } from "components/cards/TemplateCard";
import { useNavigate } from "react-router-dom";
import { appRoutes } from "config/router/paths";
import DeletePayrollReportTemplate from "./DeletePayrollReportTemplate";
import { useState } from "react";
import { useGetPayrollTemplates } from "features/payroll/hooks/templates/useGetPayrollTemplates";
import { TPayrollTemplateListData } from "features/payroll/types/template";

export const PayrollReportTemplateList: React.FC = () => {
  const { pagination, onChange } = usePagination({ pageSize: 8 });
  const { data, isFetching } = useGetPayrollTemplates({
    data: { pagination },
    type: "payroll",
  });

  const handleDelete = (data: { template: TPayrollTemplateListData }) => {
    console.log("WHY");
    setAction("delete");
    setTemplate(data.template);
  };
  const navigate = useNavigate();
  const [template, setTemplate] = useState<TPayrollTemplateListData>();
  const [action, setAction] = useState<"delete">();
  return (
    <>
      {template && (
        <DeletePayrollReportTemplate
          open={action === "delete"}
          handleClose={() => setAction(undefined)}
          data={template}
        />
      )}
      <div>
        <Skeleton loading={isFetching} paragraph={{ rows: 12 }}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {data?.data.map((item) => (
              <TemplateCard
                data={{
                  name: item.name,
                  title: "Payroll Report",
                  link: appRoutes.viewPayrollReportTemplate(5).path,
                }}
                key={item.id}
                handleDelete={{
                  fn: () => handleDelete({ template: { ...item } }),
                }}
                handleEdit={{
                  fn: () =>
                    navigate(appRoutes.editPayrollReportTemplate(item.id).path),
                }}
              />
            ))}
          </div>
          <div className="mt-4 flex justify-end">
            <Pagination
              {...{ ...pagination, total: data?.total }}
              onChange={onChange}
              size="small"
            />
          </div>
        </Skeleton>
      </div>
    </>
  );
};
