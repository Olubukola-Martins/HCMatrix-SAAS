import { TProfileEditRequestType } from "../types";

export const PROFILE_EDIT_REQUEST_TYPES:{type:TProfileEditRequestType, name: string}[]= [
    {
      name: 'Bank Details',
      type: 'profile-edit/finance/bank-details'
    },
    {
      name: 'ITF',
      type: 'profile-edit/finance/itf'
    },
    {
      name: 'NSITF',
      type: 'profile-edit/finance/nsitf'
    },
    {
      name: 'Pension',
      type: 'profile-edit/finance/pension'
    },
    {
      name: 'Tax',
      type: 'profile-edit/finance/tax'
    },
    {
      name: 'Personal Information',
      type: 'profile-edit/personal-information'
    },
    
    {
      name: 'Job Information',
      type: 'profile-edit/job-information'
    },
  ]