import { Pagination } from "antd";
import { TVehicle } from "../hooks/useFetchVehicles";

import { usePagination } from "hooks/usePagination";
import { VehicleDocumentCard } from "./VehicleDocumentCard";

export const VehicleDocumentList: React.FC<{ vehicle: TVehicle }> = ({
  vehicle,
}) => {
  const { pagination, onChange } = usePagination({ pageSize: 8 });

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {vehicle.documents.map((item) => (
          <VehicleDocumentCard data={item} key={vehicle.id} />
        ))}
      </div>
      <div className="mt-4 flex justify-end">
        <Pagination {...pagination} onChange={onChange} size="small" />
      </div>
    </div>
  );
};
