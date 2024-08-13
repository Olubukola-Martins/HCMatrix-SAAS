import { Form } from "antd";
import { AppButton } from "components/button/AppButton";
import { useState } from "react";
import { RepaymentPlan } from "./RepaymentPlan";
import { useGetLoanPaymentPlans } from "../../../hooks/paymentPlan/useGetPaymentPlans";
import { usePagination } from "hooks/usePagination";
import { ColumnsType } from "antd/es/table";
import { TPaymentPlan } from "../../../types";
import { Table } from "antd/lib";
import { DeleteRepaymentPlan } from "./DeleteRepaymentPlan";

export const PaymentPlan = () => {
  const [addNewPlan, setAddNewPlan] = useState(false);
  const { pagination, onChange } = usePagination({ pageSize: 5 });
  const [loanPlanId, setLoanPlanId] = useState<number>();
  const [useOpenDelete, setUseOpenDelete] = useState(false);
  const { data, isLoading } = useGetLoanPaymentPlans({ pagination });

  const handleLoanPlan = (id: number) => {
    setLoanPlanId(id);
    setAddNewPlan(true);
  };

  const handleAddLoanPlan = () => {
    setLoanPlanId(undefined);
    setAddNewPlan(true);
  };

  const handleLoanPlanDelete = (id: number) => {
    setLoanPlanId(id);
    setUseOpenDelete(true);
  };

  const columns: ColumnsType<TPaymentPlan> = [
    {
      title: "Plan Name",
      dataIndex: "name",
    },
    {
      title: "Duration",
      dataIndex: "duration",
    },
    {
      title: "Action",
      render: (_, val) => (
        <div className="flex items-center gap-4">
          <i
            className="ri-pencil-line hover:text-caramel cursor-pointer text-lg"
            onClick={() => handleLoanPlan(val.id)}
          ></i>
          <i
            onClick={() => handleLoanPlanDelete(val.id)}
            className="ri-delete-bin-line hover:text-caramel cursor-pointer text-lg"
          ></i>
        </div>
      ),
    },
  ];

  return (
    <div>
      <RepaymentPlan
        open={addNewPlan}
        handleClose={() => setAddNewPlan(true)}
        id={loanPlanId}
      />

      <DeleteRepaymentPlan
        open={useOpenDelete}
        id={loanPlanId}
        handleClose={() => setUseOpenDelete(false)}
      />

      <AppButton label="Add Plan" handleClick={() => setAddNewPlan(true)} />

      <Table
        columns={columns}
        dataSource={data?.data}
        loading={isLoading}
        className="mt-5"
        pagination={{ ...pagination, total: data?.total }}
        onChange={onChange}
      />
    </div>
  );
};
