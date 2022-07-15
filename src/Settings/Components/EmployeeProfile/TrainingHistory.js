import React from 'react'

const TrainingHistory = () => {
  return (
  <>
   <div className="flex justify-end">
        <input
          type="text"
          placeholder="Search.."
          className="rounded-3xl px-4 py-1 focus:outline-none bg-mainBg placeholder:text-sm"
        />
      </div>

      <table className="employee_info_table mt-5">
        <thead>
          <tr>
            <th>Name of training</th>
            <th>Completion Status</th>
           <th>Rating</th>
          </tr>
        </thead>
      </table>
      <div className="border text-center py-1 text-sm mt-1">
        No Matching Records
      </div>
  </>
  )
}

export default TrainingHistory