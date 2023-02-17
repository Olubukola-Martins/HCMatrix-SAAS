import { Avatar, Modal } from "antd";
import { IAuthDets } from "AppTypes/Auth";
import { EGlobalOps, GlobalContext } from "Contexts/GlobalContextProvider";
import React, { useContext } from "react";
import { useAuthUser } from "react-auth-kit";
import Themes from "Themes/Themes";

const AdminWelcomeComp = () => {
  const auth = useAuthUser();
  const authDetails = auth() as unknown as IAuthDets;
  const token = authDetails.userToken;
  const user = authDetails?.user;

  const globalCtx = useContext(GlobalContext);
  const { state: globalState, dispatch: globalDispatch } = globalCtx;
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
                src={
                  user.avatarUrl ??
                  "https://res.cloudinary.com/ddvaelej7/image/upload/v1655735373/samples/Ellipse_4_j0womm.png"
                }
              />
              <p className="font-bold text-lg tracking-wider">
                Good day, {user.fullName}! I'm Basil, the HCMatrix onboarding
                specialist, and I'd love to walk you through the onboarding
                process.{" "}
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
