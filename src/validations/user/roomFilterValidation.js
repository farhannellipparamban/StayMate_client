import * as yup from "yup";

export const roomFilter = yup.object().shape({
    CheckInDate: yup
    .date()
    .required("heck In date Is Required")
    .required("Required"),
    CheckOutDate: yup
    .date()
    .required("heck Out Date Is Required")
    .required("Required"),
});
