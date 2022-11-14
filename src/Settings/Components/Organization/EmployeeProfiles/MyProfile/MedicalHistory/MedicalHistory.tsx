import { CurrentMedicalCondition } from "./CurrentMedicalCondition"

export const MedicalHistory = () => {
  return (
    <div className="bg-card p-3">
        <div className="border-b border-gray-400 w-full mb-7">
          <h2 className="text-accent text-base pb-1">Medical History</h2>
        </div>
    
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-y-3 gap-x-16">
            <CurrentMedicalCondition/>
          </div>
    </div>
  )
}