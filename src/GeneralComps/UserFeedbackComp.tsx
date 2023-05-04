import { Button, Modal, Progress, Steps } from "antd";
import React, { useContext, useEffect, useState } from "react";
import { useAuthUser } from "react-auth-kit";
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
import { IAuthDets } from "../AppTypes/Auth";
import { EGlobalOps, GlobalContext } from "../Contexts/GlobalContextProvider";
import Themes from "../Themes/Themes";
import FeedBackTitle, { EInitialSetUp, TSetupStep } from "./FeedBackTitle";

const initialsetUpSteps: TSetupStep[] = [
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
  const auth = useAuthUser();
  const authDetails = auth() as unknown as IAuthDets;
  const token = authDetails.userToken;
  const user = authDetails?.user;
  const [progress, setProgress] = useState(0);
  const [steps, setSteps] = useState(initialsetUpSteps);
  const globalCtx = useContext(GlobalContext);
  const { state: globalState, dispatch } = globalCtx;
  const companyId = globalState.currentCompany?.id as unknown as string;
  const provideFeedback = globalState.showInitialSetUp;
  const dismissFeedback = () => {
    dispatch({ type: EGlobalOps.setShowInitialSetup, payload: false });
  };
  const { isSuccess: isDepSuccess } = useFetchDepartments({
    companyId,
    token,
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
    token,
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
    token,
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
    token,
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
    // This will prevent the welcome admin from showing if all steps are completed
    // don't show welcome message if all steps complete
    if (progress === 100) {
      dispatch({ type: EGlobalOps.setAdminWelcomeMessage, payload: false });
    }
    setProgress(progress);
  }, [steps]);

  const showModal =
    globalState.showInitialSetUp &&
    user.isAdmin &&
    isDepSuccess &&
    isDegSuccess &&
    isRoleSuccess &&
    isEmpSuccess &&
    steps.filter((item) => item.completed).length !== steps.length;

  return (
    <>
      {showModal ? (
        <Modal
          open={provideFeedback}
          onCancel={() => dismissFeedback()}
          footer={null}
          width={380}
          // style={{ top: 160, left: "-20vw" }}
          style={{ top: 160, right: "calc(100vw - 77%)" }}
        >
          <Themes>
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-4">
                <h3 className="text-xl ">Get Started</h3>
                <p className="text-normal mb-2">
                  {progress !== 100 ? (
                    <span>
                      You are to complete the following steps, in order to
                      utilize the system
                    </span>
                  ) : (
                    <span>
                      Congratulations, on completing the required steps!
                    </span>
                  )}
                </p>
              </div>
              <div className="flex flex-col gap-1  relative bottom-4">
                <Progress percent={progress} strokeColor={"var(--caramel)"} />
                <span>
                  {steps.filter((item) => item.completed).length}/{steps.length}{" "}
                  complete
                </span>
              </div>
              <div className="flex flex-col gap-2 w-full">
                {provideFeedback && (
                  <Steps
                    className="w-full"
                    size="small"
                    direction="vertical"
                    current={steps.filter((item) => item.completed).length}
                  >
                    {steps
                      .sort((item) => (item.completed ? -1 : 1))
                      .map((item, index) => (
                        <Steps.Step
                          description={
                            <span className="text-caramel text-xs">
                              Watch Video Tutorial
                            </span>
                          }
                          key={index}
                          title={
                            <FeedBackTitle
                              item={item}
                              handleClick={dismissFeedback}
                            />
                          }
                        />
                      ))}
                  </Steps>
                )}
              </div>
              <div className="mt-3 flex justify-between">
                <button
                  disabled={
                    steps.filter((item) => item.completed === false).length !==
                    steps.length
                  }
                  className={`disabled:cursor-not-allowed text-green-700 disabled:text-slate-300`}
                  onClick={() => dismissFeedback()}
                >
                  <span className=" underline text-sm">
                    Done with onboarding
                  </span>
                </button>
                <Link
                  to="/"
                  className="underline text-caramel hover:text-black"
                >
                  Get Help
                </Link>
              </div>
            </div>
          </Themes>
        </Modal>
      ) : null}
    </>
  );
};
export default UserFeedbackComp;
