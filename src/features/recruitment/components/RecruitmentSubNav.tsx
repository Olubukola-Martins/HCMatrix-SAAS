import { Menu } from "antd";
import { recruitmentRoutes } from "config/router/routes/recruitment";
import { useNavigate } from "react-router-dom";

const RecruitmentSubNav = () => {
  const navigate = useNavigate();
  // TODO: Recruitment:: Update the route primary features and make use of a hook for generating links because of permissions implementation
  return (
    <div className="">
      <Menu
        className="bg-white py-4 px-3 text-accent rounded mb-9 shadow-md  text-sm font-medium"
        mode="horizontal"
        items={recruitmentRoutes
          .filter((item) => item.isPrimaryFeature)
          .map((item) => ({
            label: item.title,
            key: item.path,
            onClick: () => navigate(item.path),
          }))}
      />
    </div>
  );
};

export default RecruitmentSubNav;
