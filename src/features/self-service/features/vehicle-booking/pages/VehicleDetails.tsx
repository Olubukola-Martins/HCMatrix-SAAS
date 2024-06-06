import { useParams } from "react-router-dom";

import { Skeleton } from "antd";
import { PageIntro } from "components/layout/PageIntro";
import { appRoutes } from "config/router/paths";
import SelfServiceSubNav from "features/self-service/components/SelfServiceSubNav";
import { useApiAuth } from "hooks/useApiAuth";
import { CurrentVehicleAssignee } from "../components/CurrentVehicleAssignee";
import { SingleVehicleTabs } from "../components/SingleVehicleTabs";
import { VehicleDetailsSubHeader } from "../components/VehicleDetailsSubHeader";
import { VehicleInfo } from "../components/VehicleInfo";
import { useFetchSingleVehicle } from "../hooks/useFetchSingleVehicle";
import { EntityImageCard } from "components/cards/EntityImageCard";
import { ErrorWrapper } from "components/errorHandlers/ErrorWrapper";

const VehicleDetails = () => {
  const params = useParams();
  const vehicleId: number = +(params.id as unknown as string);

  const { token, companyId } = useApiAuth();

  const { data, isError, isFetching } = useFetchSingleVehicle({
    token,
    companyId,
    id: vehicleId,
  });

  return (
    <>
      <SelfServiceSubNav />

      <div className="Container">
        <PageIntro
          title={isError ? "Back" : "Vehicle Details"}
          link={appRoutes.vehicleBooking}
        />

        <Skeleton active paragraph={{ rows: 16 }} loading={isFetching}>
          <ErrorWrapper
            isError={isError}
            backLink={appRoutes.selfServiceAssets}
            message="Asset not found"
          >
            {data && (
              <>
                <VehicleDetailsSubHeader vehicle={data} />

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
                  <EntityImageCard src={data.imageUrl} />
                  <VehicleInfo vehicle={data} />

                  <CurrentVehicleAssignee vehicle={data} />
                </div>

                {/* Tabs */}
                <div className="mt-6">
                  <SingleVehicleTabs vehicle={data} />
                </div>
              </>
            )}
          </ErrorWrapper>
        </Skeleton>
      </div>
    </>
  );
};

export default VehicleDetails;
