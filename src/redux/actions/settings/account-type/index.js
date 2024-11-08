import { api } from "../../../../api";
import axios from "axios";
import { startLoading, endLoading } from "../../../reducers/ui/loading";
import { setInfo, setEditInfo } from "../../../reducers/settings/account-type";
import { errorNotification, successNotification } from "../../../../helpers/notification";
import { t } from "i18next";

const headers = {
  "Content-Type": "application/json",
  Authorization: localStorage.token,
};
export const getAccountTypes = (options) => (dispatch) => {
  dispatch(startLoading());
  axios
    .post(api.SettingsApi.getAccountTypes, options, { headers })
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

export const createAccountType = (data, setStatus) => (dispatch) => {
  dispatch(startLoading());
  axios
    .post(api.SettingsApi.createAccountType, data, { headers })
    .then((res) => {
      if (res.data.statusCode === "200") {
        successNotification(t("toast.success"));
        dispatch(endLoading());
        setStatus(true)
      } else {
        console.log("g");
        errorNotification(t("toast.error"));
        dispatch(endLoading());
        setStatus(true)
      }
    })
    .catch(() => {
      successNotification(t("toast.error"));
      dispatch(endLoading());
      setStatus(true)
    });
};

export const getByIdAccountType = (id) => (dispatch) => {
  axios
    .get(api.SettingsApi.getAccountType + id, { headers })
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

export const editAccountType = (id, data, setStatus) => (dispatch) => {
  dispatch(startLoading());
  axios
    .put(api.SettingsApi.editAccountType + id, data, { headers })
    .then((res) => {
      if (res.data.statusCode === "200") {
        dispatch(endLoading());
        successNotification(t("toast.success"));
        setStatus(true)
      } else {
        dispatch(endLoading());
        errorNotification(t("toast.error"));
        setStatus(true)
      }
    })
    .catch(() => {
      dispatch(endLoading());
      errorNotification(t("toast.error"));
      setStatus(true)
    });
};
