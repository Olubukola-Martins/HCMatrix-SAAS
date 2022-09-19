import React from "react";

const AssetOverview = () => {
  const requestStyle =
    "flex items-center justify-between cursor-pointer group border-b pb-2";

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-4">
        <div className="col-span-3">graph</div>
        <div className="bg-mainBg border mt-4 rounded-lg text-sm shadow ">
          <div className="flex items-center justify-between px-3 py-3 border-b">
            <p className="font-medium">Recent Requests </p>
            <span className="text-xs">Status</span>
          </div>
          <div className="flex flex-col gap-3 px-3 py-2">
            {[1, 2, 3, 4, 5].map((item) => (
              <div key={item} className={requestStyle}>
                <h5 className="group-hover:text-caramel font-medium">
                  HP EliteBook
                </h5>
                <span className="text-xs">14 Sep,2022</span>
              </div>
            ))}
          </div>
          <h2 className="text-caramel pr-3 text-sm font-semibold cursor-pointer underline text-right hover:text-accent pb-2 pt-1">
            See All
          </h2>
        </div>
      </div>

       <h3>Asset Type</h3>
      <div className="grid grid-cols-1 md:grid-cols-4">
           <div>
             {[1,2,3,4,5,6].map(item => <div key={item} className="border rounded-md p-3">
                      <div className="rounded-md bg-mainBg shadow px-1 py-2">
                           
                      </div>
             </div>)}
           </div>

           <div>

           </div>
      </div>
    </div>
  );
};

export default AssetOverview;
