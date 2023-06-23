# This is to provide a breakdown of how payroll will be implemented/used

- Cost centres (accounts for payments to be made from) need to be set up if they plan on disbursing payments [Done]
- Admin has to first create a tax policy (other tax policies can be created later), this tax policy will be based of taxable_income, and will be responsible for creating a deductible salary component called PAYE(TAX). The UI to create tax policy will be user friendly but what will be sent to the backend will be an eval expression [Done]
- Then create different exchange rates that will be used by expatriates && admin will have to set his payroll currency in company params [Done]
- Then the admin can proceed to set up the differnt payroll schemes (Direct Salary, ...)
- After which the admin can then create payroll and run it as well , review and send for appoval

## Types of Payroll

- Office: Should be based on the pay grade category of employee [SECOND]
- Salary: Should be direct salary [FIRST]
- Wages: This should be same as timesheet/attendance based settings - consider its integration [THIRD]
- Project: The project owner gets paid on whatever time , as settings apply [LAST]

### Payroll Scheme: Direct Salary

#### Scheme:

- Name(non-editable), gross pay is derived from salary(amount ass with employee directly), Payroll Frequency(non-editable)[monthly, you should still be able to create payroll for the same month multiple times cos you should be able to remove employees or run payroll for a particular branch/group/role , also if an employee with this salary type has had his/her payroll ran for the month then he/she should not be included for the month, and system should inform the admin that 5 users with this type of payroll have already had their payroll ran and as a result are now exempted], Disbursement: Do you want app to diburse payment(set up cost centres), day to disburse payment(1 - 29), Payslip Issuance(Payroll Day): Do you want to issue payslip, when payroll is approved/disbursed.
- Select Approval Workflow: ... (this should be saved with payroll for recording purposes): There should be an approval section where, question is asked wether they wish for this payroll to undergo an approval process, if so then use workflow, else whoever has the role of creating payroll(could change this permission to something more decriptive) will be able to proceed to disburse payment/make this payroll unable to rollback
- Allowance: {
  name: "thirthenth_month", //name of component && should be unique
  identifier: "thirthenth_month",
  formula: "0", //this could be an amount or a formula referencing other components
  dependencies: [],
  type: allowance|deduction -> allowance in this case
  }
- Deduction: {
  name: "thirthenth_month", //name of component && should be unique
  identifier: "thirthenth_month",
  formula: "0", //this could be an amount or a formula referencing other components
  dependencies: [],
  type: allowance|deduction -> deduction in this case
  }
- 13th month: {
  name: "thirteenth_month", //name of component && should be unique
  identifier: "thirthenth_month",
  formula: "0", //this could be an amount or a formula referencing other components
  dependencies: [],
  type: allowance|deduction -> allowance in this case
  }
- Pension: Select the comp/comps that are representative of your pension {The accounts to pay this}
- Overtime: Based on an hourly rate => formula/amount for each hr, along side minimum hr to be paid 4, and max (essentially range)
- Default Taxation: Taxable Income: {formula/amount, dependencies}, Create && useTax Policy: {formula/amount, dependencies} OR select an existing tax policy
- Automatically notify payroll admin of payroll 5 days before

#### Creating/Running Payroll:

- Name of Payroll, Month of Payroll: month you want to run payroll 4, Exhange Rate: will be the base exchange rate and will indicate that to user, just that they can create exchange rates from there as well as see existing ones: Just to showcase, this exchange rates will only come into play with expatriates
- Overtime Timesheet: This will be a time sheet that will contain empuid,&& overtime hours spent in that month [This sheet will be used to create an overtime component]
- Admin will be able to review/rollback payroll before sending for approval if the payroll scheme setting indicates so, if it doesn't he/she should be able to review changes before proceeding to review payroll still before commiting payroll/disbursing payment (this is dependent on payroll scheme setting as well)
- General Allowance Section where you can activate/deactivate components provided no other component depends on them
- General Deduction Section where you can activate/deactivate components provided no other component depends on them
- Employee Payroll Updates(Non Expatriates): This is a table that will indicate the [just as indicated in figma file], the actions will include add allowance/deduction, exempt/deactivate employee from payroll calc, also view the indivual employee breakdown: This will showcase the breakdown of employee allowance and deductions, also the edit which will be similar to the view, but will allow for the deactivation of certain components you do not want application to employee again, just will make those components 0.
- Employee Payroll Updates(Expatriates): This is similar to above, only that it will have extra actions such as: selecting the exhange rate[it seems as a result of showcasing the amount for expatriate, the exhange rate will have to be set from employee && not here, also an excahnge rate history in the employee profile will be helpful for audit purposes] to be used for expatriates, the set up taxation(this will be a form where you can specify the tax policy to be used by expatriate or exempt them from tax)

## Side Notes

- Payroll run will always be run as a sum of deductible and additonal salary component applied to each employee/project entry
- What the backend will run on its end will be first for each entry, hence loop through to get each sum and then sum
- An example for the data sent to backend and potential calculation: emp_no/uniq id =>

```
{allowances: [{

}], deductions: []}
```
