import SelfServiceSubNav from "features/self-service/components/SelfServiceSubNav";
import { PageIntro } from "components/layout/PageIntro";
import { appRoutes } from "config/router/paths";
import { BackgroundCurves } from "features/self-service/components/BackgroundCurves";
import { useState } from "react";
import { AddFolder } from "../components/AddFolder";
import { AddFile } from "../components/AddFile";
import { AppButton } from "components/button/AppButton";
import { Tabs } from "antd";
import { DocumentFolders } from "../components/DocumentFolders";
import { AssignedFilesTable } from "../components/AssignedFilesTable";

const DocumentsPage = () => {
  const [comp, setComp] = useState<"add-file" | "add-folder">();
  const tabItems = [
    {
      key: "Folders",
      label: "Folders",
      children: <DocumentFolders />,
    },
    {
      key: "Files",
      label: "Assigned Files",
      children: <AssignedFilesTable />,
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
      <SelfServiceSubNav />
      <div className="relative mb-10">
        <BackgroundCurves />
        <div className="absolute top-4 Container w-full">
          <div className="flex items-center justify-between mt-5">
            <PageIntro title="Documents" link={appRoutes.settings}  />
            <div className="flex items-center gap-3">
              <AppButton
                label="Add New File"
                handleClick={() => setComp("add-file")}
              />
              <AppButton
                label="Create Folder"
                variant="transparent"
                handleClick={() => setComp("add-folder")}
              />
            </div>
          </div>
          <p className="text-accent text-[15px]">
            You can now preview your files
          </p>

          <Tabs items={tabItems} className="mt-3" />
        </div>
      </div>
    </>
  );
};

export default DocumentsPage;
