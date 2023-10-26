import { Collapse, Skeleton } from "antd";
import { DEFAULT_PROFILE_IMAGE_URL } from "constants/general";
import { TEmployee } from "features/core/employees/types";
import { getEmployeeFullName } from "features/core/employees/utils/getEmployeeFullName";
import moment from "moment";
import { Link } from "react-router-dom";
import { truncateString } from "utils/dataHelpers/truncateString";
const { Panel } = Collapse;

export const Birthdays: React.FC<{
  data?: (Pick<TEmployee, "avatarUrl" | "firstName" | "lastName" | "id"> & {
    dob: string;
  })[];
  loading?: boolean;
}> = ({ data, loading }) => {
  return (
    <Skeleton active loading={loading}>
      <div>
        {data && data.length === 0 && (
          <h4 className="text-gray-300 text-xl text-center py-5">
            No Birthday
          </h4>
        )}
        {data && data.length > 0 && (
          <>
            {" "}
            <Collapse>
              <Panel header="Upcoming Birthdays" key="1">
                {/* TODO: use a scroll area to ensure that overflow is visible */}
                <div className="grid grid-cols-2 gap-3">
                  {data.map((item) => (
                    <div
                      className="shadow border p-2 rounded flex items-center gap-2"
                      key={item.id}
                    >
                      <img
                        src={item?.avatarUrl ?? DEFAULT_PROFILE_IMAGE_URL}
                        alt="user"
                        className="h-7"
                      />
                      <div>
                        <h5 className="text-xs">
                          {truncateString(getEmployeeFullName(item), 12)}
                        </h5>
                        <span className="text-xs">
                          {moment(item?.dob).format("MMMM DD")}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </Panel>
            </Collapse>
            <Link
              to="/"
              className="underline text-caramel flex justify-center pt-7"
            >
              View All
            </Link>
          </>
        )}
      </div>
    </Skeleton>
  );
};
