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
} from "../../../reducers/settings/contract-type";
import { t } from "i18next";

const headers = {
  "Content-Type": "application/json",
  Authorization: localStorage.token,
};

export const getContractTypes = (options) => (dispatch) => {
  dispatch(startLoading());
  // dispatch(setLoading(true));
  axios
    .post(api.SettingsApi.getContractTypes, options, { headers })
    .then((res) => {
      if (res.data.statusCode === "200") {
        dispatch(setInfo(res.data.data));
        // dispatch(setLoading(false));
        dispatch(endLoading());
      } else {
        // dispatch(setLoading(false));
        dispatch(endLoading());
      }
    })
    .catch(() => {
      // dispatch(setLoading(false));
      dispatch(endLoading());
    });
};

export const createContractType = (data, setStatus) => (dispatch) => {
  dispatch(startLoading());
  axios
    .post(api.SettingsApi.createContractType, data, { headers })
    .then((res) => {
      if (res.data.statusCode === "200") {
        successNotification(t("toast.success"));
        setStatus(true);
        dispatch(endLoading());
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

export const getByIdContractType = (id) => (dispatch) => {
  axios
    .get(api.SettingsApi.getContractType + id, { headers })
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

export const editContractType = (id, data, setStatus) => (dispatch) => {
  dispatch(setLoading(true));
  axios
    .put(api.SettingsApi.editContractType + id, data, { headers })
    .then((res) => {
      setStatus(true);
      if (res.data.statusCode === "200") {
        successNotification(t("toast.success"));
        dispatch(setLoading(false));
      } else {
        errorNotification(t("toast.error"));
        dispatch(setLoading(false));
        // setStatus(true);
      }
    })
    .catch(() => {
      errorNotification(t("toast.error"));
      dispatch(setLoading(false));
      setStatus(true);
    });
};
