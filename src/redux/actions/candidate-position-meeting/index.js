import { api } from "../../../api";
import axios from "axios";
import {
  setInfo,
  setLoading,
  setEditInfo,
} from "../../reducers/candidate-position-meeting";
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

export const getCandidatePositionMeeting = (options) => (dispatch) => {
  dispatch(startLoading());
  axios
    .post(
      api.CandidatePositionMeetingApi.getCandidatePositionMeetings,
      options,
      {
        headers,
      }
    )
    .then((res) => {
      dispatch(endLoading());
      if (res.data.statusCode === "200") {
        dispatch(setInfo(res.data.data));
      }
    })
    .catch(() => {
      dispatch(endLoading());
    });
};

export const createCandidatePositionMeeting =
  (data, setState) => (dispatch) => {
    dispatch(startLoading());
    axios
      .post(
        api.CandidatePositionMeetingApi.createCandidatePositionMeeting,
        data,
        {
          headers,
        }
      )
      .then((res) => {
        setState(true);
        if (res.data.statusCode === "200") {
          successNotification(t("toast.success"));
          dispatch(endLoading());
        } else {
          errorNotification(t("toast.error"));
          dispatch(endLoading());
        }
      })
      .catch((err) => {
        errorNotification(t("toast.error"));
        dispatch(endLoading());
        setState(true);
      });
  };

export const getByIdCandidatePositionMeeting = (id) => (dispatch) => {
  axios
    .get(api.CandidatePositionMeetingApi.getCandidatePositionMeetings + id, {
      headers,
    })
    .then((res) => {
      if (res.data.statusCode === "200") {
        dispatch(setEditInfo(res.data.data));
      }
    })
    .catch((err) => {});
};

export const editCandidatePositionMeeting =
  (id, data, setStatus) => (dispatch) => {
    dispatch(setLoading(true));
    axios
      .put(
        api.CandidatePositionMeetingApi.editCandidatePositionMeeting + id,
        data,
        {
          headers,
        }
      )
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
        dispatch(setLoading(false));
        errorNotification(t("toast.error"));
        setStatus(true);
      });
  };
