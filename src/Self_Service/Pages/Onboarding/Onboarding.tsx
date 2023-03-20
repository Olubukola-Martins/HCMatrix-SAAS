import { Table } from "antd";
import {
  TOnboarding,
  useFetchAllOnboarding,
} from "ApiRequesHelpers/Utility/onboarding/useFetchAllOnboarding";
import { IAuthDets } from "AppTypes/Auth";
import { GlobalContext } from "Contexts/GlobalContextProvider";
import React, { useContext } from "react";
import { useAuthUser } from "react-auth-kit";
import { Link } from "react-router-dom";
import { ColumnsType } from "antd/lib/table";

import { PageIntro } from "../../../Layout/Components/PageIntro";
import DashboardLayout from "../../../Layout/DashboardLayout";
import SelfServiceSubNav from "../../Components/SelfServiceSubNav";
import { appRoutes } from "AppRoutes";

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

  const auth = useAuthUser();

  const authDetails = auth() as unknown as IAuthDets;

  const token = authDetails.userToken;
  const globalCtx = useContext(GlobalContext);
  const { state: globalState } = globalCtx;
  const companyId = globalState.currentCompany?.id as unknown as string;
  const { data, isLoading } = useFetchAllOnboarding({
    companyId,

    token,
  });
  return (
    <DashboardLayout>
      <SelfServiceSubNav />
      <div className="Container">
        <PageIntro link="/self-service/home" title="Onboarding" />

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
    </DashboardLayout>
  );
};

export default Onboarding;
