import { TProfileEditRequestType } from "../types";

export const PROFILE_EDIT_REQUEST_TYPES:{type:TProfileEditRequestType, name: string}[]= [
    {
      name: 'Finance',
      type: 'profile-edit/finance'
    },
    {
      name: 'Profile',
      type: 'profile-edit/profile'
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