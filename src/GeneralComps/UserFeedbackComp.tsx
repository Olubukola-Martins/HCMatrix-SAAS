import { Modal, Progress } from "antd";
import React, { useContext, useEffect, useState } from "react";
import { useAuthUser, useIsAuthenticated } from "react-auth-kit";
import { Link } from "react-router-dom";
import { useFetchRoles } from "../APIRQHooks/Auth/roleHooks";
import {
  IFRQDepartmentsReturnProps,
  useFetchDepartments,
} from "../APIRQHooks/Utility/departmentHooks";
import {
  IFRQDesignationsReturnProps,
  useFetchDesignations,
} from "../APIRQHooks/Utility/designationHooks";
import {
  IFRQEmpsReturnProps,
  useFetchEmployees,
} from "../APIRQHooks/Utility/employeeHooks";
import { EGlobalOps, GlobalContext } from "../Contexts/GlobalContextProvider";
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
    link: "/settings/roles",
    completed: false,
    hint: "This will enable you restrict system access via permissions",
  },
  {
    text: EInitialSetUp.SET_UP_DEPTS,
    link: "/settings/departments",
    completed: false,
    hint: "Setting up departments, will allow you setup designations",
  },
  {
    text: EInitialSetUp.SET_UP_DESGS,
    link: "/settings/designations",
    completed: false,
    hint: "Setting up designations, will allow you assign jobs to employees",
  },
  {
    text: EInitialSetUp.ADD_EMPLOYEES,
    link: "/settings/employees",
    completed: false,
    hint: "Adding employees will allow you to begin HR automation",
  },
];

const UserFeedbackComp = () => {
  // in a rq hooks on success here make the appropiate calls adjust the state with a reducer
  const [progress, setProgress] = useState(0);

  const [steps, setSteps] = useState(initialsetUpSteps);
  const auth = useAuthUser();

  const authDetails = auth();

  const user = authDetails?.user;
  const globalCtx = useContext(GlobalContext);
  const { state: globalState, dispatch } = globalCtx;
  const companyId = globalState.currentCompany?.id as unknown as string;
  const provideFeedback = globalState.showInitialSetUp;
  const dismissFeedback = () => {
    dispatch({ type: EGlobalOps.setShowInitialSetup, payload: false });
  };

  const { isSuccess: isDepSuccess } = useFetchDepartments({
    companyId,
    pagination: {
      limit: 100, //temp suppose to allow search
      offset: 0,
    },
    onSuccess: (data: IFRQDepartmentsReturnProps) => {
      if (data.total > 0) {
        setSteps((steps) =>
          steps.map((item) =>
            item.text === EInitialSetUp.SET_UP_DEPTS
              ? { ...item, completed: true }
              : item
          )
        );
      }
    },
  });
  const { isSuccess: isDegSuccess } = useFetchDesignations({
    companyId,
    pagination: {
      limit: 100, //temp suppose to allow search
      offset: 0,
    },
    onSuccess: (data: IFRQDesignationsReturnProps) => {
      if (data.total > 0) {
        setSteps((steps) =>
          steps.map((item) =>
            item.text === EInitialSetUp.SET_UP_DESGS
              ? { ...item, completed: true }
              : item
          )
        );
      }
    },
  });
  const { isSuccess: isRoleSuccess } = useFetchRoles({
    companyId,
    pagination: {
      limit: 100, //temp suppose to allow search
      offset: 0,
    },
    onSuccess: (data: IFRQDesignationsReturnProps) => {
      if (data.total > 0) {
        setSteps((steps) =>
          steps.map((item) =>
            item.text === EInitialSetUp.SET_UP_ROLES
              ? { ...item, completed: true }
              : item
          )
        );
      }
    },
  });
  const { isSuccess: isEmpSuccess } = useFetchEmployees({
    companyId,
    pagination: {
      limit: 100, //temp suppose to allow search
      offset: 0,
    },
    onSuccess: (data: IFRQEmpsReturnProps) => {
      if (data.total > 0) {
        setSteps((steps) =>
          steps.map((item) =>
            item.text === EInitialSetUp.ADD_EMPLOYEES
              ? { ...item, completed: true }
              : item
          )
        );
      }
    },
  });

  useEffect(() => {
    const totalSteps = steps.length;
    const completedSteps = steps.filter((item) => item.completed).length;
    const progress = (completedSteps / totalSteps) * 100;
    setProgress(progress);
  }, [steps]);

  const showModal =
    isDepSuccess && isDegSuccess && isRoleSuccess && isEmpSuccess;

  return (
    <>
      {showModal ? (
        <Modal
          open={provideFeedback}
          //   open={false}
          title={`Hello, ${user.fullName}`}
          onCancel={() => dismissFeedback()}
          footer={null}
        >
          <Themes>
            <div className="flex flex-col gap-4">
              <Progress percent={progress} strokeColor={"#006600"} />
              <div className="flex flex-col gap-2">
                <h6 className="text-sm font-semibold italic mb-2">
                  {progress !== 100 ? (
                    <span>
                      You are to complete the following steps, in order to
                      utilize the system" :
                    </span>
                  ) : (
                    <span>
                      Congratulations, on completing the required steps!
                    </span>
                  )}
                </h6>

                {provideFeedback &&
                  steps.map((item, index) => (
                    <div
                      className="flex gap-4 items-center text-sm"
                      key={item.text}
                    >
                      <div
                        className={`min-h-min min-w-min ${
                          item.completed ? "bg-[#006600]" : "bg-gray-400"
                        } flex items-center justify-center  rounded-full text-white p-1 h-4 w-4`}
                      >
                        <span className={`block`}>{index + 1}</span>
                      </div>
                      <Link to={item.link} onClick={() => dismissFeedback()}>
                        <p
                          className={`block hover:text-caramel ${
                            item.completed && "text-[#006600] line-through"
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
      ) : null}
    </>
  );
};

export default UserFeedbackComp;
