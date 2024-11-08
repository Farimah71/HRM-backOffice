import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Field } from "formik";
import { Button, MyForm, Error, Input } from "../../../../../components";
import {
  getByIdAccountType,
  editAccountType,
} from "../../../../../redux/actions/settings/account-type";
import * as Yup from "yup";

export const EditAccountType = ({ onCloseModal, isReloadPage, editId }) => {
  // ---------- hooks ----------
  const { t } = useTranslation();
  const dispatch = useDispatch();

  // ---------- state ----------
  const [data, setData] = useState({
    id: null,
    titleFa: "",
    titleEn: "",
    titleTr: "",
    titleAr: "",
    titleDu: "",
    titleFr: "",
  });

  // ---------- store ----------
  const isLoading = useSelector((state) => state.loadingSlice.isLoading);
  const editInfo = useSelector((state) => state.accountTypeSlice.editInfo);

  // ---------- variables ----------
  const dataSchema = Yup.object({
    titleEn: Yup.string().required(t("error.title_en_required")),
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
      editAccountType(editId, values, (status) => reloadPageHandler(status))
    );
  };

  // ---------- lifeCycle ----------
  useEffect(() => {
    dispatch(getByIdAccountType(editId));
  }, []);
  useEffect(() => {
    setData((currState) => ({
      ...currState,
      id: editId,
      titleEn: editInfo.titleEn,
      titleTr: editInfo.titleTr,
    }));
  }, [editInfo]);

  // ---------- render jsx ----------
  return (
    <>
      <div className="flex items-center justify-between p-4 border-b border-custom-gray-light dark:bg-dark_custom-average-black">
        <h4 className="text-18 font-bold dark:text-dark_custom-full-white">
          {t("page_title.edit_account_type")}
        </h4>
        <div className="cursor-pointer dark:text-dark_custom-full-white" onClick={onCloseModal}>
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
        <div className="w-full flex gap-x-4">
          <div className="w-1/2">
            <Field
              component={Input}
              placeholder={t("input.title_en.placeholder")}
              label={t("input.title_en.label")}
              name="titleEn"
            />
            <Error name="titleEn" />
          </div>
          <div className="w-1/2">
            <Field
              component={Input}
              placeholder={t("input.title_tr.placeholder")}
              label={t("input.title_tr.label")}
              name="titleTr"
            />
          </div>
        </div>
        <div className="w-full flex gap-x-2 items-center justify-end">
          <div className="flex items-center gap-x-2">
            <Field
              component={Button}
              title={t("button.save_title")}
              loading={isLoading}
              type="submit"
              theme="dark"
            />
          </div>
        </div>
      </MyForm>
    </>
  );
};