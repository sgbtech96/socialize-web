import jwt_decode from "jwt-decode";
export const decodeJWT = () => jwt_decode(localStorage.getItem("jwt"));
