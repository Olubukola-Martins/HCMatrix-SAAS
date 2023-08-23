import { Pagination } from "antd";

import { DocumentCard } from "components/cards/DocumentCard";
import { usePagination } from "hooks/usePagination";
import { openNotification } from "utils/notifications";

import { useQueryClient } from "react-query";
import { QUERY_KEY_FOR_SINGLE_ASSET } from "features/self-service/features/assets/hooks/useGetSingleAsset";
import { useUpdateAsset } from "features/self-service/features/assets/hooks/useUpdateAsset";
import { TAsset } from "features/self-service/features/assets/types";
import { TemplateCard } from "components/cards/TemplateCard";

export const PayrollReportTemplateList: React.FC<{ asset: TAsset }> = ({
  asset,
}) => {
  const { pagination, onChange } = usePagination({ pageSize: 8 });
  const queryClient = useQueryClient();

  const { mutate, isLoading } = useUpdateAsset();

  const handleDelete = (val: string) => {
    const existingDocs = asset.documentUrls ?? [];
    const updateDocs = existingDocs.filter((item) => item !== val);
    const data = asset;
    mutate(
      {
        body: {
          name: data.name,
          typeId: data.typeId,

          documentUrls: updateDocs,
        },
        id: asset.id,
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
            // duration: 0.4,
          });

          queryClient.invalidateQueries({
            queryKey: [QUERY_KEY_FOR_SINGLE_ASSET],
            // exact: true,
          });
        },
      }
    );
  };

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {asset.documentUrls?.map((item, i) => (
          <TemplateCard
            data={{ name: "Template", title: "Payroll Report", link: item }}
            key={i}
            handleDelete={{ fn: () => handleDelete(item), loading: isLoading }}
            handleEdit={{ fn: () => handleDelete(item), loading: isLoading }}
          />
        ))}
      </div>
      <div className="mt-4 flex justify-end">
        <Pagination {...pagination} onChange={onChange} size="small" />
      </div>
    </div>
  );
};
