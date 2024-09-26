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

export const calculateSalaryEvalStatement = (
  AH4: string,
  _conditions: {
    min: number;
    max: number;
    salary: number;
    rate: number;
  }[],
  _divisor?: number
): string => {
  let divisor = _divisor ?? 12;
  const conditions = _conditions.map((item) => ({
    ...item,
    min: item.min / divisor,
    max: item.max / divisor,
    salary: item.salary / divisor,
  }));
  const starterValue = 0;
  const evalStatement = conditions.reduce((statement, condition, index) => {
    const conditionStatement = `(${AH4} > ${condition.min} && ${AH4} <= ${condition.max}) ? (${condition.salary} + (${AH4} - ${condition.min}) * ${condition.rate}) : ${statement}`;

    if (index === conditions.length - 1) {
      return conditionStatement;
    } else {
      return `(${conditionStatement})`;
    }
  }, `${starterValue}`);

  return evalStatement;
};
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

interface Condition {
  min: number;
  max: number | null;
  yearlyTaxableIncome: number;
  rate: number;
  salary: number;
}

interface Params {
  AH4: string | null;
  _conditions: Condition[];
}

export const extractParamsFromInput = (input: string): Params => {
  const AH4Match = input.match(/(\w+)\s*>\s*0\s*&&\s*(\w+)\s*<=\s*Infinity/);
  const AH4: string | null = AH4Match ? AH4Match[1] : null;

  const conditionsMatch =
    input.match(
      /(\w+)\s*>\s*(\d+(\.\d+)?)\s*&&\s*(\w+)\s*<=\s*(\d+(\.\d+)?)/g
    ) ?? [];
  const conditions: Condition[] = conditionsMatch.map((match) => {
    const [, minVar, min, , maxVar, max] =
      match.match(
        /(\w+)\s*>\s*(\d+(\.\d+)?)\s*&&\s*(\w+)\s*<=\s*(\d+(\.\d+)?)/
      ) || [];
    return {
      min: parseFloat(min),
      max: max === "Infinity" ? null : parseFloat(max),
      salary: 0,
      rate: 0,
      yearlyTaxableIncome: 0,
    };
  });

  const ratesAndSalariesMatch = input.match(
    /(\w+)\s*\+\s*\((\w+)\s*-\s*(\d+(\.\d+)?)\)\s*\*\s*(\d+(\.\d+)?)\)/g
  );
  ratesAndSalariesMatch?.forEach((match) => {
    const [, varName, , , min, , rate] =
      match.match(
        /(\w+)\s*\+\s*\((\w+)\s*-\s*(\d+(\.\d+)?)\)\s*\*\s*(\d+(\.\d+)?)\)/
      ) || [];
    const condition = conditions.find((c) => c.min === parseFloat(min));
    if (condition) {
      condition.salary = parseFloat(min);
      condition.rate = parseFloat(rate);
      condition.yearlyTaxableIncome = parseFloat(min);
    }
  });

  const outputConditions: Condition[] = conditions.map((condition) => ({
    min: condition.min,
    max: condition.max,
    yearlyTaxableIncome: condition.yearlyTaxableIncome,
    rate: condition.rate,
    salary: condition.salary,
  }));

  const output: Params = {
    AH4,
    _conditions: outputConditions,
  };

  return output;
};
