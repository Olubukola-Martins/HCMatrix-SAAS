import React, { useState } from "react";
import type { ColumnsType } from "antd/es/table";
import { usePagination } from "hooks/usePagination";
import { Table } from "antd";
import { useGetHMOPlans } from "../../../hooks/hmoPlan/useGetHMOPlans";
import { THMOPlan } from "../../../types/hmoPlan";
import { ViewHMOPlan } from "./ViewHMOPlan";
import { EditHMOPlan } from "./EditHMOPlan";
import { DeleteHMOPlan } from "./DeleteHMOPlan";
import { HMO_PLAN_TABLE_COLUMNS } from "../../columns/hmo-plan";
import { TableFocusTypeBtn } from "components/table";

export type THMOPlanAction = "edit" | "view" | "delete";
export const HMOPlansTable: React.FC<{
  search?: string;
}> = ({ search }) => {
  const [hmoPlan, setHmoPlan] = useState<THMOPlan>();
  const [action, setAction] = useState<THMOPlanAction>();
  const { pagination, onChange } = usePagination();
  const { data, isFetching } = useGetHMOPlans({
    pagination,
    searchParams: { name: search },
  });
  const handleAction = (action: THMOPlanAction, plan: THMOPlan) => {
    setAction(action);
    setHmoPlan(plan);
  };

  const columns: ColumnsType<THMOPlan> = HMO_PLAN_TABLE_COLUMNS(handleAction);
  const [selectedColumns, setSelectedColumns] =
    useState<ColumnsType<THMOPlan>>(columns);
  return (
    <div>
      <ViewHMOPlan
        handleClose={() => setAction(undefined)}
        hmoPlan={hmoPlan}
        open={action === "view"}
      />
      <EditHMOPlan
        handleClose={() => setAction(undefined)}
        hmoPlan={hmoPlan}
        open={action === "edit"}
      />
      <DeleteHMOPlan
        handleClose={() => setAction(undefined)}
        plan={hmoPlan}
        open={action === "delete"}
      />
      <div className="flex justify-end">
        {TableFocusTypeBtn<THMOPlan>({
          selectedColumns,
          setSelectedColumns,
          data: {
            columns,
          },
        })}
      </div>
      <Table
        size="small"
        dataSource={data?.data}
        loading={isFetching}
        columns={selectedColumns}
        pagination={{ ...pagination, total: data?.total }}
        onChange={onChange}
      />
    </div>
  );
};
