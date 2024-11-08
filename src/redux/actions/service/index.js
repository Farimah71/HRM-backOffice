import { api } from "../../../api";
import axios from "axios";
import { setInfo } from "../../reducers/service";

const headers = {
  "Content-Type": "application/json",
  Authorization: localStorage.token,
};
export const getServices = (options) => (dispatch) => {
  axios.post(api.ServiceApi.getServices, options, { headers })
  .then(res => {
    if (res.data.statusCode === "200") {
        dispatch(setInfo(res.data.data));
    } else {
        console.log("err");
    }
  })
  .catch(err => {
    console.log(err);
  })
};
