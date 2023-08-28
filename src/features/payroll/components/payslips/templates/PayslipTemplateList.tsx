import { Pagination } from "antd";

import { usePagination } from "hooks/usePagination";

import { TemplateCard } from "components/cards/TemplateCard";
import { useNavigate } from "react-router-dom";
import { appRoutes } from "config/router/paths";
import { useState } from "react";
import DeletePayslipTemplate from "./DeletePayslipTemplate";

type TTemplate = any;
export const PayslipTemplateList: React.FC = () => {
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
        <DeletePayslipTemplate
          open={action === "delete"}
          handleClose={() => setAction(undefined)}
          data={template}
        />
      )}
      <div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {Array(8)
            .fill(0)
            .map((item, i) => (
              <TemplateCard
                data={{
                  name: `Template ${i + 1}`,
                  title: "Payslip",
                  link: appRoutes.viewPayslipTemplate(5).path,
                }}
                key={i}
                handleDelete={{
                  fn: () => handleDelete({ template: { name: "Template 1" } }),
                }}
                handleEdit={{
                  fn: () => navigate(appRoutes.editPayslipTemplate(5).path),
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
