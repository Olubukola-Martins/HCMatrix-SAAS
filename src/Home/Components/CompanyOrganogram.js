import React, { useState } from "react";
import { Tree, TreeNode } from "react-organizational-chart";
import styled from "styled-components";
const admin = {
  name: "Mr Chuma",
  position: "CEO",
  directReports: [
    {
      name: "Basil",
      position: "Chief People Officer",
      directReports: [
        { name: "James", position: "Branch 1 Manager", directReports: [] },
        { name: "James", position: "Branch 2 Manager", directReports: [] },
        { name: "James", position: "Branch 3 Manager", directReports: [] },
      ],
    },
    {
      name: "Emma",
      position: "Head of Human Resources",
      directReports: [
        { name: "James", position: "Accontant", directReports: [] },
        { name: "James", position: "Food & Enjoyment", directReports: [] },
        { name: "James", position: "Appraisal Officer", directReports: [] },
      ],
    },
    {
      name: "Godswill",
      position: "Head of DevOps",
      directReports: [
        { name: "James", position: "Node Dev", directReports: [] },

        {
          name: "James",
          position: "Obi Dev",
          directReports: [
            { name: "James", position: "Appraisal Officer", directReports: [] },
          ],
        },
        {
          name: "Clara",
          position: "Head of Interns",
          directReports: [
            { name: "James", position: "Intern 1", directReports: [] },
            {
              name: "James",
              position: "Intern 2",
              directReports: [
                { name: "James", position: "New comer 1", directReports: [] },
                { name: "James", position: "New Comer 2", directReports: [] },
              ],
            },
          ],
        },
      ],
    },
    // { name: "Plata", position: "Head of AI & Research", directReports: [] },
  ],
};

const CompanyOrganogram = () => {
  const [rootAdmin, setRootAdmin] = useState(admin);
  const StyledNode = styled.div`
    padding: 5px;
    border-radius: 8px;
    display: inline-block;
    width: max-content;
    // background: var(--caramel);
  `;

  const orgCard = ({ position, name, image, isPrimary }) => {
    return (
      <StyledNode>
        <div className="  flex flex-col items-center gap-2 text-white">
          <img
            class="w-10 h-10 rounded-full relative border-white border-2 bg-caramel shadow-sm"
            src="https://picsum.photos/190"
            alt={name}
          />
          <div
            className={`${
              isPrimary
                ? "bg-yellow-300 py-1 px-2 rounded-md"
                : "bg-red-400 py-1 px-2 rounded-md"
            }`}
          >
            <h1 className="text-sm font-semibold ">{position}</h1>
            <p className="text-xs text-black ">{name}</p>
          </div>
        </div>
      </StyledNode>
    );
  };
  const displayOrganogram = (root, level = 1, max) => {
    // conditions to be met
    // if the levelCount is greater tha
    level++;
    if (max === level) return;
    return (
      <TreeNode label={orgCard({ position: root.position, name: root.name })}>
        {root.directReports.length >= 0 ? (
          root.directReports.map((item) => displayOrganogram(item, level, max))
        ) : (
          <TreeNode
            label={orgCard({
              position: root.position,
              name: root.name,
              isPrimary: max % 2 === 0,
            })}
          />
        )}
      </TreeNode>
    );
  };
  const [max, setMax] = useState(2);
  return (
    <div className="w-full py-4">
      <div className="w-full bg-card flex flex-col lg:flex-row gap-4 lg:justify-between lg:items-center py-1 px-2 rounded-md">
        <p className="text-sm md:text-base text-accent">
          Visualize all employee info at glance
        </p>
        <div className="flex gap-3 ">
          <button
            className="button text-sm"
            onClick={() => setMax((val) => val + 1)}
            disabled={max > 5}
          >
            <span className="text-sm">Show More</span>
          </button>
          <button
            className="button"
            onClick={() => setMax((val) => val - 1)}
            disabled={max <= 2}
          >
            Show Less
          </button>
        </div>
      </div>
      <div className="overflow-x-auto">
        <Tree
          lineWidth={"1px"}
          lineColor={`#aaa`}
          lineBorderRadius={"10px"}
          label={orgCard({ position: admin.position, name: admin.name })}
        >
          {admin.directReports.map((item) => displayOrganogram(item, 1, max))}
        </Tree>
      </div>
    </div>
  );
};

export default CompanyOrganogram;
