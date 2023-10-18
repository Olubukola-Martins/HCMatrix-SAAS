import { Dropdown } from "antd";
import Themes from "components/Themes";
import { appRoutes } from "config/router/paths";
import { Link } from "react-router-dom";

const moreItems = [{ link: appRoutes.documents, title: "Documents" }];

const moreContent = (
  <Themes>
    <ul className="py-3 shadow-md px-4 text-sm font-medium rounded-md flex flex-col gap-3">
      {moreItems.map((item) => (
        <Link
          to={item.link}
          key={item.title}
          className="cursor-pointer hover:text-caramel"
        >
          {item.title}
        </Link>
      ))}
    </ul>
  </Themes>
);

export type ISelfBoxProps = {
  title: string;
  desc?: string;
  icon: string;
  link: string;
};
export type TRequisitionBoxProps = {
  icon: string;
  requisitions: { link: string; title: string; hidden: boolean }[];
};
export const RequisitionBox = ({
  icon,
  requisitions,
}: TRequisitionBoxProps) => {
  if (requisitions.filter((item) => item.hidden === false).length === 0) {
    return null;
  }
  return (
    <div className="bg-card p-2 rounded-lg shadow cursor-pointer group text-accent">
      <div className="bg-mainBg transition ease-in-out duration-300 py-2 px-3 rounded-lg group-hover:border-b-2 group-hover:border-caramel group-hover:shadow-md">
        <div className="flex items-center gap-2 justify-between">
          <div className="flex items-center gap-2">
            <div className="border rounded-full h-11 w-11 flex items-center justify-center">
              <img src={icon} alt="requisition" />
            </div>
            <h5 className="font-medium capitalize text-sm md:text-base">
              Requisition
            </h5>
          </div>
          {
            <Dropdown
              overlayStyle={{ top: 1000 }}
              overlay={
                <Themes>
                  <div className="py-3 shadow-md px-4 text-sm font-medium rounded-md flex flex-col gap-3">
                    {requisitions
                      .filter((item) => item.hidden === false)
                      .map((item, i) => (
                        <Link
                          key={i}
                          to={item.link}
                          className="cursor-pointer hover:text-caramel"
                        >
                          {item.title}
                        </Link>
                      ))}
                  </div>
                </Themes>
              }
              trigger={["click"]}
              placement="bottom"
            >
              <i className="ri-more-fill text-lg"></i>
            </Dropdown>
          }
        </div>
        <p className="text-xs md:text-sm py-3">
          You can now manage different requisitions within your organization
        </p>
      </div>
    </div>
  );
};
export const MoreBox = () => {
  return (
    <div className="bg-card p-2 rounded-lg shadow cursor-pointer group text-accent">
      <div className="bg-mainBg transition ease-in-out duration-300 py-2 px-3 rounded-lg  group-hover:border-b-2 group-hover:border-caramel group-hover:shadow-md">
        <div className="flex items-center justify-between">
          <button
            className="transparentButton"
            style={{ color: "var(--caramel)" }}
          >
            More
          </button>
          <Dropdown
            overlay={moreContent}
            trigger={["click"]}
            placement="bottom"
          >
            <i className="ri-more-fill text-lg"></i>
          </Dropdown>
        </div>
        <p className="text-xs md:text-sm py-3">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </p>
      </div>
    </div>
  );
};

const SelfBox = ({
  title,
  desc = "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  icon,
  link,
}: ISelfBoxProps) => {
  return (
    <Link
      to={link}
      className="bg-card p-2 rounded-lg shadow cursor-pointer group text-accent"
    >
      <div className="bg-mainBg transition ease-in-out duration-300 py-2 px-3 rounded-lg group-hover:border-b-2 group-hover:border-caramel group-hover:shadow-md">
        <div className="flex items-center gap-2">
          <div className="border rounded-full h-11 w-11 flex items-center justify-center">
            <img src={icon} alt={title} />
          </div>
          <h5 className="font-medium capitalize text-sm md:text-base">
            {title}
          </h5>
        </div>
        <p className="text-xs md:text-sm py-3">{desc}</p>
      </div>
    </Link>
  );
};

export default SelfBox;
