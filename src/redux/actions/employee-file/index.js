import { api } from "../../../api";
import axios from "axios";
import {
  setCount,
  setInfo,
  setLoading,
} from "../../reducers/employee-file";
import {
  errorNotification,
  successNotification,
} from "../../../helpers/notification";
import { t } from "i18next";

const headers = {
  "Content-Type": "multipart/form-data",
  Authorization: localStorage.token,
};

export const getEmployeeFiles = (options) => (dispatch) => {
  dispatch(setLoading(true));
  axios
    .post(api.EmployeeFileApi.getEmployeeFiles, options, {
      "Content-Type": "application/json",
      Authorization: localStorage.token,
    })
    .then((res) => {
      if (res.data.statusCode === "200") {
        dispatch(setInfo(res.data.data));
        dispatch(setCount(res.data.count));
        dispatch(setLoading(false));
      } else {
        dispatch(setLoading(false));
      }
    })
    .catch(() => {
      dispatch(setLoading(false));
    });
};

export const createEmployeeFile = (data, setStatus) => (dispatch) => {
  dispatch(setLoading(true));
  axios
    .post(api.EmployeeFileApi.createEmployeeFile, data, { headers })
    .then((res) => {
      dispatch(setLoading(false));
      if (res.data.statusCode === "200") {
        setStatus(true);
        successNotification(t("toast.success"));
      }
    })
    .catch(() => {
      errorNotification(t("toast.error"));
      dispatch(setLoading(false));
    });
};
