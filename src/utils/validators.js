export const validateLogin = ({ email, password }) => {
  if (!email) return "Email is required";
  if (!password) return "Password is required";
  if (email !== "admin@test.com" || password !== "admin@123")
    return "Invalid Credentials";
  return null;
};
