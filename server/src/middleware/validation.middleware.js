import { body, param, query, validationResult } from "express-validator";

export const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      error: "Validation failed",
      details: errors.array().map(error => ({
        field: error.path,
        message: error.msg,
        value: error.value
      }))
    });
  }
  next();
};

export const validateUserRegistration = [
  body("email")
    .isEmail()
    .normalizeEmail()
    .withMessage("Valid email required"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters"),
  body("role")
    .isIn(["student", "company"])
    .withMessage("Role must be student or company"),
  handleValidationErrors
];

export const validateUserLogin = [
  body("email")
    .isEmail()
    .normalizeEmail()
    .withMessage("Valid email required"),
  body("password")
    .notEmpty()
    .withMessage("Password required"),
  handleValidationErrors
];

export const validateStudentProfile = [
  body("firstName")
    .trim()
    .isLength({ min: 2 })
    .withMessage("First name must be at least 2 characters"),
  body("lastName")
    .trim()
    .isLength({ min: 2 })
    .withMessage("Last name must be at least 2 characters"),
  body("phone")
    .isMobilePhone("any", { strictMode: false })
    .withMessage("Valid phone number required"),
  body("education.institution")
    .trim()
    .notEmpty()
    .withMessage("Institution name required"),
  body("education.degree")
    .isIn(["Licence", "Master", "Ingénieur", "BTS", "Other"])
    .withMessage("Valid degree required"),
  body("education.field")
    .trim()
    .notEmpty()
    .withMessage("Field of study required"),
  handleValidationErrors
];

export const validateCompanyProfile = [
  body("companyName")
    .trim()
    .isLength({ min: 2 })
    .withMessage("Company name must be at least 2 characters"),
  body("industry")
    .isIn(["IT/Tech", "Marketing", "Finance", "Santé", "Education", "Autre"])
    .withMessage("Valid industry required"),
  body("companySize")
    .isIn(["1-10", "11-50", "51-200", "201-500", "500+"])
    .withMessage("Valid company size required"),
  body("description")
    .trim()
    .isLength({ min: 10, max: 1000 })
    .withMessage("Description must be between 10 and 1000 characters"),
  body("contactPerson.firstName")
    .trim()
    .isLength({ min: 2 })
    .withMessage("Contact first name required"),
  body("contactPerson.lastName")
    .trim()
    .isLength({ min: 2 })
    .withMessage("Contact last name required"),
  handleValidationErrors
];

export const validateInternship = [
  body("title")
    .trim()
    .isLength({ min: 5 })
    .withMessage("Title must be at least 5 characters"),
  body("description")
    .trim()
    .isLength({ min: 20 })
    .withMessage("Description must be at least 20 characters"),
  body("field")
    .isIn(["Informatique", "Marketing", "Finance", "RH", "Design", "Autre"])
    .withMessage("Valid field required"),
  body("duration")
    .isInt({ min: 1, max: 12 })
    .withMessage("Duration must be between 1 and 12 months"),
  body("startDate")
    .isISO8601()
    .withMessage("Valid start date required"),
  body("location.city")
    .trim()
    .notEmpty()
    .withMessage("City required"),
  handleValidationErrors
];

export const validateApplication = [
  body("internshipId")
    .isMongoId()
    .withMessage("Valid internship ID required"),
  body("coverLetter")
    .trim()
    .isLength({ min: 50, max: 1000 })
    .withMessage("Cover letter must be between 50 and 1000 characters"),
  handleValidationErrors
];

export const validateApplicationStatus = [
  body("status")
    .isIn(["pending", "reviewing", "shortlisted", "interview", "accepted", "rejected", "withdrawn"])
    .withMessage("Valid status required"),
  handleValidationErrors
];

export const validateMongoId = (paramName = "id") => [
  param(paramName)
    .isMongoId()
    .withMessage(`Valid ${paramName} required`),
  handleValidationErrors
];

export const validatePagination = [
  query("page")
    .optional()
    .isInt({ min: 1 })
    .withMessage("Page must be a positive integer"),
  query("limit")
    .optional()
    .isInt({ min: 1, max: 100 })
    .withMessage("Limit must be between 1 and 100"),
  handleValidationErrors
];
