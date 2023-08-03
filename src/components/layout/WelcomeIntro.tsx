import React from "react";

export const WelcomeIntro: React.FC<{
  title: string;
  description?: string;
}> = ({ title, description }) => {
  return (
    <div>
      <h2 className="font-medium text-lg pb-2">{title}</h2>
      <p>{description}</p>
    </div>
  );
};
