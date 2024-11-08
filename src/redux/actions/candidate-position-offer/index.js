import { api } from "../../../api";
import axios from "axios";
import {
  setInfo,
  setLoading,
  setEditInfo,
} from "../../reducers/candidate-position-offer";
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

export const getCandidatePositionOffer = (options) => (dispatch) => {
  // dispatch(setLoading(true));
  dispatch(startLoading());
  axios
    .post(api.CandidatePositionOfferApi.getCandidatePositionOffers, options, {
      headers,
    })
    .then((res) => {
      dispatch(endLoading());
      if (res.data.statusCode === "200") {
        dispatch(setInfo(res.data.data));
        // dispatch(setLoading(false));
      } else {
        // dispatch(setLoading(false));
      }
    })
    .catch(() => {
      dispatch(endLoading());
      // dispatch(setLoading(false));
    });
};

export const createCandidatePositionOffer = (data, setState) => (dispatch) => {
  dispatch(startLoading());
  axios
    .post(api.CandidatePositionOfferApi.createCandidatePositionOffer, data, {
      headers,
    })
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

export const getByIdCandidatePositionOffer = (id) => (dispatch) => {
  axios
    .get(api.CandidatePositionOfferApi.getCandidatePositionOffers + id, {
      headers,
    })
    .then((res) => {
      if (res.data.statusCode === "200") {
        dispatch(setEditInfo(res.data.data));
      }
    })
    .catch((err) => {});
};

export const editCandidatePositionOffer =
  (id, data, setStatus) => (dispatch) => {
    dispatch(setLoading(true));
    axios
      .put(
        api.CandidatePositionOfferApi.editCandidatePositionOffer + id,
        data,
        { headers }
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
