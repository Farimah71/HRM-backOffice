import axios from "axios";
import { api } from "../../../api";
import { startLoading, endLoading } from "../../reducers/ui/loading";
import {
  successNotification,
  errorNotification,
} from "../../../helpers/notification";
import {
  setInfo,
  setEditInfo,
  setLoading,
} from "../../reducers/company-position";
import { t } from "i18next";

const headers = {
  "Content-Type": "application/json",
  Authorization: localStorage.token,
};
export const getCompanyPositions = (options) => (dispatch) => {
  dispatch(setLoading(true));
  axios
    .post(api.CompanyPositionApi.getCompanyPositions, options, { headers })
    .then((res) => {
      dispatch(setLoading(false));
      if (res.data.statusCode === "200") {
        dispatch(setInfo(res.data));
      }
    })
    .catch(() => {
      dispatch(setLoading(false));
    });
};

export const createCompanyPosition = (data, navigate) => (dispatch) => {
  dispatch(setLoading(true));
  axios
    .post(api.CompanyPositionApi.createCompanyPosition, data, { headers })
    .then((res) => {
      dispatch(setLoading(false));
      if (res.data.statusCode === "200") {
        successNotification(t("notification.data_success"));
        navigate("/companyPosition", {
          state: { companyId: res.data.data.companyId },
        });
      }
    })
    .catch(() => {
      dispatch(setLoading(false));
    });
};

export const getByIdCompanyPosition = (id, np) => (dispatch) => {
  axios
    .get(
      api.CompanyPositionApi.getCompanyPosition +
        id +
        `?includeProperties=${np}`,
      { headers }
    )
    .then((res) => {
      if (res.data.statusCode === "200") {
        dispatch(setEditInfo(res.data.data));
      }
    })
    .catch((err) => {});
};

export const editCompanyPosition = (id, data, navigate) => (dispatch) => {
  dispatch(setLoading(true));
  axios
    .put(api.CompanyPositionApi.editCompanyPosition + id, data, { headers })
    .then((res) => {
      dispatch(setLoading(false));
      if (res.data.statusCode === "200") {
        successNotification(t("notification.data_success"));
        navigate("/companyPosition", {
          state: { companyId: res.data.data.companyId },
        });
      }
    })
    .catch(() => {
      dispatch(setLoading(true));
    });
};
