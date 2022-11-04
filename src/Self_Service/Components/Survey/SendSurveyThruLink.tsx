import { Form, Input, Typography } from "antd";
import React from "react";

const SendSurveyThruLink = () => {
  return (
    <div className="mt-4">
      <div className="px-2 py-1 border rounded-md">
        <Typography.Paragraph copyable ellipsis className="mt-2">
          http://localhost:3000/self-service/survey/new
        </Typography.Paragraph>
      </div>
    </div>
  );
};

export default SendSurveyThruLink;
