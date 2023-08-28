import { Pagination } from "antd";

import { usePagination } from "hooks/usePagination";

import { TAsset } from "features/self-service/features/assets/types";
import { TemplateCard } from "components/cards/TemplateCard";
import { useNavigate } from "react-router-dom";
import { appRoutes } from "config/router/paths";
import DeletePayrollReportTemplate from "./DeletePayrollReportTemplate";
import { useState } from "react";

type TTemplate = any;
export const PayrollReportTemplateList: React.FC<{ asset: TAsset }> = ({
  asset,
}) => {
  const { pagination, onChange } = usePagination({ pageSize: 8 });

  const handleDelete = (data: { template: TTemplate }) => {
    console.log("WHY");
    setAction("delete");
    setTemplate(data.template);
  };
  const navigate = useNavigate();
  const [template, setTemplate] = useState<TTemplate>();
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {asset.documentUrls?.map((item, i) => (
            <TemplateCard
              data={{
                name: `Template ${i + 1}`,
                title: "Payroll Report",
                link: appRoutes.viewPayrollReportTemplate(5).path,
              }}
              key={i}
              handleDelete={{
                fn: () => handleDelete({ template: { name: "Template 1" } }),
              }}
              handleEdit={{
                fn: () => navigate(appRoutes.editPayrollReportTemplate(5).path),
              }}
            />
          ))}
        </div>
        <div className="mt-4 flex justify-end">
          <Pagination {...pagination} onChange={onChange} size="small" />
        </div>
      </div>
    </>
  );
};
