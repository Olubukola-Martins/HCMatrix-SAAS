import { Tooltip } from "antd";
import { IModalProps } from "types";
import { useUploadMultipleAttendance } from "../hooks/useUploadMultipleAttendance";
import { openNotification } from "utils/notifications";
import { useQueryClient } from "react-query";
import { QUERY_KEY_FOR_TIME_SHEET } from "../hooks/useGetTimeSheet";
import { useGetImportedTimeSheet } from "../hooks/useGetImportedTimeSheet";
import {
  IImportEntityModalProps,
  ImportEntityModal,
} from "components/entity/ImportEntityModal";

export const AddMultipleAttendance = ({ open, handleClose }: IModalProps) => {
  const { mutate, isLoading } = useUploadMultipleAttendance();
  const queryClient = useQueryClient();
  const { mutate: mutateImportedTimeSheet, isLoading: loadImportedTimeSheet } =
    useGetImportedTimeSheet();

  const handleMutateImportedTimeSheet = () => {
    mutateImportedTimeSheet(
      { data: {} },

      {
        onError: (err: any) => {
          openNotification({
            state: "error",
            title: "Error Occurred",
            description:
              err?.response.data.message ?? err?.response.data.error.message,
          });
        },
        onSuccess: (res: any) => {
          openNotification({
            state: "success",

            title: "Success",
            description: res.data.message,
            // duration: 0.4,
          });
        },
      }
    );
  };

  const onsubmit: IImportEntityModalProps["handleSubmit"]["fn"] = ({
    file,
  }) => {
    mutate(
      {
        data: {
          csvFile: file,
        },
      },
      {
        onError: (err: any) => {
          openNotification({
            state: "error",
            title: "Error Occurred",
            description:
              err?.response.data.message ?? err?.response.data.error.message,
          });
        },
        onSuccess: (res: any) => {
          openNotification({
            state: "success",
            title: "Success",
            description: res.data.message,
          });

          queryClient.invalidateQueries({
            queryKey: [QUERY_KEY_FOR_TIME_SHEET],
          });
          handleClose();
        },
      }
    );
  };

  return (
    <ImportEntityModal
      title="Import Timesheet"
      description={
        <div>
          <p className="text-xs pb-3 text-yellow-500">
            Please note that attendance once created can not be edited or
            deleted!
          </p>
          <div className="flex justify-center">
            <Tooltip
              showArrow={false}
              title="Please note that the employee Uid for each row will have to be unique"
            >
              <i className="ri-information-fill text-lg" />
            </Tooltip>
          </div>
        </div>
      }
      handleClose={handleClose}
      open={open}
      handleDownloadTemplate={{
        fn: handleMutateImportedTimeSheet,
        isLoading: loadImportedTimeSheet,
      }}
      handleSubmit={{ fn: onsubmit, isLoading: isLoading }}
    />
  );
};

