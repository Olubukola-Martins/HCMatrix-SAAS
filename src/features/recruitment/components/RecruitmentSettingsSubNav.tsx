import { Menu } from "antd";
import { recruitmentRoutes } from "config/router/routes/recruitment";
import { useNavigate } from "react-router-dom";

export const RecruitmentSettingsSubNav = () => {
  const navigate = useNavigate();
  return (
    <div className="">
      <Menu
        className="bg-white py-4 px-3 text-accent rounded mb-9 shadow-md  text-sm font-medium"
        mode="horizontal"
        items={recruitmentRoutes
          .filter((item) => item.isPrimaryFeature === false)
          .map((item) => ({
            label: item.title,
            key: item.path,
            onClick: () => navigate(item.path),
          }))}
      />
    </div>
  );
};


