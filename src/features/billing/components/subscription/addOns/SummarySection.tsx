import { AppButton } from "components/button/AppButton";
import { SummaryCard } from "components/cards/SummaryCard";
import React from "react";
import { boxStyle } from "styles/reused";

const SummarySection = () => {
  return (
    <div
      className={`${boxStyle} text-sm bg-card flex flex-col gap-4 items-stretch`}
    >
      <SummaryCard
        title="Summary"
        highlights={[
          { name: "Number of User", value: "0" },
          { name: "Monthly Amount", value: "$0.00" },
        ]}
        details={[
          { name: "Total User Licenses", value: "0" },
          { name: "Vat(0%)", value: "0" },
          { name: "Discount", value: "0" },
          { name: "Total Amount", value: "$0" },
        ]}
      />
      <AppButton label="Proceed" additionalClassNames={["button", "w-full"]} />

      <p className="text-center">
        By proceeding, you agree to our{" "}
        <a href="/" target="_blank" className="capitalize text-caramel">
          privacy policy
        </a>
      </p>
    </div>
  );
};

export default SummarySection;
