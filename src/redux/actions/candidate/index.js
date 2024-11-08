import { api } from "../../../api";
import axios from "axios";
import { endLoading, startLoading } from "../../reducers/ui/loading";
import { setEditInfo, setInfo, setLoading } from "../../reducers/candidate";
import {
  errorNotification,
  successNotification,
} from "../../../helpers/notification";
import { t } from "i18next";

const headers = {
  "Content-Type": "application/json",
  Authorization: localStorage.token,
};

export const getCandidates = (options) => (dispatch) => {
  dispatch(setLoading(true));
  axios
    .post(api.CandidateApi.getCandidates, options, { headers })
    .then((res) => {
      if (res.data.statusCode === "200") {
        dispatch(setInfo(res.data));
        dispatch(setLoading(false));
      } else {
        dispatch(setLoading(false));
      }
    })
    .catch(() => {
      dispatch(setLoading(false));
    });
};

export const createCandidate = (data, setStatus) => (dispatch) => {
  dispatch(startLoading());
  axios
    .post(api.CandidateApi.createCandidate, data, { headers })
    .then((res) => {
      if (res.data.statusCode === "200") {
        successNotification(t("toast.success"));
        dispatch(endLoading());
        setStatus(true);
      } else if (
        res.data.statusCode === "400" &&
        res.data.message[0] === "Dublicate Data"
      ) {
        errorNotification(t("toast.duplicate_candidate"));
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

export const getByIdCandidate = (id) => (dispatch) => {
  axios
    .get(api.CandidateApi.getCandidate + id, { headers })
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

export const editCandidate = (id, data, setStatus) => (dispatch) => {
  dispatch(startLoading());
  axios
    .put(api.CandidateApi.editCandidate + id, data, { headers })
    .then((res) => {
      if (res.data.statusCode === "200") {
        dispatch(endLoading());
        successNotification(t("toast.success"));
        setStatus(true);
      } else {
        dispatch(endLoading());
        errorNotification(t("toast.error"));
        setStatus(true);
      }
    })
    .catch(() => {
      dispatch(endLoading());
      errorNotification(t("toast.error"));
      setStatus(true);
    });
};

export const getCandidateSuggestions = (options, setData) => (dispatch) => {
  axios.post(api.CandidateApi.suggestionCandidate, options, { headers })
  .then(res => {
    if (res.data.statusCode === "200") {
      setData(res.data.data);
    }
  })
  .catch(() => {
    errorNotification(t("toast.error"))
  })
}
