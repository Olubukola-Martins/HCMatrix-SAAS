import React from "react";
import { CostCentreContainer } from "../components/costCentres";
import PayrollSubNav from "../components/PayrollSubNav";
import { PageIntro } from "components/layout/PageIntro";
import { useGetSingleCostCentre } from "../hooks/costCentres/useGetSingleCostCentre";
import { Skeleton } from "antd";
import { useParams } from "react-router-dom";
import { appRoutes } from "config/router/paths";
import ViewCostCentreContainer from "../components/costCentres/ViewCostCentreContainer";

const SingleCostCentrePage = () => {
  const params = useParams();

  const centreId = params.id;
  const { data: costCentre, isLoading } = useGetSingleCostCentre({
    id: centreId ? +centreId : undefined,
  });
  return (
    <>
      <PayrollSubNav />
      <div className="Container">
        <Skeleton loading={isLoading}>
          {costCentre ? (
            <div className="flex flex-col gap-4">
              <PageIntro
                title={`Cost Centre: ${costCentre?.name}`}
                link={appRoutes.payrollCostCentres}
              />
              <ViewCostCentreContainer data={costCentre} />
            </div>
          ) : null}
        </Skeleton>
      </div>
    </>
  );
};

export default SingleCostCentrePage;
