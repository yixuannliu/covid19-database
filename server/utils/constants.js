const DEFAULT_VALUE_ID = 9;

const GENDERS = {
  FEMALE: "Female",
  MALE: "Male",
  NOT_STATED: "Not stated",
};

const OCCUPATIONS = {
  HEALTH_CARE: "Health care worker",
  SCHOOL: "School or daycare worker/attendee",
  LONG_TERM_CARE: "Long term care resident",
  OTHER: "Other",
  NOT_STATED: "Not stated",
};

const PATIENT_REFERENCE_TABLES = {
  GENDER: "gender",
  OCCUPATION: "occupation",
  REGION: "region",
  HOSPITAL: "hospital",
};

module.exports = {
  DEFAULT_VALUE_ID,
  GENDERS,
  OCCUPATIONS,
  PATIENT_REFERENCE_TABLES,
};
