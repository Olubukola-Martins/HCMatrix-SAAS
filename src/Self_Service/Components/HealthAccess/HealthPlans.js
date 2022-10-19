import { Card } from "antd";
import React from "react";

const HealthPlans = () => {
  return (
    <div className="grid md:grid-cols-3 gap-6 mt-4">
      {Array(3)
        .fill(3)
        .map((_, i) => (
          <Card
            className="shadow-md"
            hoverable
            title={
              <div className="flex justify-between items-center">
                <h4 className="text-xs text-accent">Standard Plan</h4>
                <h4 className="text-xs text-accent">0 Employee(s)</h4>
              </div>
            }
          >
            <div className="flex flex-col gap-4 py-4">
              <h5 className="text-base">
                <span className="text-3xl font-extrabold">₦0</span>/month
              </h5>
              <div className="flex flex-col gap-4">
                {Array(4)
                  .fill(2)
                  .map((_, i) => (
                    <div className="flex gap-3">
                      <i class="ri-check-fill"></i>
                      {/* <i class="ri-check-circle-r-fill"></i> */}
                      <div className="flex flex-col gap-2 text-xs">
                        <h6 className="text-caramel">Lorem Ipsum</h6>
                        <p className="text-slate-500">
                          Lorem Ipsum dolor ameit
                        </p>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </Card>
        ))}
    </div>
  );
};

export default HealthPlans;
