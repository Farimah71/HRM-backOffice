import { api } from "../../../../api";
import { startLoading, endLoading } from "../../../reducers/ui/loading";
import axios from "axios";
import {
  successNotification,
  errorNotification,
} from "../../../../helpers/notification";
import {
  setEditInfo,
  setInfo,
  setLoading,
} from "../../../reducers/settings/employee-title";
import { t } from "i18next";

const headers = {
  "Content-Type": "application/json",
  Authorization: localStorage.token,
};

export const getEmployeeTitles = (options) => (dispatch) => {
  dispatch(setLoading(true));
  // dispatch(startLoading());
  axios
    .post(api.SettingsApi.getEmployeeTitles, options, { headers })
    .then((res) => {
      if (res.data.statusCode === "200") {
        dispatch(setInfo(res.data.data));
        // dispatch(endLoading());
        dispatch(setLoading(false));
      } else {
        // dispatch(endLoading());
        dispatch(setLoading(false));
      }
    })
    .catch(() => {
      // dispatch(endLoading());
      dispatch(setLoading(false));
    });
};

export const createEmployeeTitle = (data, setStatus) => (dispatch) => {
  dispatch(startLoading());
  axios
    .post(api.SettingsApi.createEmployeeTitle, data, { headers })
    .then((res) => {
      if (res.data.statusCode === "200") {
        successNotification(t("toast.success"));
        dispatch(endLoading());
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

export const getByIdEmployeeTitle = (id) => (dispatch) => {
  axios
    .get(api.SettingsApi.getEmployeeTitle + id, { headers })
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

export const editEmployeeTitle = (id, data, setStatus) => (dispatch) => {
  dispatch(startLoading());
  axios
    .put(api.SettingsApi.editEmployeeTitle + id, data, { headers })
    .then((res) => {
      if (res.data.statusCode === "200") {
        successNotification(t("toast.success"));
        dispatch(endLoading());
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

export const getCurrencySuggestion =
  (options, setData, setLoading) => (dispatch) => {
    setLoading(true);
    axios
      .post(api.SettingsApi.getCurrencySuggestion, options, { headers })
      .then((res) => {
        if (res.data.statusCode === "200") {
          setLoading(false);
          setData(res.data.data);
        } else {
          setLoading(false);
          errorNotification(t("toast.error"));
        }
      })
      .catch(() => {
        setLoading(false);
        errorNotification(t("toast.error"));
      });
  };
