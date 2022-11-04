import React, { useState } from "react";
import DashboardLayout from "../../Layout/DashboardLayout";
import Wallet from "../Assets/wallet.svg";
import Bank from "../Assets/bank.svg";
import Card from "../Assets/card.png";

interface IBank {
  name: string;
  bankName: string;
  accNo: string;
}

const Billings = () => {
  const [banks, setBanks] = useState<IBank[]>([]);
  return (
    <DashboardLayout>
      <div className="Container mt-4 pb-8">
        <div className="flex justify-between items-center mb-6 ">
          <span className="font-bold text-xl">Billings</span>
        </div>

        <div className="flex gap-6 flex-col-reverse md:flex-col justify-between mt-3  w-full">
          {/* the wallet card */}
          <div className="border rounded-md  w-full shadow-md ">
            {/* heaader */}
            <div className="heading px-3 lg:px-6 py-2 border-0 border-b flex justify-between items-center cursor-pointer">
              <h4 className="font-semibold text-base">Wallet</h4>
              <button className="button flex items-center gap-1">
                {" "}
                <i
                  className="fa-solid fa-check-circle cursor-pointer  text-white"
                  title="default"
                ></i>{" "}
                Default
              </button>
            </div>
            {/* content */}
            <div className="py-4 px-3">
              <div className="flex gap-4 items-center text-gray-600 text-sm">
                <img src={Wallet} alt="bg" />
                <div className="flex flex-col gap-3">
                  <h6>Bank Name: Wema Bank</h6>
                  <h6>Account No: 10909089090</h6>
                  <h6>Account Balance: $100.00</h6>
                  <div className="flex gap-2 mt-2">
                    <button className="py-1 px-2 text-sm border-caramel border rounded text-caramel">
                      Fund Wallet
                    </button>
                    <button className="py-1 px-2 text-sm border-caramel border rounded text-caramel">
                      Transfer
                    </button>
                    <button className="py-1 px-2 text-sm border-caramel border rounded text-caramel">
                      View Wallet
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Card (0) */}
          <div className="border rounded-md  w-full shadow-md">
            {/* heaader */}
            <div className="heading px-3 lg:px-6 py-2 border-0 border-b flex justify-between items-center cursor-pointer">
              <h4 className="font-semibold text-base">Card (0)</h4>
              <button className="py-1 px-2 text-sm border-caramel border rounded text-caramel">
                Make Default
              </button>
            </div>
            {/* content */}
            <div className="py-4 px-3">
              <div className="flex gap-4 items-center text-gray-600 text-sm">
                <img src={Wallet} alt="bg" />
                <div className="flex flex-col gap-3">
                  <h6>Pay with card</h6>
                  <p>
                    Make payment with a bank issued debit card. You can add many
                    debit cards as you want.
                  </p>
                  <div className="flex gap-2 mt-2">
                    <button className="py-1 px-2 text-sm border-caramel border rounded text-caramel">
                      Add Card
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Bank Transfer */}
          <div className="border rounded-md  w-full shadow-md">
            {/* heaader */}
            <div className="heading px-3 lg:px-6 py-2 border-0 border-b flex justify-between items-center cursor-pointer">
              <h4 className="font-semibold text-base">Bank Transfer</h4>
              <button className="py-1 px-2 text-sm border-caramel border rounded text-caramel">
                Make Default
              </button>
            </div>
            {/* content */}
            <div className="py-4 px-3">
              <div className="flex gap-4 items-center text-gray-600 text-sm">
                <img src={Bank} alt="bg" />
                <div className="flex flex-col gap-3">
                  <h6 className="font-semibold text-black">
                    Pay with Bank Transfer
                  </h6>
                  <p>Make payment dirctly from your banking app.</p>
                  <div className="flex gap-2 mt-2">
                    <button className="py-1 px-2 text-sm border-caramel border rounded text-caramel">
                      Pay Now
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Direct Debit */}
          <div className="border rounded-md  w-full shadow-md">
            {/* heaader */}
            <div className="heading px-3 lg:px-6 py-2 border-0 border-b flex justify-between items-center cursor-pointer">
              <h4 className="font-semibold text-base">Direct Debit</h4>
              <button className="py-1 px-2 text-sm border-caramel border rounded text-caramel">
                Make Default
              </button>
            </div>
            {/* content */}
            <div className="py-4 px-3">
              {banks.length === 0 && (
                <div className="flex gap-4 items-center text-gray-600 text-sm">
                  <img src={Bank} alt="bg" />
                  <div className="flex flex-col gap-3">
                    <h6 className="font-semibold text-black">
                      Pay via Direct Debit
                    </h6>
                    <p>Make payments directly from your account.</p>
                    <div className="flex gap-2 mt-2">
                      <button
                        className="py-1 px-2 text-sm border-caramel border rounded text-caramel"
                        onClick={() =>
                          setBanks((banks) => [
                            ...banks,
                            {
                              name: "John Doe",
                              bankName: "Unity Bank",
                              accNo: "12009012231",
                            },
                          ])
                        }
                      >
                        Add Bank
                      </button>
                    </div>
                  </div>
                </div>
              )}
              {banks.length > 0 && (
                <div className="grid grid-cols-3 gap-4">
                  {banks.map((item) => (
                    <img src={Card} alt="bg" />
                  ))}
                  <div className="border-caramel border flex justify-center items-center rounded">
                    <button
                      className="py-1 px-2 text-sm border-caramel border rounded text-caramel"
                      onClick={() =>
                        setBanks((banks) => [
                          ...banks,
                          {
                            name: "John Doe",
                            bankName: "Unity Bank",
                            accNo: "12009012231",
                          },
                        ])
                      }
                    >
                      Add Bank
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Billings;
