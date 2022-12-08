import { Modal, Progress } from "antd";
import React, { useContext, useState } from "react";
import { useAuthUser, useIsAuthenticated } from "react-auth-kit";
import { Link } from "react-router-dom";
import { useFetchDepartments } from "../APIRQHooks/Utility/departmentHooks";
import { GlobalContext } from "../Contexts/GlobalContextProvider";
import Themes from "../Themes/Themes";

enum EInitialSetUp {
  SET_UP_ROLES = "Set up roles",
  SET_UP_DEPTS = "Set up departments",
  SET_UP_DESGS = "Set up designations",
  ADD_EMPLOYEES = "Add employees",
}

const initialsetUpSteps = [
  {
    text: EInitialSetUp.SET_UP_ROLES,
    link: "/roles",
    completed: false,
    hint: "This will enable you restrict system access via permissions",
  },
  {
    text: EInitialSetUp.SET_UP_DEPTS,
    link: "/departments",
    completed: false,
    hint: "Setting up departments, will allow you setup designations",
  },
  {
    text: EInitialSetUp.SET_UP_DESGS,
    link: "/designations",
    completed: false,
    hint: "Setting up designations, will allow you assign jobs to employees",
  },
  {
    text: EInitialSetUp.ADD_EMPLOYEES,
    link: "/employees",
    completed: false,
    hint: "Adding employees will allow you to begin HR automation",
  },
];

const UserFeedbackComp = () => {
  // in a rq hooks on success here make the appropiate calls adjust the state with a reducer
  const isAuthenticated = useIsAuthenticated();
  const [progress, setProgress] = useState(0);

  const [provideFeedback, setProvideFeedback] = useState(true);
  const [steps, setSteps] = useState(initialsetUpSteps);
  const auth = useAuthUser();

  const authDetails = auth();

  const user = authDetails?.user;
  const globalCtx = useContext(GlobalContext);
  const { state: globalState } = globalCtx;
  const companyId = globalState.currentCompany?.id as unknown as string;

  const {
    data: departmentData,
    isError,
    isFetching,
    isSuccess,
  } = useFetchDepartments({
    companyId,
    pagination: {
      limit: 100, //temp suppose to allow search
      offset: 0,
    },
  });

  if (!isAuthenticated()) {
    return null;
  }
  if (isAuthenticated() && user.isAdmin === false) {
    return null;
  }

  return (
    <Modal
      //   open={true}
      open={false}
      title={`Hello, ${user.fullName}`}
      onCancel={() => setProvideFeedback(false)}
      footer={null}
    >
      <Themes>
        <div className="flex flex-col gap-4">
          <Progress percent={progress} strokeColor={"#00b200"} />
          <div className="flex flex-col gap-2">
            <h6 className="text-sm font-semibold italic mb-2">
              You are to complete the following steps, in order to utilize the
              system:
            </h6>

            {provideFeedback &&
              steps.map((item, index) => (
                <div
                  className="flex gap-4 items-center text-sm"
                  key={item.text}
                >
                  <div
                    className={`min-h-min min-w-min ${
                      item.completed ? "bg-[#00b200]" : "bg-gray-400"
                    } flex items-center justify-center  rounded-full text-white p-1 h-4 w-4`}
                  >
                    <span className={`block`}>{index + 1}</span>
                  </div>
                  <Link to={item.link}>
                    <p
                      className={`block hover:text-caramel ${
                        item.completed && "text-[#00b200] line-through"
                      }`}
                      title={item.hint}
                    >
                      {item.text}
                    </p>
                  </Link>
                </div>
              ))}
          </div>
        </div>
      </Themes>
    </Modal>
  );
};

export default UserFeedbackComp;
