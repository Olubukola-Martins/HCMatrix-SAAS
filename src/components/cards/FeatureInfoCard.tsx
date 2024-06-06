import { Skeleton } from "antd";

export type IFeatureInfoCardProp = {
  title: string;
  desc?: string;
  icon: string | React.ReactNode;
  loading?: boolean;
};

export const FeatureInfoCard = ({
  title,
  icon,
  loading,
  desc,
}: IFeatureInfoCardProp) => {
  return (
    <div className="bg-card p-2 rounded-lg shadow cursor-pointer group text-accent">
      <div className="bg-mainBg transition ease-in-out duration-300 py-2 px-3 rounded-lg group-hover:border-b-2 group-hover:border-caramel group-hover:shadow-md">
        <Skeleton loading={loading} active paragraph={{ rows: 5 }}>
          <div className="flex items-center gap-2">
            {typeof icon === "string" && (
              <div className="border rounded-full h-11 w-11 flex items-center justify-center">
                <img src={icon} alt={title} />
              </div>
            )}
            {typeof icon !== "string" && <>{icon}</>}
            <h5 className="font-medium capitalize text-sm md:text-base">
              {title}
            </h5>
          </div>
          <p className="text-xs md:text-sm py-3">{desc}</p>
        </Skeleton>
      </div>
    </div>
  );
};
