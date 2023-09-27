import { GraphQLError } from "graphql";

export const errorResponses = err => {
  /* if (err.originalError instanceof ValidationError) {
    return {
      code: 400,
      status: err.extensions.code,
      message: err.message,
    };
  }

  if (err.originalError instanceof UnauthorizedError) {
    return {
      code: 401,
      status: err.extensions.code,
      message: err.message,
    };
  }

  if (err.originalError instanceof ForbiddenError) {
    return {
      code: 403,
      status: err.extensions.code,
      message: err.message,
    };
  } */

  if (
    err instanceof GraphQLError /* &&
    err.extensions.exception.name == "ValidationError" */
  ) {
    return {
      code: 400,
      status: err.extensions.exception.name,
      message: err.message,
    };
  }

  return {
    code: 500,
    status: "INTERNAL_SERVER_ERROR",
    message: "internal server error",
    error: err,
  };
};

/* const errorRes = (error)=>{


  return ({message:error.message,statusCode:error.statusCode})
} */
