import { api } from "../../../api";
import axios from "axios";
import { setDownloadLink, setLoading } from "../../reducers/personCV";
import {
  errorNotification,
  successNotification,
} from "../../../helpers/notification";
import { t } from "i18next";

const headers = {
  "Content-Type": "multipart/form-data",
  Authorization: localStorage.token,
};

export const createPersonCV = (data, setStatus) => (dispatch) => {
  dispatch(setLoading(true));
  axios
    .post(api.PersonCVApi.createPersonCV, data, { headers })
    .then((res) => {
      dispatch(setLoading(false));
      if (res.data.statusCode === "200") {
        setStatus(true);
        successNotification(t("toast.success"));
      }
    })
    .catch(() => {
      errorNotification(t("toast.error"));
      dispatch(setLoading(false));
    });
};

export const getByIdPersonCV = (id, setState) => (dispatch) => {
  axios
    .get(api.PersonCVApi.getPersonCV + id, { headers })
    .then((res) => {
      if (res.data.statusCode === "200") {
        dispatch(setDownloadLink(res.data.data));
        setState(res.data.data);
      } else {
        errorNotification(t("toast.error"));
      }
    })
    .catch(() => {
      errorNotification(t("toast.error"));
    });
};
