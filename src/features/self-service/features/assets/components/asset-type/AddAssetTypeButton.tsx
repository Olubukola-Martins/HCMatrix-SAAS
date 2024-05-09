import { TBtnVariant } from "components/button/AppButton";
import DropdownButton from "components/button/DropdownButton";
import React, { useState } from "react";
import AddAssetType from "./AddAssetsType";
import { ImportAssetTypes } from "./ImportAssetTypes";

type TAction = "single" | "bulk";
const AddAssetTypeButton: React.FC<{
  label?: string;
  variant?: TBtnVariant;
  btnClassName?: string;
}> = ({ label = "Add Asset Type", variant = "transparent", btnClassName }) => {
  const [action, setAction] = useState<TAction>();

  return (
    <>
      <AddAssetType
        open={action === "single"}
        handleClose={() => setAction(undefined)}
      />
      <ImportAssetTypes
        open={action === "bulk"}
        handleClose={() => setAction(undefined)}
      />
      <DropdownButton
        label={label}
        variant={variant}
        btnClassName={btnClassName}
        items={[
          {
            key: "add-type",
            label: "Add Single Type",
            onClick: () => setAction("single"),
          },
          {
            key: "bulk-import",
            label: "Import Types",
            onClick: () => setAction("bulk"),
          },
        ]}
      />
    </>
  );
};

export default AddAssetTypeButton;
