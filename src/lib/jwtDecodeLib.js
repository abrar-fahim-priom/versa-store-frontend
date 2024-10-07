import { jwtDecode } from "jwt-decode";

export const decodeToken = (token) => {
  const value = jwtDecode(token);

  return value;
};
