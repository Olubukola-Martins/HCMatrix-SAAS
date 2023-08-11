import { PageIntro } from "components/layout/PageIntro";
import PayrollSubNav from "../components/PayrollSubNav";
import { appRoutes } from "config/router/paths";
import { Tabs } from "antd";
import { TPayrollSchemeType } from "../types/payrollSchemes";
import { useState } from "react";
import { useGetAllPayrollsByScheme } from "../hooks/payroll/useGetAllPayrollsByScheme";
import { usePagination } from "hooks/usePagination";
import { CreatePayrollButton } from "../components/payrollCreations/CreatePayrollButton";
import { PayrollTable } from "../components/payroll/PayrollTable";

const ListOfPayrollsPage = () => {
  return (
    <>
      <PayrollSubNav />
      <div className="Container">
        <PageIntro title="Payroll Cycle" link={appRoutes.payrollHome} />
        <ListOfPayrollsContainer />
      </div>
    </>
  );
};
const ListOfPayrollsContainer = () => {
  const [scheme, setScheme] = useState<TPayrollSchemeType>("office");
  const { pagination, onChange } = usePagination();
  const { data, isFetching } = useGetAllPayrollsByScheme({
    data: { pagination },
    schemeType: scheme,
  });
  const tabItems = [
    {
      key: "office",
      label: "Office",
    },
    {
      key: "direct-salary",
      label: "Direct Salary",
    },
    {
      key: "project",
      label: "Project",
    },
    {
      key: "wages",
      label: "Wages",
    },
  ].map((item) => ({
    ...item,
    children: (
      <PayrollTable
        data={data?.data}
        total={data?.total}
        onChange={onChange}
        loading={isFetching}
        pagination={pagination}
        isProject={item.key === "project"}
      />
    ),
  }));
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col mt-5 gap-2 md:flex-row md:justify-between md:items-center  p-2 rounded text-sm">
        <p>{`You can create and manage payrolls`}</p>
        <CreatePayrollButton />
      </div>
      <Tabs
        activeKey={scheme}
        onChange={(val) => setScheme(val as unknown as TPayrollSchemeType)}
        items={tabItems}
      />
    </div>
  );
};

export default ListOfPayrollsPage;
