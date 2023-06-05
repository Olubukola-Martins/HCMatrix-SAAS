import React, { useState } from "react";

import PageSubHeader from "components/layout/PageSubHeader";
import { openNotification } from "utils/notifications";
import { TAsset } from "../types";
import { useDeleteAsset } from "../hooks/useDeleteAsset";
import { EditSingleAsset } from "./EditSingleAsset";
import { useNavigate } from "react-router-dom";
import { appRoutes } from "config/router/paths";

export const AssetDetailsSubHeader: React.FC<{ data: TAsset }> = ({ data }) => {
  const { mutate, isLoading } = useDeleteAsset();
  const navigate = useNavigate();

  const deleteAsset = () => {
    mutate(
      {
        id: data.id,
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

          navigate(appRoutes.selfServiceAssets, { replace: true });
        },
      }
    );
  };
  const [showE, setShowE] = useState(false);

  return (
    <div>
      <EditSingleAsset
        asset={data}
        handleClose={() => setShowE(false)}
        open={showE}
      />

      <PageSubHeader
        description={{ content: data.brand, className: "text-lg" }}
        hideBackground
        actions={[
          {
            name: "Edit",
            handleClick: () => {
              setShowE(true);
            },
          },
          {
            name: "Delete",
            handleClick: deleteAsset,
            btnVariant: "transparent",
            loading: isLoading,
          },
        ]}
      />
    </div>
  );
};
