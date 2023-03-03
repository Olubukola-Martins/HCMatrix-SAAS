import { Collapse, Drawer, Modal } from "antd";
import { useFetchSingleGroup } from "APIRQHooks/Utility/groupHooks";
import { IAuthDets } from "AppTypes/Auth";
import { GlobalContext } from "Contexts/GlobalContextProvider";
import { useContext } from "react";
import { useAuthUser } from "react-auth-kit";
import { IModalProps } from "../../../../AppTypes/Component";
import AddGroupForm from "./AddGroupForm";
import { ManageGroupMembership } from "./ManageGroupMembership";

interface IProps extends IModalProps {
  entityId: number;
}

export const EditGroupDrawer = ({ open, handleClose, entityId }: IProps) => {
  const globalCtx = useContext(GlobalContext);
  const { state: globalState } = globalCtx;
  const companyId = globalState.currentCompany?.id as unknown as string;
  const auth = useAuthUser();

  const authDetails = auth() as unknown as IAuthDets;

  const token = authDetails.userToken;
  const { data: group } = useFetchSingleGroup({
    id: entityId,
    companyId,
    token,
  });
  return (
    <Drawer
      title="Manage Group"
      open={open}
      size="large"
      onClose={() => handleClose()}
      footer={null}
    >
      {group && (
        <Collapse>
          <Collapse.Panel key={1} header="Group Information">
            <AddGroupForm handleClose={handleClose} group={group} />
          </Collapse.Panel>
          <Collapse.Panel key={2} header="Manage Members">
            <ManageGroupMembership group={group} />
          </Collapse.Panel>
        </Collapse>
      )}
    </Drawer>
  );
};
