import axios from "axios";
import { api } from "../../../api";
import { startLoading, endLoading } from "../../reducers/ui/loading";
import {
  successNotification,
  errorNotification,
} from "../../../helpers/notification";
import {
  setInfo,
  setEditInfo,
  setCount,
  setLoading,
} from "../../reducers/employee-leave";
import { t } from "i18next";

const headers = {
  "Content-Type": "application/json",
  Authorization: localStorage.token,
};
export const getEmployeeLeave = (options) => (dispatch) => {
  dispatch(setLoading(true));
  axios
    .post(api.EmployeeLeaveApi.getEmployeeLeave, options, { headers })
    .then((res) => {
      if (res.data.statusCode === "200") {
        dispatch(setInfo(res.data));
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

export const createEmployeeLeave = (data, setStatus) => (dispatch) => {
  dispatch(startLoading());
  axios
    .post(api.EmployeeLeaveApi.createEmployeeLeave, data, { headers })
    .then((res) => {
      dispatch(endLoading());
      if (res.data.statusCode === "200") {
        successNotification(t("notification.data_success"));
        setStatus(true);
      } else {
        errorNotification(t("toast.error"));
        setStatus(true);
      }
    })
    .catch(() => {
      errorNotification(t("toast.error"));
      dispatch(endLoading());
      setStatus(true);
    });
};

export const getByIdEmployeeLeave = (id, np) => (dispatch) => {
  axios
    .get(api.EmployeeLeaveApi.getEmployeeLeave + id + "?includeProperties=" + np, { headers })
    .then((res) => {
      if (res.data.statusCode === "200") {
        dispatch(setEditInfo(res.data.data));
        // dispatch(endLoading());
      } else {
        // dispatch(endLoading());
      }
    })
    .catch(() => {
      // dispatch(endLoading());
    });
};

export const editEmployeeLeave = (id, data, setStatus) => (dispatch) => {
  dispatch(startLoading());
  axios
    .put(api.EmployeeLeaveApi.editEmployeeLeave + id, data, { headers })
    .then((res) => {
      if (res.data.statusCode === "200") {
        dispatch(endLoading());
        successNotification(t("notification.data_success"));
        setStatus(true);
      } else {
        dispatch(endLoading());
        setStatus(true);
      }
    })
    .catch(() => {
      dispatch(endLoading());
      setStatus(true);
    });
};
