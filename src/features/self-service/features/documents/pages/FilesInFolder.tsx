import { AppButton } from "components/button/AppButton";
import { PageIntro } from "components/layout/PageIntro";
import { appRoutes } from "config/router/paths";
import { BackgroundCurves } from "features/self-service/components/BackgroundCurves";
import SelfServiceSubNav from "features/self-service/components/SelfServiceSubNav";

const FilesInFolder = () => {
  return (
    <div>
      <SelfServiceSubNav />
      <div className="relative mb-10">
        <BackgroundCurves />
        <div className="absolute top-4 Container w-full">
          <div className="flex items-center justify-between mt-5">
            <PageIntro title="Folder name" link={appRoutes.documents} />
            <div className="flex items-center gap-3">
              <AppButton label="Add New File" />
            </div>
          </div>
          <p className="text-accent text-[15px]">
            You can now preview your files
          </p>

          {/*  */}
        </div>
      </div>
    </div>
  );
};

export default FilesInFolder;
