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
});
