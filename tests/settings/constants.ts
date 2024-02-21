export const testUser = {
  email: "test-user@mail.com",
  password: "password1",
};

export const hashedUser = {
  email: "test-user@mail.com",
  password: "$2a$10$bKrAW5/gUCVThi0z4N96Lu.BihbDvFZesCgXjAW7YfRrWA9IndbgC",
};

export const invalidCredentials = [
  {
    email: "das",
    password: testUser.password,
  },
  {
    email: testUser.email,
    password: "das",
  },
  {
    email: "das",
    password: "das",
  },
];

export const invalidUserData = [
  {
    email: "",
    password: "123456",
  },
  {
    email: "8qwhdqwhd",
    password: "123456789",
  },
  {
    email: "123@mail",
    password: "12345689",
  },
  {
    email: "123@mail.com",
    password: "1234567",
  },
  {
    email: "23234@mail.",
    password: "123456789",
  },
  {
    email: "123@mail.com",
    password: "",
  },
];

export const validUserData = [
  {
    email: "balazs@mail.com",
    password: "123456789",
  },
  {
    email: "balazs2@mail.com",
    password: "123456789",
  },
];
