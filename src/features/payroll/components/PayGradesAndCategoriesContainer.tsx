import PageSubHeader from "components/layout/PageSubHeader";
import React, { useState } from "react";
import { Tabs } from "antd";
import PayGradesTable from "./payGrades/PayGradesTable";
import PayGradeCategoriesTable from "./payGradeCategories/PayGradeCategoriesTable";
import CreatePayGradeCategory from "./payGradeCategories/CreatePayGradeCategory";
import AddPayGrade from "./payGrades/AddPayGrade";

export const PayGradesAndCategoriesContainer = () => {
  const [comp, setComp] = useState<"add-category" | "add-grade">();
  const tabItems = [
    {
      key: "Categories",
      label: "Categories",
      children: <PayGradeCategoriesTable />,
    },
    {
      key: "Grades",
      label: "Grades",
      children: <PayGradesTable />,
    },
  ];
  return (
    <>
      <CreatePayGradeCategory
        open={comp === "add-category"}
        handleClose={() => setComp(undefined)}
      />
      <AddPayGrade
        open={comp === "add-grade"}
        handleClose={() => setComp(undefined)}
      />{" "}
      <div className="flex flex-col gap-6">
        {/* <NewTransfer open={showM} handleClose={() => setShowM(false)} /> */}
        <PageSubHeader
          description={`You can now create/edit pay grade and their parent categories.`}
          actions={[
            {
              name: "New Category",
              handleClick: () => setComp("add-category"),
            },
            { name: "Add Grade", handleClick: () => setComp("add-grade") },
          ]}
        />
        <Tabs items={tabItems} />
      </div>
    </>
  );
};
