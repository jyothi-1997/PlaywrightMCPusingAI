export const registerUser = {
  firstName: 'John',
  lastName: 'Doe',
  email: 'john.doe.123@gmail.com',
  phone: '9876543210',
  occupation: 'Engineer',
  gender: 'Male',
  password: 'TestPass@123',
  confirmPassword: 'TestPass@123',
};

export const loginUser = {
  email: 'john.doe@gmail.com',
  password: 'TestPass@123',
};

export const invalidEmailUser = {
  email: 'invalidemail@',
};

export const wrongPasswordUser = {
  password: 'WrongPass123',
};

export const existingEmailUser = {
  email: 'existing.user@gmail.com',
};
