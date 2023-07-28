import { Input } from "antd";
import { LeaningNavbar } from "../components/LeaningNavbar";
import { PageIntro } from "components/layout/PageIntro";
import { appRoutes } from "config/router/paths";
import { AppButton } from "components/button/AppButton";




export const Udemy = () => {
  return (
    <>
      <LeaningNavbar active="none-active" />
      <div className="Container">
        <PageIntro link={appRoutes.leaningHome} title="Udemy" />

        <div className="flex justify-between items-center mt-10 mb-7">
          <Input.Search
            placeholder="Search branch"
            style={{ width: "35%" }}
            allowClear
          />
          <div className="flex items-center gap-x-3">
            <AppButton label="Add License" />
            <button className="transparentButton flex items-center">
              <span>Filter</span> <i className="ri-filter-line"></i>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
