import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Field } from "formik";
import {
  Button,
  MyForm,
  Error,
  Input,
  SelectBox,
} from "../../../../../components";
import {
  getByIdCity,
  editCity,
} from "../../../../../redux/actions/settings/city";
import * as Yup from "yup";
import { convertArrayToSelectOptions } from "../../../../../helpers/convert-array-to-select-options";
import { getProvinces } from "../../../../../redux/actions/settings/province";

export const EditCity = ({ onCloseModal, isReloadPage, editId }) => {
  // ---------- store ----------
  const editInfo = useSelector((state) => state.citySlice.editInfo);
  const isLoading = useSelector((state) => state.loadingSlice.isLoading);
  const provinceData = useSelector((state) => state.provinceSlice.info);

  // ---------- state ----------
  const [provinceOptions, setProvinceOptions] = useState();
  const [provinceItem, setProvinceItem] = useState();
  const [data, setData] = useState({
    id: null,
    title: "",
    provinceId: null,
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
    dispatch(editCity(editId, values, (status) => reloadPageHandler(status)));
  };

  // ---------- lifeCycle ----------
  useEffect(() => {
    dispatch(getByIdCity(editId, "Province"));
    dispatch(getProvinces({}))
  }, []);
  useEffect(() => {
    if (editInfo) {
      setData({
        id: editId,
        title: editInfo.title,
        provinceId: editInfo.provinceId,
      });
      setProvinceItem({
        value: editInfo.province?.id,
        label: editInfo.province?.title,
      });
    }
  }, [editInfo]);
  useEffect(() => {
    if (provinceData.count) {
      const options = convertArrayToSelectOptions(provinceData.data, ["id", "title"]);
      setProvinceOptions(options);
    }
  }, [provinceData]);

  // ---------- render jsx ----------
  return (
    <>
      <div className="flex items-center justify-between p-4 border-b border-custom-gray-light dark:bg-dark_custom-average-black">
        <h4 className="text-18 font-bold dark:text-dark_custom-full-white">{t("page_title.edit_city")}</h4>
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
               placeholder={t("input.province.placeholder")}
               label={t("input.province.label")}
               selectedOption={provinceItem}
               options={provinceOptions}
               name="provinceId"
              />
            </div>
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
