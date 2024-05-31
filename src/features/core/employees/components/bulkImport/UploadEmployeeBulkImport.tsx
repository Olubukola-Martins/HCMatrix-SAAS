import { Form, message, Select, Tooltip, Typography, Upload } from "antd";
import type { UploadChangeParam } from "antd/es/upload";
import type { RcFile, UploadFile, UploadProps } from "antd/es/upload/interface";
import { useState } from "react";
import * as XLSX from "xlsx";
import { BULK_EMPLOYEE_IMPORT_MAPPING_SECTIONS } from "../../constants";
import { TBulkEmployeeImportMappingSection } from "../../types/bulk-import";
import { TFileType } from "types/files";
import { AppButton } from "components/button/AppButton";
import { DEFAULT_MAX_FILE_UPLOAD_SIZE_IN_MB } from "constants/files";
import ErrorBoundary from "components/errorHandlers/ErrorBoundary";
import { useDownloadEmployeeImportTemplate } from "../../hooks/bulkImport/useDownloadEmployeeImportTemplate";
import { openNotification } from "utils/notifications";

const getBase64 = (img: RcFile, callback: (url: string) => void) => {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result as string));
  reader.readAsDataURL(img);
};

interface IProps {
  handleColumns: (columns: string[]) => void;
  handleRetrievedData: (item: (string | number)[][]) => void;
  handleNext: () => void;

  handleSections: (val: TBulkEmployeeImportMappingSection[]) => void;
  allowedFileTypes?: TFileType[];
  maxFileSizeInMB?: number;
  onError: () => void;
}

export const UploadEmployeeBulkImport = ({
  handleColumns,
  handleRetrievedData,
  handleSections,
  handleNext,
  allowedFileTypes = [
    "text/csv",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  ],
  maxFileSizeInMB = DEFAULT_MAX_FILE_UPLOAD_SIZE_IN_MB,
  onError,
}: IProps) => {
  const [loading, setLoading] = useState(false);

  const handleChange: UploadProps["onChange"] = (
    info: UploadChangeParam<UploadFile>
  ) => {
    var reader = new FileReader();
    reader.onload = function (e: any) {
      try {
        var data = e.target.result;
        let readedData = XLSX.read(data, { type: "binary" });
        const wsname = readedData.SheetNames[0];
        const ws = readedData.Sheets[wsname];

        /* Convert array to json*/
        const dataParse = XLSX.utils.sheet_to_json(ws, {
          header: 1,
        }) as unknown as string[][];

        const columns: string[] = dataParse[0];
        const retrievedData: any[] = dataParse.splice(1);

        handleColumns(columns);
        handleRetrievedData(retrievedData);
      } catch (err: any) {
        if (
          (err?.message as string)?.toLowerCase().indexOf("encrypted") !== -1
        ) {
          openNotification({
            state: "error",
            title: "Encryted file detected!",
            description:
              "Please ensure this file is not encrypted! Ensure that the file sensitivity is not set to private or better yet set the sensitivity to general/public!",
            duration: 0,
          });
        }
      }
    };
    if (info?.file instanceof Blob) {
      reader?.readAsBinaryString(info?.file as unknown as any);
    }
    if (info.file.status === "uploading") {
      setLoading(true);
      return;
    }
    if (info.file.status === "done") {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj as RcFile, (url) => {
        setLoading(false);
        // logic to read file
      });
    }
  };
  const [submission, setSubmission] = useState<{
    allow: boolean;
    errors: string[];
  }>({
    allow: false,
    errors: [],
  });
  const beforeUpload = (file: RcFile) => {
    const isLt2M = file.size / 1024 / 1024 <= maxFileSizeInMB;
    let allowSubmission = true;
    let errors = [];
    if (!allowedFileTypes.includes(file.type as TFileType)) {
      allowSubmission = false;

      let error = `This file type (${file.type}) is not allowed!`;
      errors.push(error);

      message.error(error);
    }

    if (!isLt2M) {
      allowSubmission = false;
      let error = `File must smaller than or equal to ${maxFileSizeInMB}MB!`;
      errors.push(error);

      message.error(error);
    }
    setSubmission({ allow: allowSubmission, errors });
    return false; //this is done so that it prevents dafault value
  };

  const handleSubmit = (data: any) => {
    if (submission.allow === false) {
      submission.errors.forEach((err) => message.error(err));
      return;
    }
    const selectedSections = BULK_EMPLOYEE_IMPORT_MAPPING_SECTIONS?.filter(
      (section) => data?.sections?.find((item: string) => item === section?.key)
    );
    handleSections(selectedSections);
    handleNext();
  };
  const { mutate: mutateDownload } = useDownloadEmployeeImportTemplate();

  const handleDownload = () => {
    mutateDownload(undefined, {
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
    });
  };
  return (
    <ErrorBoundary
      message="There seems to be an issue with file, is the file permission restricted!"
      action={onError}
    >
      <Form
        className=""
        requiredMark={false}
        onFinish={handleSubmit}
        initialValues={{ sections: ["employeeInformation"] }}
      >
        <Form.Item
          label="Import for:"
          name="sections"
          // No Validation Needed as there is a default value
        >
          <Select
            options={BULK_EMPLOYEE_IMPORT_MAPPING_SECTIONS.map((item) => ({
              label: <span className="capitalize">{item.title}</span>,
              value: item.key,
              disabled: item.key === "employeeInformation",
            }))}
            mode="multiple"
            placeholder="What data are you importing"
          />
        </Form.Item>
        <div className="flex gap-2 items-center mt-4 mb-1">
          <span className="text-red-500">
            This import is based on Employee Id
          </span>
          <Tooltip
            showArrow={false}
            title="Please note that the employee id for each row will have to be unique"
          >
            <i className="ri-information-fill text-lg" />
          </Tooltip>
        </div>
        <div className="border border-dotted border-slate-500 rounded flex flex-col items-center gap-2 py-3 px-2">
          <p>Select file to be Imported</p>
          <Typography.Text title="Please Download template and populate">
            <span
              onClick={() => handleDownload()}
              className="text-sm pt-1 font-medium cursor-pointer hover:text-caramel underline"
            >
              Download template
            </span>
          </Typography.Text>

          <div className="flex justify-center w-3/5">
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
          </div>
        </div>
        {/* buttons */}
        <div className="flex flex-row justify-between w-full mt-4">
          <div className="ml-auto">
            <AppButton
              label="Next"
              type="submit"
              isLoading={loading}
              disabled={!submission.allow}
            />
          </div>
        </div>
      </Form>
    </ErrorBoundary>
  );
};
