import { api } from "../../../api";
import axios from "axios";
import {
  setInfo,
  setLoading,
  setEditInfo,
} from "../../reducers/candidate-position";
import { endLoading, startLoading } from "../../reducers/ui/loading";
import {
  errorNotification,
  successNotification,
} from "../../../helpers/notification";
import { t } from "i18next";

const headers = {
  "Content-Type": "application/json",
  Authorization: localStorage.token,
};

export const getCandidatePosition = (options) => (dispatch) => {
  dispatch(setLoading(true));
  axios
    .post(api.CandidatePositionApi.getCandidatePosition, options, { headers })
    .then((res) => {
      if (res.data.statusCode === "200") {
        dispatch(setInfo(res.data.data));
        dispatch(setLoading(false));
      } else {
        dispatch(setLoading(false));
      }
    })
    .catch(() => {
      // dispatch(endLoading());
      dispatch(setLoading(false));
    });
};

export const createCandidatePosition = (data) => (dispatch) => {
  dispatch(startLoading());
  axios
    .post(api.CandidatePositionApi.createCandidatePosition, data, { headers })
    .then((res) => {
      if (res.data.statusCode === "200") {
        successNotification(t("toast.success"));
        dispatch(endLoading());
      } else {
        errorNotification(t("toast.error"));
        dispatch(endLoading());
      }
    })
    .catch(() => {
      errorNotification(t("toast.error"));
      dispatch(endLoading());
    });
};

export const getByIdCandidatePosition = (id) => (dispatch) => {
  dispatch(setLoading(true));
  axios
    .get(api.CandidatePositionApi.getCandidatePosition + id, { headers })
    .then((res) => {
      if (res.data.statusCode === "200") {
        dispatch(setEditInfo(res.data.data));
        dispatch(setLoading(false));
      } else {
        dispatch(setLoading(false));
      }
    })
    .catch((err) => {
      dispatch(setLoading(false));
    });
};
export const changeStatusCandidatePosition =
  (data, setStatus) => (dispatch) => {
    dispatch(startLoading());
    dispatch(setLoading(true));
    axios
      .post(api.CandidatePositionApi.changeStatusCandidatePosition, data, {
        headers,
      })
      .then((res) => {
        if (res.data.statusCode === "200") {
          dispatch(setLoading(false));
          dispatch(endLoading());
          setStatus(true);
          successNotification(t("toast.success"));
        } else {
          dispatch(setLoading(false));
          dispatch(endLoading());
          setStatus(false);
          errorNotification(t("toast.error"));
        }
      })
      .catch(() => {
        errorNotification(t("toast.error"));
        dispatch(setLoading(false));
        dispatch(endLoading());
        setStatus(false);
      });
  };
