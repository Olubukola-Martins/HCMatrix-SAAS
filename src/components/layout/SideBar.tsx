import { NavLink, useLocation } from "react-router-dom";
import "./style/style.css";
import { useGenerateDBSidebarLinks } from "hooks/dashboard/useGenerateDBSidebarLinks";
import { Skeleton } from "antd";
import AIChatBotManager from "features/ai-bot/pages/AIChatBotManager";


const SideBar = () => {
  const { pathname } = useLocation();
  const { sidebarRoutes, isLoading } = useGenerateDBSidebarLinks();
  const isActiveRoute = (matcherKeys?: string[]) => {
    return matcherKeys?.some(
      (item) => pathname.toLowerCase().indexOf(item.toLowerCase()) !== -1
    );
  };
  
  return (
    <>
      <Skeleton loading={isLoading} paragraph={{ rows: 7 }}>
        <div className="h-screen overflow-y-auto flex-col bg-card flex items-center px-2 text-center pb-32 scrollBar">
          {sidebarRoutes
            .filter((item) => item.hidden === false)
            .map((route) => {
              const isActive = isActiveRoute(route.matcherKeys);

              return (
                <NavLink
                  key={route.path}
                  to={route.path}
                  className={`sideBarItemWrap ${isActive ? "active" : ""}`}
                >
                  <div className="flex justify-center">
                    <span className="sideBarList">{route.icon}</span>
                  </div>
                  <span className="sideBarName">{route.name}</span>
                </NavLink>
              );
            })}
           <AIChatBotManager />
        </div>
      </Skeleton>
    </>
  );
};

export default SideBar;
