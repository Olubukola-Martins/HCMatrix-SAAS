import { Collapse, Drawer, Modal } from "antd";

import AddGroupForm from "./AddGroupForm";
import { ManageGroupMembership } from "./ManageGroupMembership";
import { useApiAuth } from "hooks/useApiAuth";
import { IModalProps } from "types";
import { useFetchSingleGroup } from "../hooks/useFetchSingleGroup";

interface IProps extends IModalProps {
  entityId: number;
}

export const EditGroupDrawer = ({ open, handleClose, entityId }: IProps) => {
  const { token, companyId } = useApiAuth();

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
