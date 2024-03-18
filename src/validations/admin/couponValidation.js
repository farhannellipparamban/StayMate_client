import * as yup from "yup";

export const CouponValidation = yup.object().shape({
    code: yup.string().required("Coupon code is required"),
    discountType: yup.string().required("Discount type is required"),
    originalPrice: yup
      .number()
      .required("Original price is required")
      .positive("Original price must be positive"),
    finalPrice: yup
      .number()
      .required("Final price is required")
      .positive("Final price must be positive"),
    maxUsers: yup
      .number()
      .required("Max users is required")
      .positive("Max users must be positive"),
    discountAmount: yup
      .number()
      .required("Discount amount is required")
      .positive("Discount amount must be positive"),
  });