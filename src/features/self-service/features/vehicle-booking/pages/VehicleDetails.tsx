import { useParams } from "react-router-dom";

import { Skeleton } from "antd";
import { ErrorComponent } from "components/errorHandlers/ErrorComponent";
import { PageIntro } from "components/layout/PageIntro";
import { appRoutes } from "config/router/paths";
import SelfServiceSubNav from "features/self-service/components/SelfServiceSubNav";
import { useApiAuth } from "hooks/useApiAuth";
import { CurrentVehicleAssignee } from "../components/CurrentVehicleAssignee";
import { SingleVehicleTabs } from "../components/SingleVehicleTabs";
import { VehicleDetailsSubHeader } from "../components/VehicleDetailsSubHeader";
import { VehicleImage } from "../components/VehicleImage";
import { VehicleInfo } from "../components/VehicleInfo";
import { useFetchSingleVehicle } from "../hooks/useFetchSingleVehicle";

const VehicleDetails = () => {
  const params = useParams();
  const vehicleId: number = +(params.id as unknown as string);

  const { token, companyId } = useApiAuth();

  const { data, isSuccess, isFetching } = useFetchSingleVehicle({
    token,
    companyId,
    id: vehicleId,
  });

  return (
    <>
      <SelfServiceSubNav />

      <div className="Container">
        {isFetching && <Skeleton paragraph={{ rows: 20 }} />}
        {isSuccess ? (
          <>
            <PageIntro
              title="Vehicle Details"
              link={appRoutes.vehicleBooking}
            />
            <VehicleDetailsSubHeader vehicle={data} />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
              <VehicleImage src={data.imageUrl} />
              <VehicleInfo vehicle={data} />

              <CurrentVehicleAssignee vehicle={data} />
            </div>

            {/* Tabs */}
            <div className="mt-6">
              <SingleVehicleTabs vehicle={data} />
            </div>
          </>
        ) : (
          <ErrorComponent message="Oops, not found!" />
        )}
      </div>
    </>
  );
};

export default VehicleDetails;
