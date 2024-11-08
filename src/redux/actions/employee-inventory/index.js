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
  setLoading,
  setCount,
} from "../../reducers/employee-inventory";
import { t } from "i18next";

const headers = {
  "Content-Type": "application/json",
  Authorization: localStorage.token,
};
export const getEmployeeInventory = (options) => (dispatch) => {
  dispatch(setLoading(true));
  axios
    .post(api.EmployeeInventoryApi.getEmployeeInventory, options, { headers })
    .then((res) => {
      dispatch(setLoading(false));
      if (res.data.statusCode === "200") {
        dispatch(setInfo(res.data));
        dispatch(setCount(res.data.count));
      } else {
      }
    })
    .catch(() => {
      dispatch(setLoading(false));
    });
};

export const createEmployeeInventory = (data, setStatus) => (dispatch) => {
  dispatch(startLoading());
  axios
    .post(api.EmployeeInventoryApi.createEmployeeInventory, data, { headers })
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

export const getByIdEmployeeInventory = (id,np) => (dispatch) => {
  axios
    .get(api.EmployeeInventoryApi.getEmployeeInventory + id + "?includeProperties=" + np, { headers })
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

export const editEmployeeInventory = (id, data, setStatus) => (dispatch) => {
  dispatch(startLoading());
  axios
    .put(api.EmployeeInventoryApi.editEmployeeInventory + id, data, { headers })
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
