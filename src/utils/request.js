import axios from "axios";

export function post(url, data) {
  return makeAPIRequest("POST", url, data).then((res) => res.data);
}

export function put(url, data) {
  return makeAPIRequest("PUT", url, data).then((res) => res.data);
}

export function get(url) {
  return makeAPIRequest("GET", url).then((res) => res.data);
}

async function makeAPIRequest(method, url, data) {
  const token = await localStorage.getItem("jwt");
  const config = {
    method,
    url: `${process.env.REACT_APP_BACKEND_BASE_URL}${url}`,
    headers: token
      ? {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        }
      : {
          "Content-Type": "application/json",
        },
    data,
  };
  return axios(config);
}
