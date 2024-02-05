const statusCodes = {
  STANDARD: {
    CREATED: 201,
    SUCCESS: 200,
    NOCONTENT: 204,
  },

  ERROR404: {
    statusCode: 404,
    message: "NOT_FOUND",
  },

  ERROR403: {
    statusCode: 403,
    message: "FORBIDDEN_ACCESS",
  },

  ERROR401: {
    statusCode: 401,
    message: "UNAUTHORIZED",
  },

  ERROR500: {
    statusCode: 500,
    message: "TRY_AGAIN",
  },

  ERROR409: {
    statusCode: 409,
    message: "DUPLICATE_FOUND",
  },

  ERROR400: {
    statusCode: 400,
    message: "BAD_REQUEST",
  },
};

export default statusCodes;
