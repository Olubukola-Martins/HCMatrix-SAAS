import React from 'react'

const RequiredDocuments = () => {
  return (
    <div>
        <div className='flex justify-end mt-10 mb-4'>
            <button className='transparentButton text-caramel'>Add Document</button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-card shadow py-3 px-2 rounded text-center flex flex-col gap-16">
              <p className="text-sm">Required Document</p>
              <h4>Road Worthiness</h4>
              <div className="flex items-center justify-between text-sm">
                <span className="text-neutral cursor-pointer">Delete</span>
                <span className="text-caramel cursor-pointer">Download</span>
              </div>
            </div>

            <div className="bg-card shadow py-3 px-2 rounded text-center flex flex-col gap-16">
              <p className="text-sm">Required Document</p>
              <h4>Insurance</h4>
              <div className="flex items-center justify-between text-sm">
                <span className="text-neutral cursor-pointer">Delete</span>
                <span className="text-caramel cursor-pointer">Download</span>
              </div>
            </div>
        </div>
    </div>
  )
}

export default RequiredDocuments