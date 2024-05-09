import { Avatar, Modal } from "antd";
import React, { useContext } from "react";
import { GlobalContext, EGlobalOps } from "stateManagers/GlobalContextProvider";
import Themes from "./Themes";
import { useApiAuth } from "hooks/useApiAuth";
import { getEmployeeFullName } from "features/core/employees/utils/getEmployeeFullName";
import { DEFAULT_PROFILE_IMAGE_URL } from "constants/general";

const AdminWelcomeComp = () => {
  const { currentCompanyEmployeeDetails: user, globalDispatch } = useApiAuth();

  const globalCtx = useContext(GlobalContext);
  const { state: globalState } = globalCtx;
  const showModal = globalState.showAdminWelcomeMessage;
  const handleGetStarted = () => {
    globalDispatch({ type: EGlobalOps.setShowInitialSetup, payload: true });
    globalDispatch({ type: EGlobalOps.setAdminWelcomeMessage, payload: false });
  };

  return (
    <>
      {showModal ? (
        <Modal
          open={globalState.showAdminWelcomeMessage}
          footer={null}
          width={720}
          style={{ top: 70 }}
          onCancel={handleGetStarted}
        >
          <Themes>
            <div className="flex flex-col gap-3 items-center text-center mt-4">
              <Avatar
                size={80}
                src={user?.avatarUrl ?? DEFAULT_PROFILE_IMAGE_URL}
              />
              {/* TODO: Ensure that the proper message is shown, as in good day or good evening */}
              <p className="font-bold text-lg tracking-wider">
                Good day, {getEmployeeFullName(user)}! I'm Basil, the HCMatrix
                onboarding specialist, and I'd love to walk you through the
                onboarding process.{" "}
              </p>
              <p>
                Find out how to set up departments, roles & permissions,
                designations, add/invite employees and create workflow in 30
                secs. Ready?{" "}
              </p>
              <div className="mt-8">
                <button className="button" onClick={handleGetStarted}>
                  Let’s Go
                </button>
              </div>
            </div>
          </Themes>
        </Modal>
      ) : null}
    </>
  );
};

export default AdminWelcomeComp;
