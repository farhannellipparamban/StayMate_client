import * as yup from "yup";

export const roomValidation = yup.object().shape({
  roomName: yup
    .string()
    .max(20)
    .test("notOnlySpaces", "Room name is required", (value) => {
      return value.trim() !== "";
    })
    .required("Room name is required"),
  rent: yup
    .number("rent must be a number")
    .required("rent is required")
    .positive("rent must be positive"),
  mobile: yup
    .number()
    .min(10)
    .required("Enter 10 digit")
    .positive("Enter right number"),
  description: yup
    .string()
    .min(25)
    .test("notOnlySpaces", "Description room is required", (value) => {
      return value.trim() !== "";
    })
    .required("description the room is required"),
  roomType: yup.string().required("Room type required"),
  model: yup.string().required("Room model required"),
  acType: yup.string().required("Room Ac Type required"),
  capacity: yup
    .number()
    .required("Capacity is required")
    .positive("Capacity must be a positive number")
    .integer("Capacity must be an integer"),
});
