const validationRegex = {
  userId: /^[a-zA-Z0-9]{2,12}$/,
  pw: /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,12}$/,
  nickname: /^[A-Za-z0-9ㄱ-힣]{2,10}$/,
  phone: /^010-\d{3,4}-\d{4}$/,
};

export const validateInput = (type, value) => {
  return validationRegex[type].test(value);
};
