import React, { useState } from "react";
import AddAssetsType from "../Components/Assets/AddAssetsType";

const AssetType = () => {
  const [addAssetTypeModal, setAddAssetTypeModal] = useState(false);
  return (
    <div>
      <AddAssetsType
        open={addAssetTypeModal}
        handleClose={() => setAddAssetTypeModal(false)}
      />
      <div className="flex items-center gap-3 justify-end my-6">
        <button className="button" onClick={() => setAddAssetTypeModal(true)}>Add Asset</button>
        <button
          className="transparentButton"
          style={{ color: "var(--caramel)" }}
        >
          Generate Report
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-5">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((item) => (
          <div
            key={item}
            className="border rounded-md p-2 shadow-sm bg-card cursor-pointer hover:shadow-md"
          >
            <div className="rounded-md bg-mainBg shadow p-3 border">
              <div className="flex items-center justify-between">
                <p className="text-sm py-2">Furniture & Fittings</p>
                <i className="ri-more-2-fill text-lg"></i>
              </div>
              <h2 className="font-bold text-lg">0</h2>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AssetType;
