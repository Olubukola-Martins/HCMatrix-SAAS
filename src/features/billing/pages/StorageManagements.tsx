import React, { useState } from "react";
import StorageContainer from "../components/storageManagement/StorageContainer";
import { appRoutes } from "config/router/paths";
import { PageIntro } from "components/layout/PageIntro";
import { FileStorageSetting } from "../components/storageManagement/FileStorageSetting";
import { UpgradeFileStorage } from "../components/storageManagement/UpgradeFileStorage";
import { useGetFileStorageSetting } from "features/core/company/hooks/fileStorage/setting/useGetFileStorageSetting";

const StorageManagements = () => {
  const [action, setAction] = useState<"upgrade" | "setting">();
  const { isLoading, data } = useGetFileStorageSetting();
  return (
    <div className="Container space-y-8 lg:space-y-16">
      <FileStorageSetting
        handleClose={() => setAction(undefined)}
        open={action === "setting"}
        setting={data}
      />
      <UpgradeFileStorage
        handleClose={() => setAction(undefined)}
        open={action === "upgrade"}
      />
      <PageIntro
        title="Manage storage"
        link={appRoutes.settings}
        actions={[
          {
            name: "Setting",
            handleClick: () => setAction("setting"),

            btnVariant: "transparent",
          },
          {
            name: "Upgrade",
            handleClick: () => setAction("upgrade"),
          },
        ]}
      />

      <StorageContainer data={data} isLoading={isLoading} />
    </div>
  );
};

export default StorageManagements;
