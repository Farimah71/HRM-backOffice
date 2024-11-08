import { api } from "../../../../api";
import axios from "axios";
import { setInfo, setEditInfo } from "../../../reducers/settings/province";
import {
  errorNotification,
  successNotification,
} from "../../../../helpers/notification";
import { endLoading, startLoading } from "../../../reducers/ui/loading";
import { t } from "i18next";

const headers = {
  "Content-Type": "application/json",
  Authorization: localStorage.token,
};

export const getProvinces = (options) => (dispatch) => {
  axios
    .post(api.SettingsApi.getProvinces, options, { headers })
    .then((res) => {
      if (res.data.statusCode === "200") {
        dispatch(setInfo(res.data));
      } else {
        errorNotification(t("toast.error"));
      }
    })
    .catch(() => {
      errorNotification(t("toast.error"));
    });
};

export const createProvince = (data, setStatus) => (dispatch) => {
  dispatch(startLoading());
  axios
    .post(api.SettingsApi.createProvince, data, { headers })
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

export const getByIdProvince = (id, includeProperties) => (dispatch) => {
    axios
      .get(api.SettingsApi.getProvince + id + `?includeProperties=${includeProperties}`, { headers })
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
  
  export const editProvince = (id, data, setStatus) => (dispatch) => {
    dispatch(startLoading());
    axios
      .put(api.SettingsApi.editProvince + id, data, { headers })
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
  
  export const getProvinceSuggestion =
    (options, setData, setLoading) => () => {
      setLoading(true);
      axios
        .post(api.SettingsApi.getProvinceSuggestion, options, { headers })
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
