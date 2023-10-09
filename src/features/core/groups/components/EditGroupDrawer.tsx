import { Collapse, Drawer } from "antd";

import AddGroupForm from "./AddGroupForm";
import { ManageGroupMembership } from "./ManageGroupMembership";
import { IModalProps } from "types";
import {
  QUERY_KEY_FOR_SINGLE_GROUP,
  useFetchSingleGroup,
} from "../hooks/useFetchSingleGroup";
import { useUpdateGroup } from "../hooks/useUpdateGroup";
import { openNotification } from "utils/notifications";
import { useQueryClient } from "react-query";
import { QUERY_KEY_FOR_GROUPS } from "../hooks/useFetchGroups";

interface IProps extends IModalProps {
  entityId: number;
}

export const EditGroupDrawer = ({ open, handleClose, entityId }: IProps) => {
  const queryClient = useQueryClient();

  const { data: group } = useFetchSingleGroup({
    id: entityId,
  });
  const { mutate, isLoading } = useUpdateGroup();

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
            <AddGroupForm
              handleSubmit={{
                isLoading,
                fn: (props) =>
                  mutate(
                    {
                      body: {
                        description: props.description,
                        email: props.email,
                        name: props.name,
                      },
                      id: group.id,
                    },
                    {
                      onError: (err: any) => {
                        openNotification({
                          state: "error",
                          title: "Error Occurred",
                          duration: 2,
                          description:
                            err?.response.data.message ??
                            err?.response.data.error.message,
                        });
                      },
                      onSuccess: (res: any) => {
                        openNotification({
                          state: "success",

                          title: "Success",
                          description: res.data.message,
                          // duration: 0.4,
                        });

                        queryClient.invalidateQueries({
                          queryKey: [QUERY_KEY_FOR_GROUPS],
                          // exact: true,
                        });
                        queryClient.invalidateQueries({
                          queryKey: [QUERY_KEY_FOR_SINGLE_GROUP],
                          // exact: true,
                        });

                        handleClose();
                      },
                    }
                  ),
              }}
              group={group}
            />
          </Collapse.Panel>
          <Collapse.Panel key={2} header="Manage Members">
            <ManageGroupMembership group={group} />
          </Collapse.Panel>
        </Collapse>
      )}
    </Drawer>
  );
};
