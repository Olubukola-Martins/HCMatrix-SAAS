import { Pagination, Skeleton } from "antd";
import { usePagination } from "hooks/usePagination";
import { TemplateCard } from "components/cards/TemplateCard";
import { useNavigate } from "react-router-dom";
import { appRoutes } from "config/router/paths";
import { useState } from "react";
import DeletePayslipTemplate from "./DeletePayslipTemplate";
import { useGetPayrollTemplates } from "features/payroll/hooks/templates/useGetPayrollTemplates";
import { TPayrollTemplateListData } from "features/payroll/types/template";

export const PayslipTemplateList: React.FC = () => {
  const { pagination, onChange } = usePagination({ pageSize: 8 });
  const { data, isFetching } = useGetPayrollTemplates({
    type: "payslip",
    data: {
      pagination,
    },
  });

  const handleDelete = (data: { template: TPayrollTemplateListData }) => {
    setAction("delete");
    setTemplate(data.template);
  };
  const navigate = useNavigate();
  const [template, setTemplate] = useState<TPayrollTemplateListData>();
  const [action, setAction] = useState<"delete">();
  return (
    <>
      {template && (
        <DeletePayslipTemplate
          open={action === "delete"}
          handleClose={() => setAction(undefined)}
          data={template}
        />
      )}
      <div>
        <Skeleton loading={isFetching}>
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
              {data?.data.map((item) => (
                <TemplateCard
                  data={{
                    name: item.name,
                    title: "Payslip",
                    link: appRoutes.viewPayslipTemplate(item.id).path,
                  }}
                  key={item.id}
                  handleDelete={{
                    fn: () => handleDelete({ template: { ...item } }),
                  }}
                  handleEdit={{
                    fn: () =>
                      navigate(appRoutes.editPayslipTemplate(item.id).path),
                  }}
                />
              ))}
            </div>
            <div className="mt-4 flex justify-end">
              <Pagination {...pagination} onChange={onChange} size="small" />
            </div>
          </>
        </Skeleton>
      </div>
    </>
  );
};
