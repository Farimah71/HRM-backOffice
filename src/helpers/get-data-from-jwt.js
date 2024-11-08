import jwtDecode from "jwt-decode";

export const getDataFromJwtToken = (key) => {
  if (localStorage.getItem("adminInfo")) {
    const getData = JSON.parse(localStorage.getItem("adminInfo"));
    const token_decoded = jwtDecode(getData.token);
    return token_decoded[key];
  } else {
    localStorage.token = "";
  }
};
