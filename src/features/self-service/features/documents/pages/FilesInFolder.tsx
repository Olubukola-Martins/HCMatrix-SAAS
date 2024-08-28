import { AppButton } from "components/button/AppButton";
import { PageIntro } from "components/layout/PageIntro";
import { appRoutes } from "config/router/paths";
import { BackgroundCurves } from "features/self-service/components/BackgroundCurves";
import SelfServiceSubNav from "features/self-service/components/SelfServiceSubNav";
import { useGetFilesInFolder } from "../hooks/file/useGetFilesInFolder";
import { usePagination } from "hooks/usePagination";
import { useParams } from "react-router-dom";
import { TableWithFocusType } from "components/table";
import { FILE_TABLE_COLUMNS } from "../components/columns/files";
import { IViewFilesActions } from "../types/fileList";

const FilesInFolder = () => {
  const params = useParams();
  const id = params.id;
  const { pagination, onChange } = usePagination({ pageSize: 10 });
  const { data, isLoading } = useGetFilesInFolder({
    data: { pagination },
    folderId: id as unknown as number,
  }); 
  
  const actions: IViewFilesActions = {
      fromFolderView: true,
  };


  const columns = FILE_TABLE_COLUMNS(actions);

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

          <TableWithFocusType
            className="mt-3"
            columns={columns}
            dataSource={data?.data}
            loading={isLoading}
            pagination={{ ...pagination, total: data?.total }}
            onChange={onChange}
          />
        </div>
      </div>
    </div>
  );
};

export default FilesInFolder;
