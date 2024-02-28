import * as yup from 'yup'

export const otpSchema = yup.object().shape({
    otp1: yup
    .number('OTP must be a 4 digit number')
    .required('Required')
    .test('len', 'OTP must be a 4 digit number', val => /^\d{1}$/.test(val))
    .integer(),
    otp2: yup
    .number('OTP must be a 4 digit number')
    .required('Required')
    .test('len', 'OTP must be a 4 digit number', val => /^\d{1}$/.test(val))
    .integer(),
    otp3: yup
    .number('OTP must be a 4 digit number')
    .required('Required')
    .test('len', 'OTP must be a 4 digit number', val => /^\d{1}$/.test(val))
    .integer(),
    otp4: yup
    .number('OTP must be a 4 digit number')
    .required('Required')
    .test('len', 'OTP must be a 4 digit number', val => /^\d{1}$/.test(val))
    .integer()
  })