import { api } from "../../../../api";
import axios from "axios";
import {
  setEditInfo,
  setInfo,
  setLoading,
} from "../../../reducers/settings/file-type";
import { endLoading, startLoading } from "../../../reducers/ui/loading";
import {
  errorNotification,
  successNotification,
} from "../../../../helpers/notification";
import { t } from "i18next";

const headers = {
  "Content-Type": "application/json",
  Authorization: localStorage.token,
};

export const getFileTypes = (options) => (dispatch) => {
  dispatch(startLoading());
  axios
    .post(api.SettingsApi.getFileTypes, options, { headers })
    .then((res) => {
      if (res.data.statusCode === "200") {
        dispatch(endLoading());
        dispatch(setInfo(res.data));
      } else {
        dispatch(endLoading());
      }
    })
    .catch(() => {
      dispatch(endLoading());
    });
};

export const createFileType = (data, setStatus) => (dispatch) => {
  dispatch(setLoading(true));
  axios
    .post(api.SettingsApi.createFileType, data, { headers })
    .then((res) => {
      if (res.data.statusCode === "200") {
        successNotification(t("toast.success"));
        setStatus(true);
        dispatch(setLoading(false));
      } else {
        errorNotification(t("toast.error"));
        setStatus(true);
        dispatch(setLoading(false));
      }
    })
    .catch(() => {
      errorNotification(t("toast.error"));
      dispatch(setLoading(false));
      setStatus(true);
    });
};

export const getByIdFileType = (id) => (dispatch) => {
  axios
    .get(api.SettingsApi.getFileType + id, { headers })
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

export const editFileType = (id, data, setStatus) => (dispatch) => {
  dispatch(setLoading(true));
  axios
    .put(api.SettingsApi.editFileType + id, data, { headers })
    .then((res) => {
      if (res.data.statusCode === "200") {
        successNotification(t("toast.success"));
        setStatus(true);
        dispatch(setLoading(false));
      } else {
        errorNotification(t("toast.error"));
        setStatus(true);
        dispatch(setLoading(false));
      }
    })
    .catch(() => {
      dispatch(setLoading(false));
      errorNotification(t("toast.error"));
      setStatus(true);
    });
};

export const getEmployeeSuggestions = (options, setData) => (dispatch) => {
  axios
    .post(api.EmployeeApi.suggestionEmployee, options, { headers })
    .then((res) => {
      if (res.data.statusCode === "200") {
        setData(res.data.data);
      }
    })
    .catch(() => {
      errorNotification(t("toast.error"));
    });
};
