import { Modal, Progress, Skeleton, Steps } from "antd";
import React, { useContext, useEffect, useState } from "react";
import { useAuthUser } from "react-auth-kit";
import { Link } from "react-router-dom";

import FeedBackTitle, { EInitialSetUp, TSetupStep } from "./FeedBackTitle";
import { IAuthDets } from "features/authentication/types";
import { GlobalContext, EGlobalOps } from "stateManagers/GlobalContextProvider";
import Themes from "./Themes";
import { useGetStartedAnalytics } from "features/core/company/hooks/dashboard/useGetStartedAnalytics";
import { appRoutes } from "config/router/paths";
import {
  DEFAULT_ROLES_CREATED_BY_SYSTEM,
  DEFAULT_DEPARTMENTS_CREATED_BY_SYSTEM,
  DEFAULT_DESIGNATIONS_CREATED_BY_SYSTEM,
  DEFAULT_EMPLOYEES_CREATED_BY_SYSTEM,
} from "constants/general";

const UserFeedbackComp = () => {
  const auth = useAuthUser();
  const authDetails = auth() as unknown as IAuthDets;
  const user = authDetails?.user;
  const [progress, setProgress] = useState(0);
  const [steps, setSteps] = useState<TSetupStep[]>([]);
  const globalCtx = useContext(GlobalContext);
  const { state: globalState, dispatch } = globalCtx;
  const provideFeedback = globalState.showInitialSetUp;
  const dismissFeedback = () => {
    dispatch({ type: EGlobalOps.setShowInitialSetup, payload: false });
  };

  const {
    data: getStartedAnalytics,
    isLoading,
    isSuccess,
  } = useGetStartedAnalytics();
  useEffect(() => {
    if (!getStartedAnalytics) return;
    const initialsetUpSteps: TSetupStep[] = [
      {
        text: EInitialSetUp.SET_UP_ROLES,
        link: appRoutes.roleSettings,
        completed: getStartedAnalytics.role > DEFAULT_ROLES_CREATED_BY_SYSTEM,
        hint: "This will enable you restrict system access via permissions",
      },
      {
        text: EInitialSetUp.SET_UP_DEPTS,
        link: appRoutes.departmentSettings,
        completed:
          getStartedAnalytics.department >
          DEFAULT_DEPARTMENTS_CREATED_BY_SYSTEM,
        hint: "Setting up departments, will allow you setup designations",
      },
      {
        text: EInitialSetUp.SET_UP_DESGS,
        link: appRoutes.designationSettings,
        completed:
          getStartedAnalytics.designation >
          DEFAULT_DESIGNATIONS_CREATED_BY_SYSTEM,
        hint: "Setting up designations, will allow you assign jobs to employees",
      },
      {
        text: EInitialSetUp.ADD_EMPLOYEES,
        link: appRoutes.employeeSettings,
        completed:
          getStartedAnalytics.employee > DEFAULT_EMPLOYEES_CREATED_BY_SYSTEM,
        hint: "Adding employees will allow you to begin HR automation",
      },
    ];
    setSteps(initialsetUpSteps);
  }, [getStartedAnalytics]);

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
  }, [dispatch, steps]);

  const showModal =
    globalState.showInitialSetUp &&
    user.isOwner &&
    isSuccess &&
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
            <Skeleton active loading={isLoading}>
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
                    {steps.filter((item) => item.completed).length}/
                    {steps.length} complete
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
                      steps.filter((item) => item.completed === false)
                        .length !== steps.length
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
            </Skeleton>
          </Themes>
        </Modal>
      ) : null}
    </>
  );
};
export default UserFeedbackComp;
