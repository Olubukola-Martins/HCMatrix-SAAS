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

### Payroll Scheme: Wages

#### Scheme: General Overview Gist

- Payroll Frequency[editable]: select either monthly or daily
- This will occur based on a time sheet basis
- Each employee will have an hourly gross pay
- The admin will have the ability to upload a timesheet containing the hours worked by employee on each day: Depending on the payroll frequency used the excel sheet will account for the days the hrs worked came into play
- There is no overtime in this payroll
- The time and attendance integration will enable the admin to have the employee payroll updates automatically generated and popoluated based on time sheet generated behind the scenes by the system
- The employee payroll updates will still have allowance/deductions that will be applied based on the payroll frequency
- There will still be general allowances and deductions, as well as tax similar to office payroll
- Only difference will be no overtime and if they don't purchase time and attendace they will have to upload their own time sheet containing the emp nums of existing employees, but if they do then they can simply download the time sheet from time and attendance and upload, or at the click of a button have the system apply appropriate filters and create a time sheet that is automatically applied

#### Creating/Running Payroll

- Name of Payroll
-

### Payroll Scheme: Project

#### Setup Projects

- Name
- Description
- Participants

#### Scheme:

- A project has to first be created elsewhere
- Set Up Payroll Scheme for each project: Select Project, Payroll Frequency: Monthly, Start Date, Duration[End Date: Calculated based on Duration], Monthly Budget(Participants Sum && Taxation should not exceed this amount), Taxation: Yes/no; if yes then set up tax component to be applied to project on the basis of the total amount to be paid that month, Set Up the base pay of each employee, and allowance/dedcutions (Default Parameters), set the approval workflow if need be

#### Creating/Running Payroll:

- Select the project you wish to run payroll for (as opposed to name)
- Payment Description: will help provide context for admin in future when he needs to understand y payment differs
- Also showcase the monthly budget of project(non-editable)[Not to be used]
- Selecting the month will be based on project start date and the duration, hence will be a dropdown
- No overtime is accounted for
- No allowances or deductions
- Employee/Participant payroll updates will still be applicable: The Default values assigned to participants will be set in that particular project's payroll scheme -> This will also be the case for taxation, The table however will vary as it will have certain columns: emp_num, name, scheme,exchange rate, amount payable (this will be editable), The table will also enable the admin to add bonuses, in general to every one as well as deductions, hence each user column will have allowances/deductions alongside the base pay which will be defined in the payroll scheme of project, as a result the amount assigned to each employee in project will not be editable, also the admin will not be able to activate/deactivate users
- Taxation will be applicable to the project && not the employees(participants of the project): The total amount generated from the sum of the allowance of each employee/participant will be used as the taxable income for the taxation: tax will be a component applied to the entire project, hence will have thesame implications as a typical component, and this can be turned off/on. Where will this be set, scheme or creating/running payroll. Let it just show dynamically on the creting payroll based on the tax setup in project payroll scheme

### Payroll Scheme: Office/Grade

#### Scheme:

- Name(non-editable), gross pay is derived from salary(amount ass with employee directly), Payroll Frequency(non-editable)[monthly, you should still be able to create payroll for the same month multiple times cos you should be able to remove employees or run payroll for a particular branch/group/role , also if an employee with this salary type has had his/her payroll ran for the month then he/she should not be included for the month, and system should inform the admin that 5 users with this type of payroll have already had their payroll ran and as a result are now exempted], Disbursement: Do you want app to diburse payment(set up cost centres), day to disburse payment(1 - 29), Payslip Issuance(Payroll Day): Do you want to issue payslip, when payroll is approved/disbursed.
- Select Approval Workflow: ... (this should be saved with payroll for recording purposes): There should be an approval section where, question is asked whether they wish for this payroll to undergo an approval process, if so then use workflow, else whoever has the role of creating payroll(could change this permission to something more decriptive) will be able to proceed to disburse payment/make this payroll unable to rollback
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

### Payroll Scheme: Direct Salary

#### Scheme:

- Name(non-editable), gross pay is derived from salary(amount ass with employee directly), Payroll Frequency(non-editable)[monthly, you should still be able to create payroll for the same month multiple times cos you should be able to remove employees or run payroll for a particular branch/group/role , also if an employee with this salary type has had his/her payroll ran for the month then he/she should not be included for the month, and system should inform the admin that 5 users with this type of payroll have already had their payroll ran and as a result are now exempted], Disbursement: Do you want app to diburse payment(set up cost centres), day to disburse payment(1 - 29), Payslip Issuance(Payroll Day): Do you want to issue payslip, when payroll is approved/disbursed.
- Select Approval Workflow: ... (this should be saved with payroll for recording purposes): There should be an approval section where, question is asked whether they wish for this payroll to undergo an approval process, if so then use workflow, else whoever has the role of creating payroll(could change this permission to something more decriptive) will be able to proceed to disburse payment/make this payroll unable to rollback
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
