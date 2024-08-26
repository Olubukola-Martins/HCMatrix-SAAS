import { useState, useEffect } from "react";
import { TLoanWorthinessInputData } from "./worthiness/useGetLoanWorthiness";

export const useLoanWorthinessInput = (
  initialAmount: number | null,
  delay: number
) => {
  const [worthinessInput, setWorthinessInput] =
    useState<TLoanWorthinessInputData>({});
  const [amount, setAmount] = useState<number | null>(initialAmount);

  useEffect(() => {
    const handler = setTimeout(() => {
      setWorthinessInput((prev) => ({
        ...prev,
        amount: amount ?? 0,
      }));
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [amount, delay]);

  return {
    worthinessInput,
    setAmount,
  };
};
