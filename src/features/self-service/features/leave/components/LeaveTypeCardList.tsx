import React from "react";
import { useFetchLeaveTypes } from "../hooks/useFetchLeaveTypes";
import { useApiAuth } from "hooks/useApiAuth";
import { usePagination } from "hooks/usePagination";
import { Pagination, Skeleton } from "antd";
import { DEFAULT_PAGE_SIZE } from "constants/general";
import { LeaveTypeCard } from "./LeaveTypeCard";

const LeaveTypeCardList = () => {
  const { companyId, token } = useApiAuth();
  const { pagination, onChange } = usePagination();

  const { data, isFetching } = useFetchLeaveTypes({
    companyId,
    token,
    pagination,
  });
  return (
    <div className="flex flex-col gap-4">
      <Skeleton
        loading={isFetching}
        paragraph={{ rows: DEFAULT_PAGE_SIZE }}
        active
      >
        <div className="flex flex-col gap-4">
          {data?.data.map((item) => (
            <LeaveTypeCard data={item} key={item.id} />
          ))}
        </div>
      </Skeleton>

      <Pagination {...pagination} onChange={onChange} size="small" />
    </div>
  );
};

export default LeaveTypeCardList;
