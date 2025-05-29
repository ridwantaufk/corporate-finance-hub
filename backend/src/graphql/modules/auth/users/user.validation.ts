import { body } from "express-validator";

export const createUserValidationRules = () => {
  return [
    body("username")
      .exists()
      .withMessage("Username is required")
      .notEmpty()
      .withMessage("Username cannot be empty")
      .isString()
      .isLength({ min: 3 })
      .withMessage("Username must be at least 3 characters long"),

    body("password")
      .exists()
      .withMessage("Password is required")
      .notEmpty()
      .withMessage("Password cannot be empty")
      .isString()
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long"),

    body("role")
      .exists()
      .withMessage("Role is required")
      .notEmpty()
      .withMessage("Role cannot be empty")
      .isString()
      .isIn(["client", "admin"])
      .withMessage("Role must be either 'client' or 'admin'"),

    body("is_active")
      .exists()
      .withMessage("is_active is required")
      .notEmpty()
      .withMessage("is_active cannot be empty")
      .isBoolean()
      .withMessage("is_active must be a boolean"),

    body("biodata").exists().withMessage("Biodata is required"),

    body("biodata.first_name")
      .exists()
      .withMessage("First name is required")
      .notEmpty()
      .withMessage("First name cannot be empty")
      .isString(),

    body("biodata.last_name")
      .exists()
      .withMessage("Last name is required")
      .notEmpty()
      .withMessage("Last name cannot be empty")
      .isString(),

    body("biodata.date_of_birth")
      .exists()
      .withMessage("Date of birth is required")
      .notEmpty()
      .withMessage("Date of birth cannot be empty")
      .isISO8601()
      .toDate()
      .withMessage("Date of birth must be a valid date"),

    body("biodata.gender")
      .exists()
      .withMessage("Gender is required")
      .notEmpty()
      .withMessage("Gender cannot be empty")
      .isString(),

    body("biodata.email")
      .exists()
      .withMessage("Email is required")
      .notEmpty()
      .withMessage("Email cannot be empty")
      .isEmail()
      .withMessage("Email must be valid"),

    body("biodata.phone")
      .exists()
      .withMessage("Phone is required")
      .notEmpty()
      .withMessage("Phone cannot be empty")
      .isString(),

    body("biodata.address")
      .exists()
      .withMessage("Address is required")
      .notEmpty()
      .withMessage("Address cannot be empty")
      .isString(),

    body("biodata.city")
      .exists()
      .withMessage("City is required")
      .notEmpty()
      .withMessage("City cannot be empty")
      .isString(),

    body("biodata.state")
      .exists()
      .withMessage("State is required")
      .notEmpty()
      .withMessage("State cannot be empty")
      .isString(),

    body("biodata.postal_code")
      .exists()
      .withMessage("Postal code is required")
      .notEmpty()
      .withMessage("Postal code cannot be empty")
      .isString(),

    body("biodata.country")
      .exists()
      .withMessage("Country is required")
      .notEmpty()
      .withMessage("Country cannot be empty")
      .isString(),

    body("biodata.nationality")
      .exists()
      .withMessage("Nationality is required")
      .notEmpty()
      .withMessage("Nationality cannot be empty")
      .isString(),

    body("biodata.marital_status")
      .exists()
      .withMessage("Marital status is required")
      .notEmpty()
      .withMessage("Marital status cannot be empty")
      .isString(),

    body("biodata.occupation")
      .exists()
      .withMessage("Occupation is required")
      .notEmpty()
      .withMessage("Occupation cannot be empty")
      .isString(),
  ];
};

export const updateUserValidationRules = () => {
  return [
    // user_id must be there and must be number (usually path or args, but if the body can be validated too)
    body("user_id")
      .exists()
      .withMessage("User ID is required")
      .isInt()
      .withMessage("User ID must be a number"),

    body("username")
      .optional()
      .isString()
      .isLength({ min: 3 })
      .withMessage("Username must be at least 3 characters long"),

    body("password")
      .optional()
      .isString()
      .isLength({ min: 3 })
      .withMessage("Password must be at least 3 characters long"),

    body("role")
      .optional()
      .isString()
      .isIn(["client", "admin"])
      .withMessage("Role must be either 'client' or 'admin'"),

    body("is_active")
      .optional()
      .isBoolean()
      .withMessage("is_active must be a boolean"),

    body("biodata.first_name")
      .optional()
      .isString()
      .withMessage("First name must be a string"),

    body("biodata.last_name")
      .optional()
      .isString()
      .withMessage("Last name must be a string"),

    body("biodata.date_of_birth")
      .optional()
      .isISO8601()
      .toDate()
      .withMessage("Date of birth must be a valid date"),

    body("biodata.gender")
      .optional()
      .isString()
      .withMessage("Gender must be a string"),

    body("biodata.email")
      .optional()
      .isEmail()
      .withMessage("Email must be valid"),

    body("biodata.phone")
      .optional()
      .isString()
      .withMessage("Phone must be a string"),

    body("biodata.address")
      .optional()
      .isString()
      .withMessage("Address must be a string"),

    body("biodata.city")
      .optional()
      .isString()
      .withMessage("City must be a string"),

    body("biodata.state")
      .optional()
      .isString()
      .withMessage("State must be a string"),

    body("biodata.postal_code")
      .optional()
      .isString()
      .withMessage("Postal code must be a string"),

    body("biodata.country")
      .optional()
      .isString()
      .withMessage("Country must be a string"),

    body("biodata.nationality")
      .optional()
      .isString()
      .withMessage("Nationality must be a string"),

    body("biodata.marital_status")
      .optional()
      .isString()
      .withMessage("Marital status must be a string"),

    body("biodata.occupation")
      .optional()
      .isString()
      .withMessage("Occupation must be a string"),
  ];
};
