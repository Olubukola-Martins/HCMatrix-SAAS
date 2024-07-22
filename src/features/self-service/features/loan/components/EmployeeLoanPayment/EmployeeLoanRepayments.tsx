import { TableWithFocusType } from 'components/table'
import { EMPLOYEE_LOAN_PAYMENT_TABLE_COLUMNS } from './columns';

const EmployeeLoanRepayments = () => {
  const columns = EMPLOYEE_LOAN_PAYMENT_TABLE_COLUMNS();
  return (
    <div>
       <TableWithFocusType
        columns={columns}
        dataSource={[]}
        // loading={isLoading}
        // pagination={{ ...pagination, total: data?.total }}
        // onChange={onChange}
        scroll={{ x: 500 }}
      />
    </div>
  )
}

export default EmployeeLoanRepayments