import { Menu } from "antd";
import { Link } from "react-router-dom";
import useGeneratePayrollNavRoutes from "../hooks/payroll-navigation-routes/useGeneratePayrollNavRoutes";

const PayrollSubNav = () => {
  const { navRoutes } = useGeneratePayrollNavRoutes();
  return (
    <div className="">
      <Menu
        className="bg-white py-4 px-3 text-accent rounded mb-9 shadow-md  text-sm font-medium"
        mode="horizontal"
        items={navRoutes
          .filter((item) => item.hidden === false)
          .map((item, i) => ({
            key: i,

            label: (
              <>
                {item?.path ? (
                  <Link to={item.path} className="">
                    <span className="">{item.title}</span>
                  </Link>
                ) : (
                  <span>{item.title}</span>
                )}
              </>
            ),
            children: item?.children
              ?.filter((item) => item.hidden === false)
              .map((item) => ({
                key: item.title,
                label: (
                  <>
                    {item?.path ? (
                      <Link to={item.path} className="">
                        <span className="">{item.title}</span>
                      </Link>
                    ) : (
                      <span>{item.title}</span>
                    )}
                  </>
                ),
              })),
          }))}
      />
    </div>
  );
};

export default PayrollSubNav;
