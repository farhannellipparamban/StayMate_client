import * as yup from "yup";

export const roomFilter = yup.object().shape({
  CheckInDate: yup
    .date()
    .required("Check In date Is Required")
    .required("Required"),
  CheckOutDate: yup
    .date()
    .required("Check Out Date Is Required")
    .required("Required"),
  Persons: yup
    .number()
    .typeError("Number of Persons must be a number")
    .integer("Number of Persons must be an integer")
    .min(1, "Number of Persons must be at least 1")
    .required("Number of Persons is required"),
});
