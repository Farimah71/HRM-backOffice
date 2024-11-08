import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
// import { useNavigate, useParams } from "react-router-dom";
import { Field } from "formik";
import {
  Button,
  MyForm,
  Error,
  Input,
  SelectBox,
} from "../../../../../components";
import {
  getByIdCountry,
  editCountry,
} from "../../../../../redux/actions/settings/country";
import * as Yup from "yup";
import { getLanguages } from "../../../../../redux/actions/settings/language";
import { getCurrencies } from "../../../../../redux/actions/settings/currency";
import { convertArrayToSelectOptions } from "../../../../../helpers/convert-array-to-select-options";

export const EditCountry = ({ onCloseModal, isReloadPage, editId }) => {
  // ---------- store ----------
  const { editInfo, loading } = useSelector((state) => state.countrySlice);
  const languageData = useSelector((state) => state.languageSlice.info);
  const currencyData = useSelector((state) => state.currencySlice.info);

  // ---------- state ----------
  const [data, setData] = useState({
    id: null,
    title: "",
    languageId: null,
    currencyId: null,
  });
  const [languageItem, setLanguageItem] = useState();
  const [currencyItem, setCurrencyItem] = useState();
  const [selectOptions, setSelectOptions] = useState({
    languages: [],
    currencies: [],
  });

  // ---------- hooks ----------
  const { t } = useTranslation();
  const dispatch = useDispatch();

  // ---------- variables ----------
  const dataSchema = Yup.object({
    title: Yup.string().required(t("error.title_required")),
  });

  // ---------- functions ----------
  const reloadPageHandler = (status) => {
    if (status) {
      onCloseModal();
      isReloadPage();
    }
  };
  const onSubmit = (values) => {
    dispatch(
      editCountry(editId, values, (status) => reloadPageHandler(status))
    );
  };

  // ---------- lifeCycle ----------
  useEffect(() => {
    dispatch(getByIdCountry(editId));
    dispatch(getLanguages({}));
    dispatch(getCurrencies({}));
  }, []);
  useEffect(() => {
    if (editInfo) {
      setData({
        id: editId,
        title: editInfo.title,
        currencyId: editInfo.currencyId,
        languageId: editInfo.languageId,
      });
      setLanguageItem({
        value: editInfo.language?.id,
        label: editInfo.language?.title,
      });
      setCurrencyItem({
        value: editInfo.currency?.id,
        label: editInfo.currency?.title,
      });
    }
  }, [editInfo]);
  useEffect(() => {
    if (languageData.count > 0) {
      setSelectOptions((prevState) => ({
        ...prevState,
        languages: convertArrayToSelectOptions(languageData.data, [
          "id",
          "title",
        ]),
      }));
    }
  }, [languageData]);
  useEffect(() => {
    if (currencyData.count > 0) {
      setSelectOptions((prevState) => ({
        ...prevState,
        currencies: convertArrayToSelectOptions(currencyData.data, [
          "id",
          "title",
        ]),
      }));
    }
  }, [currencyData]);

  // ---------- render jsx ----------
  return (
    <>
      <div className="flex items-center justify-between p-4 border-b border-custom-gray-light dark:bg-dark_custom-average-black">
        <h4 className="text-18 font-bold dark:text-dark_custom-full-white">
          {t("page_title.edit_country")}
        </h4>
        <div
          className="cursor-pointer dark:text-dark_custom-full-white"
          onClick={onCloseModal}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect
              opacity="0.5"
              x="6"
              y="17.3137"
              width="16"
              height="2"
              rx="1"
              transform="rotate(-45 6 17.3137)"
              fill="currentColor"
            />
            <rect
              x="7.41422"
              y="6"
              width="16"
              height="2"
              rx="1"
              transform="rotate(45 7.41422 6)"
              fill="currentColor"
            />
          </svg>
        </div>
      </div>
      <MyForm
        initialValues={data}
        validation={dataSchema}
        submit={onSubmit}
        classes="flex flex-col gap-y-10 p-4"
      >
        <div className="flex flex-col gap-y-4">
          <div className="w-full flex gap-x-4">
            <div className="w-1/2">
              <Field
                component={Input}
                placeholder={t("input.title.placeholder")}
                label={t("input.title.label")}
                name="title"
              />
              <Error name="title" />
            </div>
            <div className="w-1/2">
              <Field
                component={SelectBox}
                placeholder={t("input.language.placeholder")}
                label={t("input.language.label")}
                selectedOption={languageItem}
                options={selectOptions.languages}
                name="languageId"
              />
            </div>
          </div>
          <div className="w-full flex gap-x-4 pr-4">
            <div className="w-1/2">
              <Field
                component={SelectBox}
                placeholder={t("input.currency.placeholder")}
                label={t("input.currency.label")}
                selectedOption={currencyItem}
                options={selectOptions.currencies}
                name="currencyId"
              />
            </div>
          </div>
        </div>
        <div className="w-full flex gap-x-2 items-center justify-end">
          <div className="flex items-center gap-x-2">
            <Field
              component={Button}
              title={t("button.save_title")}
              loading={loading}
              type="submit"
              theme="dark"
            />
          </div>
        </div>
      </MyForm>
    </>
  );
};
