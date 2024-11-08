import { api } from "../../../api";
import axios from "axios";
import { startLoading, endLoading } from "../../reducers/ui/loading";
import {
  setInfo,
  setLoading,
} from "../../reducers/person-feature";
import {
  errorNotification,
  successNotification,
} from "../../../helpers/notification";
import { t } from "i18next";

const headers = {
  "Content-Type": "application/json",
  Authorization: localStorage.token,
};
export const getPersonFeature = (options) => (dispatch) => {
  dispatch(setLoading(true));
  axios
    .post(api.personFeatureApi.getPersonFeature, options, { headers })
    .then((res) => {
      dispatch(setLoading(false));
      if (res.data.statusCode === "200") {
        dispatch(setInfo(res.data.data));
      }
    })
    .catch(() => {
      dispatch(setLoading(false));
    });
};

export const createPersonFeature = (data, setStatus) => (dispatch) => {
  dispatch(setLoading(true));
  axios
    .post(api.personFeatureApi.createPersonFeature, data, { headers })
    .then((res) => {
      dispatch(setLoading(false));
      setStatus(true);
      if (res.data.statusCode === "200") {
        successNotification(t("toast.success"));
      } else {
        errorNotification(t("toast.error"));
      }
    })
    .catch(() => {
      errorNotification(t("toast.error"));
      dispatch(setLoading(false));
      setStatus(true);
    });
};

export const deletePersonFeature = (id, setStatus) => (dispatch) => {
  dispatch(setLoading(true));
  axios
    .delete(api.personFeatureApi.deletePersonFeature + id, { headers })
    .then((res) => {
      dispatch(setLoading(false));
      setStatus(true);
      if (res.data.statusCode === "200") {
        successNotification(t("toast.success_delete"));
      } else {
        errorNotification(t("toast.error"));
      }
    })
    .catch(() => {
      dispatch(setLoading(false));
      errorNotification(t("toast.error"));
      setStatus(true);
    });
};