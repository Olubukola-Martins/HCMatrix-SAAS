import { Skeleton } from "antd";
import { useFetchSingleOnboarding } from "ApiRequesHelpers/Utility/onboarding/useFetchSingleOnboarding";
import { IAuthDets } from "AppTypes/Auth";
import { GlobalContext } from "Contexts/GlobalContextProvider";
import { useApiAuth } from "Hooks/useApiAuth";
import React, { useContext, useState } from "react";
import { useAuthUser } from "react-auth-kit";
import { Link, useParams } from "react-router-dom";
import DashboardLayout from "../../../Layout/DashboardLayout";
import { NewTask } from "../../Components/Onboarding/NewTask";
import SelfServiceSubNav from "../../Components/SelfServiceSubNav";
import { ResumptionInformation } from "./components/ResumptionInformation";

const StartOnboarding = () => {
  const { id } = useParams();
  const { token, companyId } = useApiAuth();
  const { data, isSuccess, isError, isFetching } = useFetchSingleOnboarding({
    companyId,
    id: id ? +id : 0, // need to refactor instead to show a not found page
    token,
  });
  const [newTaskDrawer, setNewTaskDrawer] = useState(false);

  return (
    <DashboardLayout>
      <SelfServiceSubNav />
      <NewTask
        open={newTaskDrawer}
        handleClose={() => setNewTaskDrawer(false)}
      />

      <div className="Container">
        <div className="flex items-center gap-3 font-extrabold ">
          <Link to="/self-service/onboarding">
            <i className="ri-arrow-left-s-line text-lg cursor-pointer hover:text-caramel"></i>
          </Link>
          <h2 className="text-xl text-accent">Start Onboarding</h2>
        </div>

        {isSuccess && (
          <>
            <div className="bg-card px-5 py-7 rounded-md mt-7 text-accent">
              <div className="bg-mainBg rounded-md px-2 md:px-4 py-4 shadow-sm">
                <h3 className="font-semibold text-lg pb-2">
                  {data?.employee.firstName} {data?.employee.lastName}
                </h3>
                <h6 className="text-sm font-medium">
                  {data?.employee.designation?.name}
                </h6>
              </div>
              <ResumptionInformation
                setNewTaskDrawer={setNewTaskDrawer}
                onboarding={data}
              />
            </div>
          </>
        )}
        {/* TO DO: Create a container component to be used on all pages/components that will account 4 data fetching &&  err, so you dont repeat this logic */}
        {isError && !isFetching && "Error Occured: not found"}
        {isFetching && (
          <Skeleton active paragraph={{ rows: 20 }} className="mt-8" />
        )}
      </div>
    </DashboardLayout>
  );
};

export default StartOnboarding;
