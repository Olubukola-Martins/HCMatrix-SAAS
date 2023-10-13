export const createTaxyearlyTaxableIncomeComponentFormula = ({
  taxableIncome,
  conditions,
  divisor = 12,
}: {
  taxableIncome: string;
  conditions: TTaxCondition[];
  divisor?: number;
}) => {
  const result4 = calculateyearlyTaxableIncomeEvalStatement({
    taxableIncome,
    conditions,
    divisor,
  });
  const evalStatement = ` ${result4}`;
  // const evalStatement = `const taxable_income = (${taxableIncome}); ${result4};`;
  return evalStatement;
};

function calculateyearlyTaxableIncomeEvalStatement({
  taxableIncome,
  conditions,
  divisor = 12,
}: {
  taxableIncome: string;
  conditions: TTaxCondition[];
  divisor?: number;
}) {
  const parsedConditions = conditions.map((condition) => ({
    ...condition,
    max: condition.max / divisor,
    min: condition.max / divisor,
    yearlyTaxableIncome: condition.yearlyTaxableIncome / divisor,
  }));
  const evalStatement = parsedConditions.reduce(
    (statement, condition, index) => {
      const conditionStatement = `(${taxableIncome} > ${condition.min} && ${taxableIncome} <= ${condition.max}) ? (${condition.yearlyTaxableIncome} + (${taxableIncome} - ${condition.min}) * ${condition.rate}) : ${statement}`;

      if (index === conditions.length - 1) {
        return conditionStatement;
      } else {
        return `(${conditionStatement})`;
      }
    },
    "0"
  );

  return evalStatement;
}
export interface TTaxCondition {
  min: number;
  max: number;
  yearlyTaxableIncome: number;
  rate: number;
}

export function calculateSalaryEvalStatement(
  AH4: string,
  _conditions: {
    min: number;
    max: number;
    salary: number;
    rate: number;
  }[],
  _divisor?: number
) {
  let divisor = _divisor ?? 12;
  const conditions = _conditions.map((item) => ({
    ...item,
    min: item.min / divisor,
    max: item.max / divisor,
    salary: item.salary / divisor,
  }));
  const evalStatement = conditions.reduce((statement, condition, index) => {
    const conditionStatement = `(${AH4} > ${condition.min} && ${AH4} <= ${condition.max}) ? (${condition.salary} + (${AH4} - ${condition.min}) * ${condition.rate}) : ${statement}`;

    if (index === conditions.length - 1) {
      return conditionStatement;
    } else {
      return `(${conditionStatement})`;
    }
  }, "0");

  return evalStatement;
}
export const dummyConditions = [
  { min: 0, max: 300000, yearlyTaxableIncome: 0, rate: 7 },
  {
    min: 300000,
    max: 600000,
    yearlyTaxableIncome: 21000,
    rate: 11,
  },
  {
    min: 600000,
    max: 1100000,
    yearlyTaxableIncome: 54000,
    rate: 15,
  },
  {
    min: 1100000,
    max: 1600000,
    yearlyTaxableIncome: 129000,
    rate: 19,
  },
  {
    min: 1600000,
    max: 3200000,
    yearlyTaxableIncome: 224000,
    rate: 21,
  },
  {
    min: 3200000,
    max: Infinity,
    yearlyTaxableIncome: 560000,
    rate: 24,
  },
];
