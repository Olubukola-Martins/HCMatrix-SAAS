import React from "react";

interface barProp {
  width: string;
}
const ProgressBar = ({ width }: barProp) => {
  return (
    <div className="setUp_progress2" style={{ width: "100%", marginTop: "0" }}>
      <div className="setUp_progress-bar2" style={{ width, height: "6px" }} />
    </div>
  );
};

export default ProgressBar;
