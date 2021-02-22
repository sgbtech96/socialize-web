import jwt_decode from "jwt-decode";
export const decodeJWT = () => jwt_decode(localStorage.get("id_token"));
