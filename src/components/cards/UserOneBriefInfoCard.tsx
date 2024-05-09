import { DEFAULT_PROFILE_IMAGE_URL } from "constants/general";

type TUserOneBriefInfoCardProps = {
  avatarUrl?: string;
  name: string;
  info: string;
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
const UserOneBriefInfoCard: React.FC<TUserOneBriefInfoCardProps> = ({
  name,
  avatarUrl,
  info,
}) => {
  return (
    <div className="shadow border p-2 rounded flex items-center gap-2">
      <img
        src={avatarUrl ?? DEFAULT_PROFILE_IMAGE_URL}
        alt="user"
        className="h-7"
      />
      <div>
        <h5 className="text-xs">{name}</h5>
        <span className="text-xs">{info}</span>
      </div>
    </div>
  );
};
