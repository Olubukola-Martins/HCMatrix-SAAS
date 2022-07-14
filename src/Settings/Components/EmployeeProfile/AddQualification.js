import React from 'react'
import Modal from "@mui/material/Modal";
import Themes from "../../../Themes/Themes";

const AddQualification = ({ open, handleClose }) => {
  return (
    <>
    <Modal open={open} onClose={handleClose}>
        <Themes>
            <div className="CModal" style={{ maxWidth: 400 }}>
            <div className="flex items-center justify-between w-full mb-5">
              <h5 className="text-base font-semibold">Add Qualification</h5>
              <i
                class="fas fa-times cursor-pointer text-xl"
                onClick={handleClose}
              ></i>
            </div>
             <form>
                <div className='grid grid-cols-2 gap-5'>
                <div className="whiteBg_form">
                <label>Salary</label>
              
              </div>
                </div>
             </form>
            </div>
        </Themes>
    </Modal>
    </>
  )
}

export default AddQualification