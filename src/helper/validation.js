exports.validatePassword = async (password) => {
  // Password should be at least 8 characters long
  // Password should contain at least one lowercase letter
  // Password should contain at least one uppercase letter
  // Password should contain at least one number
  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;
  return passwordRegex.test(password);
};
exports.validateEmail = async (email) => {
  const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,}$/;
  return regex.test(email);
};
