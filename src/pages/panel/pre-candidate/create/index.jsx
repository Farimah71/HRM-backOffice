import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { getDataFromJwtToken } from "../../../../helpers/get-data-from-jwt";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Field } from "formik";
// import AutoComplete from "../../../components/AutoComplete";
import { Button, MyForm, Error, Input } from "../../../../components"
import { createPreCandidate } from "../../../../redux/actions/pre-candidate";
import * as Yup from "yup";

export const CreatePreCandidate = () => {
  // ---------- store ----------
  const isLoading = useSelector((state) => state.loadingSlice.isLoading);

  // ---------- state ----------
  const [data, setData] = useState({
    tenantId: +getDataFromJwtToken("TenantId"),
    name: "",
    family: "",
    phoneNumber: "",
    email: "",
    endUserId: null,
    selectedCVId: null,
    preCandidateStatusId: null,
  });

  // ---------- hooks ----------
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // ---------- variables ----------
  const dataSchema = Yup.object({
    name: Yup.string().required(t("error.name_required")),
    family: Yup.string().required(t("error.family_required")),
    email: Yup.string().required(t("error.email_required")),
  });

  // ---------- functions ----------
  const onSubmit = (data) => {
    dispatch(createPreCandidate(data, navigate));
  };

  // ---------- render jsx ----------
  return (
    <>
      <div className="mt-12 p-6 bg-white rounded-11">
        <MyForm initialValues={data} validation={dataSchema} submit={onSubmit}>
          <div className="flex flex-col gap-y-4">
            <div className="flex items-start gap-x-4">
              <div className="w-1/2">
                <Field
                  component={Input}
                  placeholder={t("input.name.placeholder")}
                  label={t("input.name.label")}
                  name="name"
                  classes="border text-custom-dark text-opacity-30"
                />
                <Error name="name" />
              </div>
              <div className="w-1/2">
                <Field
                  component={Input}
                  placeholder={t("input.family.placeholder")}
                  label={t("input.family.label")}
                  name="family"
                  classes="border text-custom-dark text-opacity-30"
                />
                <Error name="family" />
              </div>
            </div>
            <div className="flex items-start gap-x-4">
              <div className="w-1/2">
                <Field
                  component={Input}
                  placeholder={t("input.email.placeholder")}
                  label={t("input.email.label")}
                  name="email"
                  classes="border text-custom-dark text-opacity-30"
                />
                <Error name="email" />
              </div>
              <div className="w-1/2">
                <Field
                  component={Input}
                  placeholder={t("input.phone_number.placeholder")}
                  label={t("input.phone_number.label")}
                  name="phoneNumber"
                  classes="border text-custom-dark text-opacity-30"
                />
              </div>
            </div>
            <div className="w-1/2 mt-12">
              <Field
                component={Button}
                title={t("button.save_title")}
                loading={isLoading}
                type="submit"
                classes="h-auto px-4 py-2 text-18"
              />
            </div>
          </div>
        </MyForm>
      </div>
    </>
  );
};
