import { Select, Tabs } from "antd";
import PageSubHeader from "components/layout/PageSubHeader";
import React, { useState } from "react";
import { FoldersTable } from "./FoldersTable";
import { FilesContainer } from "./FilesContainer";
import { AddFolder } from "./AddFolder";
import { AddFile } from "./AddFile";

const DocumentsContainer = () => {
  const [comp, setComp] = useState<"add-file" | "add-folder">();
  const tabItems = [
    {
      key: "Folders",
      label: "Folders",
      children: <FoldersTable />,
    },
    {
      key: "Files",
      label: "Files",
      children: <FilesContainer />,
    },
  ];
  return (
    <>
      <AddFolder
        open={comp === "add-folder"}
        handleClose={() => setComp(undefined)}
      />
      <AddFile
        open={comp === "add-file"}
        handleClose={() => setComp(undefined)}
      />
      <div className="flex flex-col gap-6">
        <PageSubHeader
          description={`You can now organize the files in your organizations.`}
          actions={[
            { name: "Add New File", handleClick: () => setComp("add-file") },
            {
              name: "Create Folder",
              handleClick: () => setComp("add-folder"),
              btnVariant: "transparent",
            },
          ]}
        />
        <Tabs items={tabItems} />
      </div>
    </>
  );
};

export default DocumentsContainer;
