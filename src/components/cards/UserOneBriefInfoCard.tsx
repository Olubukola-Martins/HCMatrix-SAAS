import { DEFAULT_PROFILE_IMAGE_URL } from "constants/general";

type TUserOneBriefInfoCardProps = {
  avatarUrl?: string;
  name: string;
  info: string;
  info2?: string;
  info3?: string;
};
export const UserOneBriefInfoCards: React.FC<{
  data: TUserOneBriefInfoCardProps[];
  className?: string;
}> = ({ data, className = "grid grid-cols-2 gap-3" }) => {
  return (
    <div className={className}>
      {data.map((item) => (
        <UserOneBriefInfoCard key={item.name} {...item} />
      ))}
    </div>
  );
};
export const UserOneBriefInfoCard: React.FC<TUserOneBriefInfoCardProps> = ({
  name,
  avatarUrl = DEFAULT_PROFILE_IMAGE_URL,
  info,
  info2,
  info3,
}) => {
  return (
    <div className="shadow border p-2 rounded flex items-center gap-2 w-full">
      <img
        src={avatarUrl ?? DEFAULT_PROFILE_IMAGE_URL}
        alt="user"
        className="h-7"
      />
      <div>
        <h5 className="text-xs capitalize">{name}</h5>
        <p className="text-xs capitalize">{info}</p>
        <p className="text-xs capitalize">{info2}</p>
        <p className="text-xs capitalize">{info3}</p>
      </div>
    </div>
  );
};
