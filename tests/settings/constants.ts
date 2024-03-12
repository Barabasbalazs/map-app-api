export const adminUser = {
  email: "test-user@mail.com",
  password: "password1",
  role: "admin",
};

export const normalUser = {
  email: "normal@mail.com",
  password: "password1",
  role: "user",
};

export const hashedUser = {
  email: "normal@mail.com",
  password: "$2a$10$MHerEYR9Uk/zK3Ez2Qzhx.8y0Wm.9q8o4QOF3JKAGLyDbC.M8qMfy",
};

export const hashedAdminUser = {
  email: "test-user@mail.com",
  //authoken for admin user
  password: "$2a$10$jlvbgdjqVFu2M8FZ2am.L.sHUlVB6HoBZ.HCBV4E0ZWavkkBd0S1e",
};

export const invalidCredentials = [
  {
    email: "das",
    password: adminUser.password,
  },
  {
    email: adminUser.email,
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
