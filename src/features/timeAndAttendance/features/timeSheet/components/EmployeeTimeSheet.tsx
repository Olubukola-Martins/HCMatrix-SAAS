import { timeSheetFilterProps } from "../types";
import { AppButton } from "components/button/AppButton";
import { SimpleCard } from "components/cards/SimpleCard";
import { Dispatch, SetStateAction } from "react";
import { useGetTimeSheet } from "../hooks/useGetTimeSheet";
import useMostRecentApiAuth from "hooks/useMostRecentApiAuth";
import {
  convertMinutesToHours,
  noAttendance,
} from "features/timeAndAttendance/utils";
import { appRoutes } from "config/router/paths";
import { useNavigate } from "react-router-dom";
import { Empty, Skeleton } from "antd";

export interface TSheetIProps {
  filterData: timeSheetFilterProps | undefined;
  setFilterData: Dispatch<SetStateAction<timeSheetFilterProps | undefined>>;
  setFilterSheet: Dispatch<SetStateAction<boolean>>;
}
export const EmployeeTimeSheet = ({
  filterData,
  setFilterData,
  setFilterSheet,
}: TSheetIProps) => {
  const navigate = useNavigate();
  const { currentCompanyEmployeeDetails: employee } = useMostRecentApiAuth();
  const employeeId = employee?.empUid;
  const { data, isLoading } = useGetTimeSheet({
    filter: {
      employeeId,
      startDate: filterData?.startDate,
      endDate: filterData?.endDate,
      date: filterData?.date,
      period: filterData?.period,
    },
  });

  const redirectToDetailsPage = (value: string) => {
    navigate(value);
  };

  return (
    <div className="mb-10">
      <div className="flex items-center justify-between mt-5 mb-6">
        <div>
          {filterData !== undefined && (
            <AppButton
              label="Reset Result"
              handleClick={() => setFilterData(undefined)}
            />
          )}
        </div>
        <button
          className="flex items-center gap-x-2 transparentButton"
          onClick={() => setFilterSheet(true)}
        >
          <span className="text-caramel font-medium">Filter</span>
          <i className="ri-filter-2-line text-caramel"></i>
        </button>
      </div>

      <div>
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
              <Skeleton active loading={isLoading} key={item} />
            ))}
          </div>
        ) : data?.data && data.data.length > 0 ? (
          data?.data.map((val) => (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-6">
              <SimpleCard
                title="Monday"
                highlight={
                  convertMinutesToHours(val?.days?.Monday?.totalTimeTracked) ??
                  0
                }
                handleClick={() => {
                  if (val?.days?.Monday?.date) {
                    redirectToDetailsPage(
                      appRoutes.timeSheetDetails(
                        val?.employee?.id,
                        val?.days?.Monday?.date
                      ).path
                    );
                  } else {
                    noAttendance();
                  }
                }}
              />
              <SimpleCard
                title="Tuesday"
                highlight={
                  convertMinutesToHours(val?.days?.Tuesday?.totalTimeTracked) ??
                  0
                }
                handleClick={() => {
                  if (val?.days?.Tuesday?.date) {
                    redirectToDetailsPage(
                      appRoutes.timeSheetDetails(
                        val?.employee?.id,
                        val?.days?.Tuesday?.date
                      ).path
                    );
                  } else {
                    noAttendance();
                  }
                }}
              />
              <SimpleCard
                title="Wednesday"
                highlight={
                  convertMinutesToHours(
                    val?.days?.Wednesday?.totalTimeTracked
                  ) ?? 0
                }
                handleClick={() => {
                  if (val?.days?.Wednesday?.date) {
                    redirectToDetailsPage(
                      appRoutes.timeSheetDetails(
                        val?.employee?.id,
                        val?.days?.Wednesday?.date
                      ).path
                    );
                  } else {
                    noAttendance();
                  }
                }}
              />
              <SimpleCard
                title="Thursday"
                highlight={
                  convertMinutesToHours(
                    val?.days?.Thursday?.totalTimeTracked
                  ) ?? 0
                }
                handleClick={() => {
                  if (val?.days?.Thursday?.date) {
                    redirectToDetailsPage(
                      appRoutes.timeSheetDetails(
                        val?.employee?.id,
                        val?.days?.Thursday?.date
                      ).path
                    );
                  } else {
                    noAttendance();
                  }
                }}
              />
              <SimpleCard
                title="Friday"
                highlight={
                  convertMinutesToHours(val?.days?.Friday?.totalTimeTracked) ??
                  0
                }
                handleClick={() => {
                  if (val?.days?.Friday?.date) {
                    redirectToDetailsPage(
                      appRoutes.timeSheetDetails(
                        val?.employee?.id,
                        val?.days?.Friday?.date
                      ).path
                    );
                  } else {
                    noAttendance();
                  }
                }}
              />
              <SimpleCard
                title="Saturday"
                highlight={
                  convertMinutesToHours(
                    val?.days?.Saturday?.totalTimeTracked
                  ) ?? 0
                }
                handleClick={() => {
                  if (val?.days?.Saturday?.date) {
                    redirectToDetailsPage(
                      appRoutes.timeSheetDetails(
                        val?.employee?.id,
                        val?.days?.Saturday?.date
                      ).path
                    );
                  } else {
                    noAttendance();
                  }
                }}
              />
              <SimpleCard
                title="Sunday"
                highlight={
                  convertMinutesToHours(val?.days?.Sunday?.totalTimeTracked) ??
                  0
                }
                handleClick={() => {
                  if (val?.days?.Sunday?.date) {
                    redirectToDetailsPage(
                      appRoutes.timeSheetDetails(
                        val?.employee?.id,
                        val?.days?.Sunday?.date
                      ).path
                    );
                  } else {
                    noAttendance();
                  }
                }}
              />
              <SimpleCard
                title="Total"
                highlight={
                  convertMinutesToHours(val?.totalWeeklyTimeTracked) ?? 0
                }
              />
            </div>
          ))
        ) : (
          <Empty className="mt-15" description="Attendance not found" />
        )}
      </div>
    </div>
  );
};
