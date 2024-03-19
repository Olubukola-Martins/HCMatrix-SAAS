import { Form, Modal, Tooltip, Typography, Upload } from "antd";
import { AppButton } from "components/button/AppButton";
import { IModalProps } from "types";
import { useUploadMultipleAttendance } from "../hooks/useUploadMultipleAttendance";
import { openNotification } from "utils/notifications";
import { useQueryClient } from "react-query";
import { useContext } from "react";
import { EGlobalOps, GlobalContext } from "stateManagers/GlobalContextProvider";
import { QUERY_KEY_FOR_TIME_SHEET } from "../hooks/useGetTimeSheet";
import { useGetImportedTimeSheet } from "../hooks/useGetImportedTimeSheet";

export const AddMultipleAttendance = ({ open, handleClose }: IModalProps) => {
  const { mutate, isLoading } = useUploadMultipleAttendance();
  const queryClient = useQueryClient();
  const globalCtx = useContext(GlobalContext);
  const { dispatch } = globalCtx;
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

  const onsubmit = () => {
    mutate(
      {
        csvFile: undefined,
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

          dispatch({ type: EGlobalOps.setShowInitialSetup, payload: true });
          queryClient.invalidateQueries([QUERY_KEY_FOR_TIME_SHEET]);
          handleClose();
        },
      }
    );
  };

  return (
    <Modal
      open={open}
      onCancel={() => handleClose()}
      footer={null}
      title="Add New"
      style={{ top: 15 }}
    >
      <p className="text-xs pb-3 text-yellow-500">
        Please note that attendance once created can not be edited or deleted!
      </p>
      <Form>
        <div className="flex gap-2 items-center mt-4 mb-1">
          <span className="text-red-500">
            This import is based on Employee Uid
          </span>
          <Tooltip
            showArrow={false}
            title="Please note that the employee Uid for each row will have to be unique"
          >
            <i className="ri-information-fill text-lg" />
          </Tooltip>
        </div>
        <div className="border border-dotted border-slate-500 rounded flex flex-col items-center gap-2 py-3 px-2">
          <p>Select file to be Imported</p>
          <Typography.Text
            title="Please Download template and populate"
            onClick={() => handleMutateImportedTimeSheet()}
          >
            <span className="text-sm pt-1 font-medium cursor-pointer hover:text-caramel underline">
              Download template
            </span>
          </Typography.Text>

          {/* <div className="flex justify-center w-3/5">
            <Upload
              // fileList={fileList}
              multiple={false}
              maxCount={1} //ensures only a single file is uploaded
              beforeUpload={beforeUpload}
              onRemove={() =>
                setSubmission((val) => ({ ...val, allow: false }))
              } // prevent submission when file has been removed
              onChange={handleChange}
              className="flex flex-col items-center w-full"
            >
              <div className="w-full border border-dotted border-caramel px-2 py-1 rounded text-caramel text-sm flex flex-col gap-1 items-center justify-center">
                <i className="ri-download-2-line text-2xl"></i>
                <span className="text-xs font-medium">Upload File</span>
              </div>
            </Upload>
          </div> */}
        </div>

        <div className="mt-5">
          <AppButton type="submit" isLoading={isLoading} />
        </div>
      </Form>
    </Modal>
  );
};
