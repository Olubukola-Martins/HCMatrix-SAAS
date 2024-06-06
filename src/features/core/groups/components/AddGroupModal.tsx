import { Modal } from "antd";
import AddGroupForm from "./AddGroupForm";
import { IModalProps } from "types";
import { useAddGroup } from "../hooks/useAddGroup";
import { useQueryClient } from "react-query";
import { openNotification } from "utils/notifications";
import { QUERY_KEY_FOR_GROUPS } from "../hooks/useFetchGroups";

interface IProps extends IModalProps {
  title?: string;
}

export const AddGroupModal = ({
  open,
  handleClose,
  title = "Add Group",
}: IProps) => {
  const queryClient = useQueryClient();
  const { mutate, isLoading } = useAddGroup();

  return (
    <Modal
      title="Add Group"
      open={open}
      onCancel={() => handleClose()}
      footer={null}
      style={{ top: 20 }}
    >
      <AddGroupForm
        handleSubmit={{
          isLoading,
          fn: (props) =>
            mutate(
              {
                ...props,
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

                  handleClose();
                },
              }
            ),
        }}
      />
    </Modal>
  );
};
