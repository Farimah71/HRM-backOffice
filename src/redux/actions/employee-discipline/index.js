import { api } from "../../../api";
import axios from "axios";
import {
  setLoading,
  setEditInfo,
  setInfo,
  setCount,
} from "../../reducers/employee-discipline";
import { startLoading, endLoading } from "../../reducers/ui/loading";
import {
  errorNotification,
  successNotification,
} from "../../../helpers/notification";
import { t } from "i18next";

const headers = {
  "Content-Type": "multipart/form-data",
  Authorization: localStorage.token,
};

export const getEmployeeDisciplines = (options) => (dispatch) => {
  dispatch(setLoading(true));
  axios
    .post(api.EmployeeDisciplineApi.getEmployeeDisciplines, options, {
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

export const createEmployeeDiscipline = (data, setStatus) => (dispatch) => {
  dispatch(setLoading(true));
  axios
    .post(api.EmployeeDisciplineApi.createEmployeeDiscipline, data, { headers })
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

export const getByIdEmployeeDiscipline = (id, np) => (dispatch) => {
  axios
    .get(
      api.EmployeeDisciplineApi.getEmployeeDiscipline +
        id +
        "?includeProperties=" +
        np,
      {
        "Content-Type": "application/json",
        Authorization: localStorage.token,
      }
    )
    .then((res) => {
      if (res.data.statusCode === "200") {
        dispatch(setEditInfo(res.data.data));
      } else {
        errorNotification(t("toast.error"));
      }
    })
    .catch(() => {
      errorNotification(t("toast.error"));
    });
};

export const editEmployeeDiscipline = (id, data, setStatus) => (dispatch) => {
  console.log(id);
  dispatch(startLoading());
  axios
    .put(api.EmployeeDisciplineApi.editEmployeeDiscipline + id, data, {
      "Content-Type": "application/json",
      Authorization: localStorage.token,
    })
    .then((res) => {
      if (res.data.statusCode === "200") {
        dispatch(endLoading());
        successNotification(t("notification.data_success"));
        setStatus(true);
      } else {
        errorNotification(t("toast.error"));
        dispatch(endLoading());
        setStatus(true);
      }
    })
    .catch(() => {
      errorNotification(t("toast.error"));
      dispatch(endLoading());
      setStatus(true);
    });
};
