import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Field } from "formik";
import {
  Button,
  MyForm,
  Input,
  UploadFile,
  Error,
} from "../../../../../components";
import { createPersonCV } from "../../../../../redux/actions/personCV";
import * as Yup from "yup";

export const UploadCV = ({
  onCloseModal,
  candidatePositionId,
  reFetchData,
}) => {
  // ---------- store ----------
  const { loading } = useSelector((state) => state.personCVSlice);

  // ---------- states ----------
  const [formValue, setFormValue] = useState({
    candidatePositionId: candidatePositionId,
    personId: null,
    title: "",
    cvFile: null,
  });

  // ---------- hooks ----------
  const { t } = useTranslation();
  const dispatch = useDispatch();

  // ---------- variables ----------
  const dataSchema = Yup.object({
    cvFile: Yup.mixed().required(t("error.cv_file_required")),
  });

  // ---------- functions ----------
  const closeHandler = () => {
    onCloseModal();
  };
  const reloadPageHandler = (status) => {
    if (status) {
      onCloseModal();
      reFetchData();
    }
  };
  const fileHandler = (file) => {
    setFormValue((prev) => ({ ...prev, cvFile: file.get("cvFile") }));
  };
  const onSubmit = (values) => {
    dispatch(
      createPersonCV(values, (status) => {
        reloadPageHandler(status);
      })
    );
  };

  // ---------- render jsx ----------
  return (
    <>
      <div className="flex items-center justify-between p-4 select-none border-b dark:rounded-t-lg border-custom-gray-light dark:bg-dark_custom-average-black">
        <h4 className="text-18 font-bold dark:text-dark_custom-full-white">
          {t("page_title.uploadCv")}
        </h4>
        <div
          className="cursor-pointer dark:text-dark_custom-full-white"
          onClick={closeHandler}
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

      <div className="overflow-y-auto p-3">
        <MyForm
          initialValues={formValue}
          validation={dataSchema}
          submit={onSubmit}
          doNotInitialize
          classes="p-4 select-none rounded-md"
        >
          <div className="w-full flex gap-x-3 mb-5">
            <div className="w-1/2">
              <Field
                component={Input}
                placeholder={t("input.title.placeholder")}
                label={t("input.title.label")}
                name="title"
              />
            </div>
            <div className="flex flex-col w-1/2 mt-8">
              <Field
                component={UploadFile}
                label={t("button.CV")}
                name="cvFile"
                formData
                fileHandler={fileHandler}
              />
              <Error name={"cvFile"} />
            </div>
          </div>
          <div className="flex justify-end">
            <Field
              component={Button}
              title={t("button.submit_title")}
              type="submit"
              theme="dark"
              loading={loading}
            />
          </div>
        </MyForm>
      </div>
    </>
  );
};
