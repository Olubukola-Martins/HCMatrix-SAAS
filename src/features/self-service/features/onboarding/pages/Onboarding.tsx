import { Table } from "antd";
import { ColumnsType } from "antd/lib/table";
import { PageIntro } from "components/layout/PageIntro";
import { appRoutes } from "config/router/paths";
import SelfServiceSubNav from "features/self-service/components/SelfServiceSubNav";
import { useApiAuth } from "hooks/useApiAuth";
import { Link } from "react-router-dom";
import { useFetchAllOnboarding } from "../hooks/useFetchAllOnboarding";
import { TOnboarding } from "../types";

const Onboarding = () => {
  const columns: ColumnsType<TOnboarding> = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (_, item) => (
        <span className="capitalize">
          {item.employee.firstName} {item.employee.lastName}
        </span>
      ),
    },

    {
      title: "Employee ID",
      dataIndex: "EmployeeID",
      key: "EmployeeID",
      render: (_, item) => (
        <span className="uppercase">{item.employee.empUid}</span>
      ),
    },
    {
      title: "Department",
      dataIndex: "department",
      key: "department",
      render: (_, item) => (
        <span className="capitalize">
          {item.employee.designation?.department.name}
        </span>
      ),
    },
    {
      title: "Email",
      dataIndex: "Email",
      key: "Email",
      render: (_, item) => (
        <span className="lowercase">{item.employee.email}</span>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (val) => <span className="capitalize">{val}</span>,
    },
    {
      title: "Action",
      key: "Action",
      width: 100,
      fixed: "right",
      render: (val, item) => (
        <div className="cursor-pointer">
          <Link to={appRoutes.startOnBoarding(item.id).path}>
            <button className="transparentButton text-caramel">Start</button>
          </Link>
        </div>
      ),
    },
  ];

  const { token, companyId } = useApiAuth();
  const { data, isLoading } = useFetchAllOnboarding({
    companyId,

    token,
  });
  return (
    <>
      <SelfServiceSubNav />
      <div className="Container">
        <PageIntro link={appRoutes.selfServiceHome} title="Onboarding" />

        <div className="flex items-center gap-4 justify-end">
          <button className="button">Start</button>
          <button className="transparentButton text-caramel">
            Mark as completed
          </button>
        </div>

        <div className="mt-7">
          <Table
            dataSource={data?.data}
            loading={isLoading}
            columns={columns}
            scroll={{ x: "max-content" }}
          />
        </div>
      </div>
    </>
  );
};

export default Onboarding;
