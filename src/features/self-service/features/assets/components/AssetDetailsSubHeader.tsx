import React, { useState } from "react";
import PageSubHeader from "components/layout/PageSubHeader";
import { TAsset } from "../types";
import { EditSingleAsset } from "./EditSingleAsset";
import { DeleteAsset } from "./asset/DeleteAsset";

export const AssetDetailsSubHeader: React.FC<{ data: TAsset }> = ({ data }) => {
  const [action, setAction] = useState<"edit" | "delete">();

  return (
    <div>
      <EditSingleAsset
        asset={data}
        handleClose={() => setAction(undefined)}
        open={action === "edit"}
      />
      <DeleteAsset
        asset={data}
        handleClose={() => setAction(undefined)}
        open={action === "delete"}
      />

      <PageSubHeader
        description={{ content: data.brand, className: "text-lg" }}
        hideBackground
        actions={[
          {
            name: "Edit",
            handleClick: () => {
              setAction("edit");
            },
          },
          {
            name: "Delete",
            handleClick: () => {
              setAction("delete");
            },
            btnVariant: "transparent",
          },
        ]}
      />
    </div>
  );
};
