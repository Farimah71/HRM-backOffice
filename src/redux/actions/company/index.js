import axios from "axios";
import { api } from "../../../api";
import { startLoading, endLoading } from "../../reducers/ui/loading";
import {
  successNotification,
  errorNotification,
} from "../../../helpers/notification";
import { setInfo, setEditInfo, setLoading } from "../../reducers/company";
import { t } from "i18next";

const headers = {
  "Content-Type": "application/json",
  Authorization: localStorage.token,
};

export const getCompanies = (options) => (dispatch) => {
  dispatch(setLoading(true));
  axios
    .post(api.CompanyApi.getCompanies, options, { headers })
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

export const createCompany = (data, setStatus, navigate) => (dispatch) => {
  dispatch(startLoading());
  axios
    .post(api.CompanyApi.createCompany, data, { headers })
    .then((res) => {
      dispatch(endLoading());
      setStatus(true);
      if (res.data.statusCode === "200") {
        successNotification(t("notification.data_success"));
        navigate("/companyProject", { state: { companyId: res.data.data.id } });
      }
    })
    .catch(() => {
      dispatch(endLoading());
      setStatus(true);
    });
};

export const getByIdCompany = (id) => (dispatch) => {
  axios
    .get(api.CompanyApi.getCompany + id, { headers })
    .then((res) => {
      if (res.data.statusCode === "200") {
        dispatch(setEditInfo(res.data.data));
      } else {
        // dispatch(endLoading());
      }
    })
    .catch((err) => {
      // dispatch(endLoading());
    });
};

export const editCompany = (id, data, setStatus) => (dispatch) => {
  dispatch(startLoading());
  axios
    .put(api.CompanyApi.editCompany + id, data, { headers })
    .then((res) => {
      if (res.data.statusCode === "200") {
        dispatch(endLoading());
        successNotification(t("notification.data_success"));
        setStatus(true);
      } else {
        dispatch(endLoading());
        setStatus(true);
      }
    })
    .catch(() => {
      dispatch(endLoading());
      setStatus(true);
    });
};

export const getCompanySuggestion = (options, setData, setLoading) => () => {
  setLoading(true);
  axios
    .post(api.CompanyApi.getCompanySuggestion, options, { headers })
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
