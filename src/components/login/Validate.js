const validationRegex = {
  userId: /^[a-zA-Z0-9]{2,12}$/,
  password: /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,12}$/,
  email: /^[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-zA-Z]{2,}$/,
  nickname: /^[A-Za-z0-9ㄱ-힣]{2,10}$/,
  phone: /^010-\d{3,4}-\d{4}$/,
};

export const validateInput = (type, value) => {
  return validationRegex[type].test(value);
};
