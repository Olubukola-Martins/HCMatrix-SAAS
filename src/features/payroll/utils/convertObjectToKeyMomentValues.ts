import moment, { Moment } from "moment";

type ObjectWithStringValues = { [key: string]: string };
type ObjectWithMomentValues = { [key: string]: Moment };

export function convertObjectToKeyMomentValues(
  obj: ObjectWithStringValues
): ObjectWithMomentValues {
  const wrappedObj: ObjectWithMomentValues = {};

  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      wrappedObj[key] = moment(obj[key]);
    }
  }

  return wrappedObj;
}
