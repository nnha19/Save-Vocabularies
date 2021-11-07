export const validate = (rules, value) => {
  let valid = "This field is required";
  if (rules.REQUIRED) {
    valid = value.length > 0 ? null : valid;
  }
  return valid;
};
