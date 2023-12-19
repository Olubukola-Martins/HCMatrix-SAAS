let gross_pay = 300000.0;
let meal_allowance = 400000;

// payroll
// fix paygrade issue
// fix payroll creation bug
// workflow ui
// apply on behalf of
// test app n come up with scripts
// remove medical history
// search for address input
// remove unused items like employee count
// ensure format is applied to money values

let ans = eval(
  gross_pay * 20 > 3200000 && gross_pay * 20 <= Infinity
    ? 560000 + (gross_pay * 20 - 3200000) * 0.24
    : gross_pay * 20 > 1600000 && gross_pay * 20 <= 3200000
    ? 224000 + (gross_pay * 20 - 1600000) * 0.21
    : gross_pay * 20 > 1100000 && gross_pay * 20 <= 1600000
    ? 129000 + (gross_pay * 20 - 1100000) * 0.19
    : gross_pay * 20 > 600000 && gross_pay * 20 <= 1100000
    ? 54000 + (gross_pay * 20 - 600000) * 0.15
    : gross_pay * 20 > 300000 && gross_pay * 20 <= 600000
    ? 21000 + (gross_pay * 20 - 300000) * 0.11
    : gross_pay * 20 > 0 && gross_pay * 20 <= 300000
    ? 0 + (gross_pay * 20 - 0) * 0.07
    : 0
);
console.log(ans, "...");
