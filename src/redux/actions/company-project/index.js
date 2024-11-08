import axios from "axios";
import { api } from "../../../api";
import { startLoading, endLoading } from "../../reducers/ui/loading";
import {
  successNotification,
  errorNotification,
} from "../../../helpers/notification";
import { setInfo, setEditInfo, setLoaing } from "../../reducers/company-project"
import { t } from "i18next";

const headers = {
  "Content-Type": "application/json",
  Authorization: localStorage.token
};
export const getCompanyProjects = (options) => (dispatch) => {
  dispatch(setLoaing(true));
  axios
    .post(api.CompanyProjectApi.getCompanyProjects, options, { headers })
    .then((res) => {
      if (res.data.statusCode === "200") {
        dispatch(setInfo(res.data))
        dispatch(setLoaing(false));
      } else {
        dispatch(setLoaing(false));
      }
    })
    .catch(() => {
      dispatch(setLoaing(false));
    });
};

export const createCompanyProject = (data, setStatus) => (dispatch) => {
  dispatch(startLoading());
  axios
    .post(api.CompanyProjectApi.createCompanyProject, data, { headers })
    .then((res) => {
      if (res.data.statusCode === "200") {
        dispatch(endLoading());
        successNotification(t("notification.data_success"));
        setStatus(true)
      } else {
        dispatch(endLoading());
        setStatus(true)
      }
    })
    .catch(() => {
      dispatch(endLoading());
      setStatus(true)
    });
};

export const getByIdCompanyProject = (id) => (dispatch) => {
  axios
    .get(api.CompanyProjectApi.getCompanyProject + id, { headers })
    .then((res) => {
      if (res.data.statusCode === "200") {
        dispatch(setEditInfo(res.data.data));
        // dispatch(endLoading());
      } else {
        // dispatch(endLoading());
      }
    })
    .catch(() => {
      // dispatch(endLoading());
    });
};

export const editCompanyProject = (id, data, setStatus) => (dispatch) => {
  dispatch(startLoading());
  axios
    .put(api.CompanyProjectApi.editCompanyProject + id, data, { headers })
    .then((res) => {
      if (res.data.statusCode === "200") {
        dispatch(endLoading());
        successNotification(t("notification.data_success"));
        setStatus(true)
      } else {
        dispatch(endLoading());
        setStatus(true)
      }
    })
    .catch(() => {
      dispatch(endLoading());
      setStatus(true)
    });
};
