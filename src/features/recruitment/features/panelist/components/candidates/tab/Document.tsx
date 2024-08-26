import { Select } from "antd";
import { TbDownload } from "react-icons/tb";
import DocumentPreviewer from "../../DocumentViewer";

const Document = () => {
  return (
    <div className="flex flex-col gap-y-4">
      <p className="md:text-2xl">Documents (Resume, Cover letter and other document )</p>
      <div className="flex gap-x-4 items-center">
        <Select
          defaultValue={"resume"}
          options={[
            { label: "Resume", value: "resume" },
            { label: "Cover letter", value: "coverLetter" },
            { label: "Other document", value: "otherDocument" },
          ]}
          dropdownStyle={{ width: "max-content" }}
        />
        <p className="text-caramel flex items-center gap-x-1 cursor-pointer hover:opacity-80">
          <TbDownload size={16} className="cursor-pointer hover:backdrop-grayscale-0 ml-auto text-caramel" /> Download
        </p>
      </div>
      <DocumentPreviewer fileURI={"https://docs.google.com/document/d/10grr8CBeyMsH8tibD_KnMnxSiQ5_52QfEFsZ5tokUjc/edit?usp=drive_link"} />
    </div>
  );
};

export default Document;
