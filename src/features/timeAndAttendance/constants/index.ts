export const radioFormOptions: {
  label: string;
  description: string;
  value: string;
  faceRTitle: string;
  locationTitle: string;
  faceRDes: string;
}[] = [
  {
    label: "Flexible",
    description: "Good for times with higher onsite autonomy",
    value: "Flexible",
    faceRTitle: "Face Recognition Disabled",
    locationTitle: "GPS Location required",
    faceRDes: "Self capturing not allowed",
  },
  {
    label: "Moderate",
    description: "Good for teams with fixed hours and location",
    value: "Moderate",
    faceRTitle: "Face Recognition Enabled",
    locationTitle: "GPS Location not required",
    faceRDes: "If unrecognized flag time entry",
  },
  {
    label: "Mandatory",
    description: "Good for teams monitoring flexible offsite members",
    value: "Mandatory",
    faceRTitle: "Face Recognition Enforced",
    locationTitle: "GPS Location required",
    faceRDes: "If unrecognized block time entry",
  },
];
