import React, { useState } from "react";
import StorageContainer from "../components/storageManagement/StorageContainer";
import { appRoutes } from "config/router/paths";
import { PageIntro } from "components/layout/PageIntro";
import { FileStorageSetting } from "../components/storageManagement/FileStorageSetting";
import { UpgradeFileStorage } from "../components/storageManagement/UpgradeFileStorage";

const StorageManagements = () => {
  const [action, setAction] = useState<"upgrade" | "setting">();

  return (
    <div className="Container space-y-8 lg:space-y-16">
      <FileStorageSetting
        handleClose={() => setAction(undefined)}
        open={action === "setting"}
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

      <StorageContainer />
    </div>
  );
};

export default StorageManagements;
