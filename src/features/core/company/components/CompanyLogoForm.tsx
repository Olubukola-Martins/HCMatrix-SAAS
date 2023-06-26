import { FileUpload } from "components/FileUpload";
import React from "react";

const CompanyLogoForm = () => {
  return (
    <FileUpload
      allowedFileTypes={["image/jpeg", "image/png", "image/jpg"]}
      fileKey="logoUrl"
      textToDisplay="Upload Company Logo"
      displayType="icon"
    />
  );
};

export default CompanyLogoForm;
