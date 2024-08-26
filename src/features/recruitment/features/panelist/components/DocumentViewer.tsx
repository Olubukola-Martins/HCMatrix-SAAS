import { DocumentViewer } from "react-documents";

const DocumentPreviewer = ({ fileURI, extraStyles }: { fileURI: string ; extraStyles?: string }) => {
  return (
    <div className={`w-[80vw] h-96 overflow-auto border rounded-lg p-4 mt-3   ${extraStyles}`}>
      <DocumentViewer className="h-full" viewerUrl={fileURI} viewer="url"    />
    </div>
  );
};

export default DocumentPreviewer;
