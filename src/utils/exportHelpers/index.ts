import * as XLSX from "xlsx";


export const exportEntityAsFile = ({
    fileName,
    entityRows,
    workSheetName,
  }: {
    workSheetName?: string;
    fileName?: string;
    entityRows: Record<string, string | number>[];
  }) => {
    const DEFAULT_WORKSHEET_NAME = "Export";
    const DEFAULT_EXPORT_FILE_NAME = "export.xlsx";
    const primaryWorksheet = XLSX.utils.json_to_sheet(entityRows) as any;
    /* calculate column width */
    primaryWorksheet["!cols"] = Object.keys(entityRows[0]).map((key) => ({
      wch: entityRows.reduce(
        (w, r: { [key: string]: string | number }) =>
          Math.max(w, Math.max(`${r[key]}`?.length, key.length)),
        12
      ),
    }));
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(
      workbook,
      primaryWorksheet,
      workSheetName ?? DEFAULT_WORKSHEET_NAME
    );
    XLSX.writeFile(workbook, fileName ?? DEFAULT_EXPORT_FILE_NAME);
  };