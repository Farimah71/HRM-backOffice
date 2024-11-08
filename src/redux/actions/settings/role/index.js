import { api } from "../../../../api";
import axios from "axios";
import { endLoading, startLoading } from "../../../reducers/ui/loading";
import { setEditInfo, setInfo } from "../../../reducers/settings/role";
import {
  errorNotification,
  successNotification,
} from "../../../../helpers/notification";
import { t } from "i18next";

const headers = {
  "Content-Type": "application/json",
  Authorization: localStorage.token,
};

export const getRoles = (options) => (dispatch) => {
  dispatch(startLoading());
  axios
    .post(api.SettingsApi.getRoles, options, { headers })
    .then((res) => {
      if (res.data.statusCode === "200") {
        dispatch(setInfo(res.data));
        dispatch(endLoading());
      } else {
        dispatch(endLoading());
      }
    })
    .catch(() => {
      dispatch(endLoading());
    });
};

export const createRole = (data, setStatus) => (dispatch) => {
  dispatch(startLoading());
  axios
    .post(api.SettingsApi.createRole, data, { headers })
    .then((res) => {
      if (res.data.statusCode === "200") {
        successNotification(t("toast.success"));
        dispatch(endLoading());
        setStatus(true)
      } else {
        errorNotification(t("toast.error"));
        dispatch(endLoading());
        setStatus(true)
      }
    })
    .catch(() => {
      errorNotification(t("toast.error"));
      dispatch(endLoading());
      setStatus(true)
    });
};

export const getByIdRole = (id) => (dispatch) => {
  axios
    .get(api.SettingsApi.getRole + id, { headers })
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

export const editRole = (id, data, navigate) => (dispatch) => {
  dispatch(startLoading());
  axios
    .put(api.SettingsApi.editRole + id, data, { headers })
    .then((res) => {
      if (res.data.statusCode === "200") {
        dispatch(endLoading());
        successNotification(t("toast.success"));
        navigate("/role");
      } else {
        dispatch(endLoading());
        errorNotification(t("toast.error"));
      }
    })
    .catch(() => {
      dispatch(endLoading());
      errorNotification(t("toast.error"));
    });
};
