import { body } from "express-validator";

export const createBiodataValidation = [
  body("first_name")
    .notEmpty()
    .withMessage("First name is required.")
    .isString()
    .withMessage("First name must be a string."),

  body("last_name")
    .notEmpty()
    .withMessage("Last name is required.")
    .isString()
    .withMessage("Last name must be a string."),

  body("email")
    .notEmpty()
    .withMessage("Email is required.")
    .isEmail()
    .withMessage("Must be a valid email."),

  body("phone")
    .optional()
    .isMobilePhone("any")
    .withMessage("Must be a valid phone number."),

  body("address")
    .optional()
    .isString()
    .withMessage("Address must be a string."),

  body("city").optional().isString().withMessage("City must be a string."),

  body("state").optional().isString().withMessage("State must be a string."),

  body("postal_code")
    .optional()
    .isPostalCode("any")
    .withMessage("Must be a valid postal code."),

  body("country")
    .optional()
    .isString()
    .withMessage("Country must be a string."),

  body("nationality")
    .optional()
    .isString()
    .withMessage("Nationality must be a string."),

  body("marital_status")
    .optional()
    .isString()
    .withMessage("Marital status must be a string."),

  body("occupation")
    .optional()
    .isString()
    .withMessage("Occupation must be a string."),
];

export const updateBiodataValidation = [
  body("biodata_id")
    .notEmpty()
    .withMessage("Biodata ID is required.")
    .isInt()
    .withMessage("Biodata ID must be an integer."),

  body("first_name")
    .optional()
    .isString()
    .withMessage("First name must be a string."),

  body("last_name")
    .optional()
    .isString()
    .withMessage("Last name must be a string."),

  body("email").optional().isEmail().withMessage("Must be a valid email."),

  body("phone")
    .optional()
    .isMobilePhone("any")
    .withMessage("Must be a valid phone number."),

  body("address")
    .optional()
    .isString()
    .withMessage("Address must be a string."),

  body("city").optional().isString().withMessage("City must be a string."),

  body("state").optional().isString().withMessage("State must be a string."),

  body("postal_code")
    .optional()
    .isPostalCode("any")
    .withMessage("Must be a valid postal code."),

  body("country")
    .optional()
    .isString()
    .withMessage("Country must be a string."),

  body("nationality")
    .optional()
    .isString()
    .withMessage("Nationality must be a string."),

  body("marital_status")
    .optional()
    .isString()
    .withMessage("Marital status must be a string."),

  body("occupation")
    .optional()
    .isString()
    .withMessage("Occupation must be a string."),
];
