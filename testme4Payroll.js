const incrementalSteps = [
  {
    amount: 300000,
    percentage: 0.07,
  },
  {
    amount: 600000,
    percentage: 0.11,
  },
  {
    amount: 1100000,
    percentage: 0.15,
  },
  {
    amount: 1600000,
    percentage: 0.19,
  },
  {
    amount: 3200000,
    percentage: 0.21,
  },
  {
    amount: 3200000,
    percentage: 0.24,
  },
];
function calculateSalary(AH4) {
  if (AH4 <= 300000 / 12) {
    return 0.07 * AH4;
  } else if (AH4 > 300000 / 12 && AH4 <= 600000 / 12) {
    return 21000 / 12 + (AH4 - 300000 / 12) * 0.11;
  } else if (AH4 > 600000 / 12 && AH4 <= 1100000 / 12) {
    return 54000 / 12 + (AH4 - 600000 / 12) * 0.15;
  } else if (AH4 > 1100000 / 12 && AH4 <= 1600000 / 12) {
    return 129000 / 12 + (AH4 - 1100000 / 12) * 0.19;
  } else if (AH4 > 1600000 / 12 && AH4 <= 3200000 / 12) {
    return 224000 / 12 + (AH4 - 1600000 / 12) * 0.21;
  } else {
    return 560000 / 12 + (AH4 - 3200000 / 12) * 0.24;
  }
}

const test = eval("const re = 1;  re + 2 + 2;");

const AH4 = 400000; // Replace with the actual value of AH4
const result = calculateSalary(AH4);

function calculateSalary2(AH4, conditions) {
  for (let i = 0; i < conditions.length; i++) {
    const condition = conditions[i];
    if (AH4 > condition.min && AH4 <= condition.max) {
      return condition.salary + (AH4 - condition.min) * condition.rate;
    }
  }
  return 0;
}

const conditions = [
  { min: 0, max: 300000 / 12, salary: 0, rate: 0.07 },
  { min: 300000 / 12, max: 600000 / 12, salary: 21000 / 12, rate: 0.11 },
  { min: 600000 / 12, max: 1100000 / 12, salary: 54000 / 12, rate: 0.15 },
  { min: 1100000 / 12, max: 1600000 / 12, salary: 129000 / 12, rate: 0.19 },
  { min: 1600000 / 12, max: 3200000 / 12, salary: 224000 / 12, rate: 0.21 },
  { min: 3200000 / 12, max: Infinity, salary: 560000 / 12, rate: 0.24 },
];

let result1 = calculateSalary2(AH4, conditions);

function calculateSalaryEval(AH4, conditions) {
  const evalStatement = conditions.reduce((statement, condition, index) => {
    const conditionStatement = `(${AH4} > ${condition.min} && ${AH4} <= ${condition.max}) ? (${condition.salary} + (${AH4} - ${condition.min}) * ${condition.rate})`;

    if (index === 0) {
      return conditionStatement;
    } else {
      return `${statement} : ${conditionStatement}`;
    }
  }, "0");

  return `(${evalStatement})`;
}

const formula = calculateSalary(AH4, conditions);
const result3 = eval(formula);

export function calculateSalaryEvalStatement(AH4, conditions) {
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
const result4 = calculateSalaryEvalStatement("taxable_income", conditions);
const evalStatement = `const taxable_income = ${AH4}; ${result4};`;
