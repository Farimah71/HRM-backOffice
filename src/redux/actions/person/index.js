import { api } from "../../../api";
import axios from "axios";
import { startLoading, endLoading } from "../../reducers/ui/loading";
import { setInfo, setEditInfo, setLoading, setFetchedPerson } from "../../reducers/person"
import { errorNotification, successNotification } from "../../../helpers/notification";
import { t } from "i18next";

const headers = {
  "Content-Type": "application/json",
  Authorization: localStorage.token,
};
export const getPersons = (options) => (dispatch) => {
  // dispatch(startLoading());
  dispatch(setLoading(true));
  axios
    .post(api.SettingsApi.getPersons, options, { headers })
    .then((res) => {
      if (res.data.statusCode === "200") {
        dispatch(setInfo(res.data.data));
        // dispatch(endLoading());
        dispatch(setLoading(false))
      } else {
        // dispatch(endLoading());
        dispatch(setLoading(false))
      }
    })
    .catch(() => {
      // dispatch(endLoading());
      dispatch(setLoading(false))
    });
};

export const getPersonByPhone = (options) => (dispatch) => {
  dispatch(setLoading(true));
  axios
    .post(api.SettingsApi.getPersons, options, { headers })
    .then((res) => {
      if (res.data.statusCode === "200") {
        dispatch(setFetchedPerson(res.data.data));
        dispatch(setLoading(false));
      } else {
        dispatch(setLoading(false));
      }
    })
    .catch(() => {
      dispatch(setLoading(false));
    });
};

export const createPerson = (data, setStatus) => (dispatch) => {
  dispatch(startLoading());
  axios
    .post(api.SettingsApi.createPerson, data, { headers })
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

export const getByIdPerson = (id) => (dispatch) => {
  axios
    .get(api.SettingsApi.getPerson + id, { headers })
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

export const editPerson = (id, data, setStatus) => (dispatch) => {
  dispatch(startLoading());
  axios
    .put(api.SettingsApi.editPerson + id, data, { headers })
    .then((res) => {
      if (res.data.statusCode === "200") {
        dispatch(endLoading());
        successNotification(t("toast.success"));
        // setStatus(true)
      } else {
        dispatch(endLoading());
        errorNotification(t("toast.error"));
        // setStatus(true)
      }
    })
    .catch(() => {
      dispatch(endLoading());
      errorNotification(t("toast.error"));
    //   setStatus(true)
    });
};

export const getSuggestionPerson = (options, setData, setStatus) => {
  setStatus(true)
  axios.post(api.SettingsApi.getPersonSuggestion, options, { headers })
  .then(res => {
    if (res.data.statusCode === "200") {
      setStatus(false);
      setData(res.data.data);
    } else {
      setStatus(false)
    }
  })
  .catch(() => {
    setStatus(false)
  })
}
